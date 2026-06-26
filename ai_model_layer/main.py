from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Any
import google.generativeai as genai
import os
import joblib
import pandas as pd
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if API_KEY:
    genai.configure(api_key=API_KEY)

app = FastAPI(title="REDAT AI Model Layer")

# Load REDAT ML Models
MODEL_DIR = "redat_smart_livestock_model"
try:
    redat_model = joblib.load(os.path.join(MODEL_DIR, "redat_best_model.pkl"))
    redat_scaler = joblib.load(os.path.join(MODEL_DIR, "redat_scaler.pkl"))
    redat_le = joblib.load(os.path.join(MODEL_DIR, "redat_label_encoder.pkl"))
    redat_features = joblib.load(os.path.join(MODEL_DIR, "redat_feature_cols.pkl"))
    print("✅ REDAT ML Models loaded successfully!")
except Exception as e:
    print(f"⚠️ Warning: Could not load REDAT models. Error: {e}")
    redat_model = None

# Allow CORS for web dashboard and mobile app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = None

@app.post("/ask")
async def ask_ai(request: ChatRequest):
    if not API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API Key not configured")
        
    try:
        model = genai.GenerativeModel('gemini-3.5-flash')
        
        system_prompt = (
            "You are REDAT AI, an expert veterinary and smart farming assistant for camel farmers. "
            "You provide highly accurate, actionable advice based on the camel herd data provided.\n\n"
        )
        
        if request.context:
            system_prompt += "Current Farm Context:\n"
            if "camels" in request.context:
                system_prompt += f"Total Camels: {len(request.context['camels'])}\n"
                system_prompt += f"Camels Data: {request.context['camels']}\n"
            if "alerts" in request.context:
                system_prompt += f"Active Alerts: {request.context['alerts']}\n"
            if "pins" in request.context:
                system_prompt += f"Community Pins: {request.context['pins']}\n"
                
        # Send system context and user message
        full_prompt = f"{system_prompt}\n\nUser Question: {request.message}"
        
        response = model.generate_content(full_prompt)
        
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "ml_model_loaded": redat_model is not None}

class PredictionRequest(BaseModel):
    body_temp: float
    activity_level: int
    heart_rate: int
    movement_km: float
    ambient_temp: float
    humidity: float
    water_intake: float
    time_of_day: str  # 'morning', 'afternoon', 'evening', 'night'

@app.post("/predict_health")
def predict_health(req: PredictionRequest):
    if not redat_model:
        raise HTTPException(status_code=500, detail="ML Model not loaded on backend")

    # Encode time of day
    time_order = {'morning': 0, 'afternoon': 1, 'evening': 2, 'night': 3}
    tod_enc = time_order.get(req.time_of_day.lower(), 0)

    # Feature Engineering (must match notebook)
    heat_index = req.body_temp + 0.33 * req.ambient_temp
    temp_activity_ratio = req.body_temp / (req.activity_level + 1)
    hydration_stress = req.ambient_temp / (req.water_intake + 1)
    mobility_score = req.movement_km * req.activity_level
    fever_flag = 1 if req.body_temp > 40.0 else 0
    critical_ambient = 1 if req.ambient_temp > 43.0 else 0

    # Build dictionary
    row = {
        'body_temp': req.body_temp,
        'activity_level': req.activity_level,
        'heart_rate': req.heart_rate,
        'movement_km': req.movement_km,
        'ambient_temp': req.ambient_temp,
        'humidity': req.humidity,
        'water_intake': req.water_intake,
        'time_of_day_enc': tod_enc,
        'heat_index': heat_index,
        'temp_activity_ratio': temp_activity_ratio,
        'hydration_stress': hydration_stress,
        'mobility_score': mobility_score,
        'fever_flag': fever_flag,
        'critical_ambient': critical_ambient
    }

    # Format exactly as expected by the model
    df = pd.DataFrame([row])[redat_features]

    try:
        pred_enc = redat_model.predict(df)[0]
        pred_lbl = redat_le.inverse_transform([int(pred_enc)])[0]
        return {"status": "success", "prediction": pred_lbl}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")
