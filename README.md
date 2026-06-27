# 🐪 REDAT — Smart Camel Farming & Predictive Health System

> **Tatweer Hackathon 2026 · Al Qua'a, Al Ain · In collaboration with Abu Dhabi University**

📽️ **[▶ Watch the Demo Video](https://youtu.be/YOUR_DEMO_LINK_HERE)**

---


## Table of Contents

## The Problem

1. [The Challenge and the Problem](#1-the-challenge-and-the-problem)
2. [Who It Is For, and Their Situation](#2-who-it-is-for-and-their-situation)
3. [The Solution](#3-the-solution)
4. [Impact and Testable Claims](#4-impact-and-testable-claims)
5. [Feasibility and Deployment](#5-feasibility-and-deployment)
6. [Scalability](#6-scalability)
7. [Evidence and Validation](#7-evidence-and-validation)
8. [How to Run or Verify It, and Tools Used](#8-how-to-run-or-verify-it-and-tools-used)



## 1. The Challenge and the Problem

**Challenge selected:** Rural Digital Infrastructure

**Specific problem:** Camel farmers in Al Qua'a, Al Ain, have no continuous, data-driven way to monitor the health of their herds. Today, livestock health management is entirely reactive — a farmer detects illness, heat stress, or dehydration only when a camel shows visible physical collapse. By that point, veterinary intervention is often too late or too expensive.

Three factors make this problem acute in Al Qua'a:

| Factor | Reality |
|---|---|
| **Stoic animals** | Camels hide pain and weakness instinctively. Visual inspection catches problems only at late clinical stages. |
| **Extreme heat** | Summer ambient temperatures regularly exceed 45 °C. Silent dehydration and heat stress are invisible until collapse. |
| **Vast grazing ranges** | Herds roam across large desert areas. Manual check-ins are infrequent (once or twice daily at best), and farmers have no way to locate or monitor a specific animal in real time. |

There is also no cooperative communication layer between farms. When a disease outbreak occurs (e.g., Camel Pox) or when a local hazard emerges (broken fencing, dried wells), neighboring farms learn about it by word-of-mouth — if at all.

---

## 2. Who It Is For, and Their Situation

**Primary users:** Camel farmers and herd managers in the Al Qua'a region of Al Ain, Abu Dhabi Emirate.

**Size of the group:** Al Ain is home to a significant share of the UAE's estimated **400,000+ camel population** (UAE Ministry of Climate Change and Environment). Al Qua'a specifically is one of the traditional camel farming heartlands of the region. Individual farmers manage herds ranging from 5 to over 200 camels.

**What the problem costs them today:**

- **Animal loss:** A single racing or breeding camel can be valued at **AED 50,000–500,000+**. Losing even one animal to undetected heat stress or late-stage illness represents a severe financial blow.
- **Veterinary costs:** Emergency vet calls to remote desert locations cost significantly more than scheduled preventative care. Reactive treatment of advanced illness can run **AED 2,000–10,000 per incident**.
- **Time and labor:** Farmers or hired herdsmen spend **2–4 hours daily** driving across the desert for manual visual inspections — time that produces limited actionable information.
- **Community vulnerability:** Without a shared alert system, a Camel Pox outbreak on one farm can silently spread to neighboring herds before anyone is warned.

**Secondary users:** Local veterinary clinics and agricultural authorities who currently lack digitized herd health data for the region.

---

## 3. The Solution

**REDAT** (meaning "reclaiming" or "guiding back" in local dialect) is a complete system — IoT hardware on the camel, a machine learning engine in the cloud, and a mobile app in the farmer's hand — that turns reactive guesswork into continuous, automated health monitoring.

### How it works, step by step:

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐     ┌──────────────┐
│  IoT Collar  │────▶│ Firebase Realtime  │────▶│  FastAPI Backend  │────▶│  Mobile App  │
│  on Camel    │     │ Database (Cloud)   │     │  + CatBoost ML    │     │  (Farmer)    │
│              │     │                    │     │  + Gemini 3.5 AI  │     │              │
│ Sensors:     │     │ Stores continuous  │     │                   │     │ Sees:        │
│ • Body temp  │     │ telemetry stream   │     │ 1. Engineers      │     │ • Health     │
│ • Heart rate │     │                    │     │    features       │     │   status     │
│ • GPS        │     │                    │     │ 2. Predicts       │     │ • GPS map    │
│ • Activity   │     │                    │     │    health state   │     │ • Alerts     │
│ • Ambient    │     │                    │     │ 3. Generates      │     │ • AI advice  │
│   temp/humid │     │                    │     │    plain-language  │     │ • Community  │
│ • Movement   │     │                    │     │    advice via LLM  │     │   pins       │
└──────────────┘     └───────────────────┘     └──────────────────┘     └──────────────┘
```

**In plain terms:** A collar on each camel continuously sends vital signs (body temperature, heart rate, movement, GPS location, ambient conditions) to the cloud. Our machine learning model analyzes these readings in real time and classifies the camel's state as one of four categories: **healthy**, **heat stress**, **low activity**, or **possible illness**. That prediction, along with the raw data and local context, is then passed to a Gemini 3.5 Flash generative AI that translates it into friendly, actionable veterinary advice in Arabic or English. The farmer sees everything on their phone — health status, live GPS location, alerts, and an AI chatbot they can ask questions.

Additionally, REDAT includes a **Community Pin Board**: an interactive shared map where any farmer can drop pins to warn about disease outbreaks, mark water well statuses, flag hazards (broken fencing, dangerous terrain), or share good grazing locations. This creates a cooperative awareness network across the Al Qua'a farming community.

### System Architecture Diagram

![REDAT System Architecture](assets/architecture.png)

---

## 4. Impact and Testable Claims

We state our impact as specific, testable claims. Where we have evidence, we provide it. Where we do not yet, we are transparent about it.

### Claim 1: The ML model accurately classifies camel health states.

**Evidence:** Our CatBoost classifier was trained and validated on a dataset of **10,234 physiological profiles** representing diverse environmental stress conditions. On 5-fold cross-validation:

| Metric | Value |
|---|---|
| Test accuracy | **81.51%** |
| Macro F1-score | **81.43%** |
| Train–test gap | **4.40%** (best generalization of all models tested) |

We compared against five other algorithms. CatBoost was selected not because it had the highest raw accuracy (margins were tight), but because it had the **lowest overfitting gap** (4.40% vs. 14–26% for other models), making it the most reliable for deployment on unseen, real-world data.

| Model | Test Accuracy | F1 Score | Train–Test Gap |
|---|---|---|---|
| 🏆 **CatBoost (selected)** | **81.51%** | **81.43%** | **4.40%** |
| CatBoost (Tuned) | 81.18% | 80.89% | 18.82% |
| Random Forest | 81.05% | 80.93% | 17.59% |
| XGBoost | 80.99% | 80.94% | 14.04% |
| LightGBM | 80.86% | 80.64% | 18.26% |
| Decision Tree (Baseline) | 74.15% | 74.63% | 25.85% |

Full training pipeline, feature importance plots, and confusion matrices are available in the Jupyter notebook: [ai_model_layer/REDAT_SmartLivestock.ipynb](./ai_model_layer/REDAT_SmartLivestock.ipynb).

### Claim 2: The system detects health problems earlier than manual inspection.

**Reasoning:** Manual inspection happens 1–2 times per day and relies on visible symptoms. REDAT collar readings stream continuously (configurable intervals, e.g. every 5 minutes). The ML model can flag subtle feature interactions — such as a rising body-temperature-to-activity ratio combined with declining water intake — that are invisible to the human eye but correlate with early-stage heat stress or illness. This means REDAT can flag a problem **hours before** visible symptoms appear.

**Honest limitation:** We have not yet conducted a controlled trial comparing REDAT detection time vs. manual inspection on live camels in the field. This claim is based on the sensor capability and the model's ability to detect non-obvious feature combinations. A field trial is the next validation step (see Section 7).

### Claim 3: The community pin board reduces information asymmetry between farms.

**Evidence:** The feature is fully built and functional. Farmers can post categorized pins (water wells, disease outbreaks, grazing areas, hazards), comment on each other's pins, and verify reports. In our demo dataset modeled on the Al Qua'a area, a disease outbreak pin from one farm is immediately visible to all neighboring farmers, with distance calculations and navigation.

**Honest limitation:** We have not yet deployed this to real farmers for a community-scale test. The value proposition is straightforward (shared awareness replaces word-of-mouth), but we cannot yet quantify adoption rates or response-time improvements.

---

## 5. Feasibility and Deployment

### Hardware Requirements and Cost

REDAT requires a ruggedized IoT collar on each camel. We designed the collar specification around commercially available, desert-rated components:

| Component | Purpose | Estimated Unit Cost (AED) |
|---|---|---|
| **ESP32-S3 microcontroller** | Central processor, WiFi/BLE connectivity | ~35 |
| **NEO-6M GPS module** | Real-time geolocation tracking | ~25 |
| **MAX30102 pulse oximeter/heart rate sensor** | Non-invasive heart rate monitoring | ~15 |
| **DS18B20 waterproof temperature probe** | Body temperature sensing (secured against hide) | ~10 |
| **DHT22 sensor** | Ambient temperature and humidity | ~10 |
| **MPU6050 accelerometer/gyroscope** | Activity level and movement detection | ~10 |
| **SIM800L GSM/GPRS module** | Cellular data transmission from remote desert areas | ~30 |
| **3.7V 6000mAh LiPo battery + solar trickle charger** | Power (designed for multi-day operation with solar top-up) | ~60 |
| **Ruggedized nylon collar casing** | Desert-proof enclosure (sand, heat, impact resistant) | ~40 |
| **Total per collar** | | **~AED 235 (~USD 64)** |

**At scale (100+ units):** Component costs drop significantly with bulk purchasing. Estimated per-unit cost at scale: **~AED 150 (~USD 41)**.

### Software Infrastructure Cost

| Service | Cost | Notes |
|---|---|---|
| **Firebase (Spark → Blaze plan)** | Free tier covers a pilot of ~50 camels. Blaze plan scales at ~USD 0.01/GB. | Real-time database for telemetry storage. |
| **FastAPI backend (cloud hosting)** | ~USD 5–20/month on a basic VPS (e.g., DigitalOcean, AWS Lightsail) | Runs ML inference + Gemini API calls. |
| **Gemini 3.5 Flash API** | Pay-per-use, approximately USD 0.15 per 1M input tokens | Very low cost for advisory generation. |
| **Mobile app** | Free to distribute via Expo / APK sideloading | No app store fees for initial pilot. |

### Who runs it

- **Pilot phase:** Our team deploys and maintains the system for 3–5 partnering farms in Al Qua'a.
- **Scaling phase:** A local agricultural cooperative or extension office manages the web dashboard. Individual farmers use the mobile app independently.
- **Maintenance:** Collars require battery monitoring (visible in the app) and periodic physical inspection. The software auto-updates via cloud deployment.


## 6. Scalability

### Phase 1: Al Qua'a Pilot (0–6 months)
- Deploy to **3–5 farms, 20–50 camels** with physical collars.
- Validate ML predictions against veterinarian assessments.
- Iterate on collar hardware based on field feedback.
- Build the community pin board with real local data.

### Phase 2: Al Ain Region Expansion (6–18 months)
- Scale to **50+ farms** across the wider Al Ain region.
- Partner with Abu Dhabi Agriculture and Food Safety Authority (ADAFSA) for veterinary validation data.
- Integrate with local veterinary clinics for automated referral alerts.
- Add a herd manager web dashboard for cooperative-level oversight.

### Phase 3: Other Livestock and Other Regions (18+ months)
- **Same architecture, different animals.** The ML pipeline is model-agnostic — retraining the CatBoost classifier on sheep, goat, or cattle physiology data requires only a new training dataset, not a new system.
- **Geographic replication.** Nothing in the system is UAE-specific except the mock data and map coordinates. The collar hardware, cloud pipeline, and mobile app are region-neutral.
- **Potential markets:** Saudi Arabia (~1.4M camels), Oman, Jordan, and East African pastoralist communities.

### Technical scalability:
- **Firebase Realtime Database** scales horizontally and is designed for IoT workloads.
- **FastAPI** can be load-balanced behind multiple workers. CatBoost inference is extremely fast (~1 ms per prediction).
- **Gemini API** scales on demand with no infrastructure management.
- The architecture has **no single-threaded bottleneck** — each collar's telemetry is processed independently.

---

## 7. Evidence and Validation

### 7.1 Machine Learning Validation

| Evidence | Details |
|---|---|
| **Training dataset** | 10,234 samples across 4 health classes, with class distribution: healthy 54.7%, heat_stress 20.2%, low_activity 14.7%, possible_illness 10.4%. |
| **Validation method** | 5-fold stratified cross-validation. |
| **Selected model** | CatBoost Classifier — 81.51% test accuracy, 81.43% F1-score, 4.40% train–test generalization gap. |
| **Feature engineering** | 6 engineered features: Heat Index, Temp-Activity Ratio, Hydration Stress, Mobility Score, Fever Flag, Critical Ambient Flag. |
| **Reproducibility** | Full notebook with all code, data processing, training, and evaluation: [`ai_model_layer/REDAT_SmartLivestock.ipynb`](ai_model_layer/REDAT_SmartLivestock.ipynb). |
| **Serialized artifacts** | Trained model (`redat_best_model.pkl`), scaler, label encoder, and feature columns all committed to the repo in `ai_model_layer/redat_smart_livestock_model/`. |

### 7.2 Working Software (Readiness Evidence)

The following components are fully built and functional:

| Component | What it does | Verification |
|---|---|---|
| **FastAPI prediction endpoint** (`/predict_health`) | Accepts 8 raw sensor values, engineers features, runs CatBoost inference, returns health classification. | Send a POST request to the endpoint and receive a prediction. Tested with curl examples below. |
| **FastAPI chat endpoint** (`/ask`) | Sends farm context + user question to Gemini 3.5 Flash, returns conversational veterinary advice. | Functional with a valid Gemini API key. |
| **Mobile app — 11 screens** | Login, Register, Dashboard, Camel Roster, Camel Detail, GPS Map, Community Board, Add Pin, Pin Detail, Chat, Notifications, Analytics, Profile, Settings. | Run with `npm start` and scan QR with Expo Go. |
| **Web dashboard — 7 pages** | Herd Overview, Live Camel Map, AI Risk Heatmap, Community Knowledge Map, Predictive Analytics, Alert Center, REDAT Intelligence. | Run with `npm run dev` in `web-dashboard/`. |

### 7.3 What Is Not Yet Done (Honest Gaps)

| Gap | Status | Impact |
|---|---|---|
| **Physical IoT collar prototype** | Not built. Hardware BOM is specified but no assembled prototype yet. | The system currently uses realistic mock data instead of live telemetry. The software pipeline is ready to receive real data — the collar is the missing physical piece. |
| **Field trial with real camels** | Not conducted. | ML accuracy is validated on a synthetic dataset. Real-world accuracy may differ and needs field validation. |
| **Real farmer usability testing** | Not yet done with actual Al Qua'a farmers. | The UI is designed for low-tech users (large targets, Arabic, AI chatbot), but actual usability is unverified. |
| **Production security hardening** | CORS is open (`*`), no rate limiting, no API authentication on endpoints. | Acceptable for hackathon demo, not production-ready. Would need JWT auth, rate limiting, and CORS restriction before real deployment. |

### 7.4 Domain References

- Camel physiology parameters (normal body temperature 36–39 °C, heat stress threshold > 40 °C) are based on published veterinary literature (Faye, B., "The Camel Today," *Livestock Science*, 2020).
- UAE camel population estimates sourced from UAE Ministry of Climate Change and Environment public data.
- IoT sensor module specifications and pricing from standard electronics suppliers (e.g., Mouser, AliExpress, local UAE distributors).

---

## 8. How to Run or Verify It, and Tools Used

### Prerequisites

| Tool | Version |
|---|---|
| **Node.js** | v18 or higher |
| **Python** | v3.10 or higher |
| **npm** | Included with Node.js |
| **Expo Go** (mobile) | Latest version on iOS or Android |

### Step 1: AI Backend (FastAPI + ML Model)

```bash
# Navigate to backend directory
cd ai_model_layer

# Create and activate virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside `ai_model_layer/`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the server:
```bash
uvicorn main:app --reload --port 8000
```

**Verify it works:**
```bash
# Health check
curl http://127.0.0.1:8000/health
# Expected: {"status":"ok","ml_model_loaded":true}

# Test a prediction
curl -X POST http://127.0.0.1:8000/predict_health \
  -H "Content-Type: application/json" \
  -d '{"body_temp":40.5,"activity_level":3,"heart_rate":55,"movement_km":1.2,"ambient_temp":46,"humidity":18,"water_intake":8,"time_of_day":"afternoon"}'
# Expected: {"status":"success","prediction":"heat_stress"}
```

Swagger documentation available at: `http://127.0.0.1:8000/docs`

### Step 2: Mobile App (React Native + Expo)

```bash
# From the project root
npm install

# Start the Expo bundler
npm run start
```

Scan the QR code with **Expo Go** on your phone, or press `a` for Android emulator / `i` for iOS simulator.

### Step 3: Web Dashboard (Vite + React)

```bash
cd web-dashboard

npm install

npm run dev
```

Opens at `http://localhost:5173`.

---

### Tools and Technologies Used

| Layer | Tools |
|---|---|
| **Mobile app** | React Native (Expo 54), React Navigation 7, Zustand 5 (state management), React Query 5, React Native Maps, React Native Reanimated 4, Expo Location, Expo Camera, Expo Haptics |
| **Web dashboard** | React 19, Vite 8, React Router 7, Recharts 3 (visual analytics), Leaflet / React-Leaflet (maps), Lucide React (icons) |
| **AI & ML backend** | Python 3, FastAPI, CatBoost, XGBoost, Scikit-Learn, Pandas, Joblib, Google Generative AI SDK (Gemini 3.5 Flash), Uvicorn |
| **Database & Auth** | Firebase Realtime Database, Firebase Authentication |
| **ML notebook** | Jupyter Notebook, Matplotlib, Seaborn (visualization during training) |
| **Version control** | Git, GitHub |
| **AI tools used** | GitHub Copilot and Gemini were used to assist with code generation, debugging, and documentation during the hackathon. All architecture decisions, ML pipeline design, and domain logic are our own. |

---

### Repository Structure

```
redat-smart-livestock/
├── ai_model_layer/                    # Backend + ML
│   ├── main.py                        # FastAPI server (prediction + chat endpoints)
│   ├── requirements.txt               # Python dependencies
│   ├── REDAT_SmartLivestock.ipynb      # Full ML training & validation notebook
│   └── redat_smart_livestock_model/    # Serialized model artifacts
│       ├── redat_best_model.pkl        # Trained CatBoost classifier
│       ├── redat_catboost.cbm          # CatBoost native format
│       ├── redat_scaler.pkl            # Feature scaler
│       ├── redat_label_encoder.pkl     # Label encoder
│       └── redat_feature_cols.pkl      # Feature column order
├── src/                               # Mobile app (React Native)
│   ├── screens/                       # 11 app screens
│   │   ├── auth/                      #   Login, Register
│   │   ├── dashboard/                 #   Home dashboard
│   │   ├── camels/                    #   Camel roster & detail
│   │   ├── map/                       #   GPS tracking map
│   │   ├── community/                 #   Community pins, add pin, pin detail
│   │   ├── chat/                      #   AI veterinary chatbot
│   │   ├── alerts/                    #   Alert management
│   │   ├── analytics/                 #   Herd analytics
│   │   ├── notifications/             #   Push notifications
│   │   ├── profile/                   #   User profile
│   │   └── settings/                  #   App settings
│   ├── components/                    # Reusable UI components
│   ├── navigation/                    # React Navigation config
│   ├── store/                         # Zustand state stores
│   ├── data/                          # Mock data for demo
│   └── theme/                         # Design system & colors
├── web-dashboard/                     # Web admin dashboard
│   └── src/
│       ├── pages/                     # 7 dashboard pages
│       │   ├── HerdOverview.jsx
│       │   ├── LiveCamelMap.jsx
│       │   ├── AIRiskHeatmap.jsx
│       │   ├── RedatIntelligence.jsx
│       │   ├── CommunityKnowledgeMap.jsx
│       │   ├── PredictiveAnalytics.jsx
│       │   └── AlertCenter.jsx
│       ├── components/                # Layout & shared components
│       ├── context/                   # Theme context
│       └── data/                      # Dashboard mock data
├── assets/                            # App icons, splash, architecture diagram
├── App.js                             # Mobile app entry point
├── app.json                           # Expo configuration
└── package.json                       # Mobile app dependencies
```

---

*Developed with 🐪 passion for the Tatweer Hackathon 2026 — enabling the next generation of smart agriculture in Al Qua'a, Al Ain.*
