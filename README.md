# 🐪 REDAT: Smart Camel Farming & Predictive Health System

[![React Native](https://img.shields.io/badge/Mobile-React%20Native%20%7C%20Expo-blue?style=for-the-badge&logo=react)](https://reactnative.dev/)
[![React Web](https://img.shields.io/badge/Web-Vite%20%7C%20React%2019-06b6d4?style=for-the-badge&logo=react)](https://react.dev/)
[![FastAPI Backend](https://img.shields.io/badge/API-FastAPI%20%7C%20Python-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/GenAI-Gemini%203.5%20Flash-007acc?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![ML Model](https://img.shields.io/badge/ML-CatBoost-ff6600?style=for-the-badge&logo=analytics)](https://catboost.ai/)
[![Hackathon](https://img.shields.io/badge/Competition-Tatweer%20Hackathon-purple?style=for-the-badge)](#)

> **REDAT** (meaning "reclaiming" or "guiding back" in local dialect) is a state-of-the-art smart agriculture and predictive health platform designed for camel farmers in the UAE and wider Gulf region. By integrating real-time **IoT collar telemetry**, custom-trained **Machine Learning classifiers**, and **Generative AI models**, REDAT revolutionizes traditional livestock management, turning reactive veterinary care into proactive, data-driven herd conservation.

---

## ⚠️ The Problem

Camels are deeply intertwined with the cultural heritage of the UAE and the wider Gulf region. They are also incredibly valuable livestock assets, with some breeds and racing camels holding immense economic value. However, modern camel farming faces several critical challenges:

* **Reactive vs. Proactive Healthcare**: Traditional farming methods rely heavily on periodic visual inspections by farmers or herdsmen. Because camels are stoic animals that often hide signs of weakness, illnesses, injuries, or severe heat stress are frequently detected only after they become critical, leading to high veterinary costs or tragic loss of the animal.
* **Vast and Remote Grazing Environments**: Herds often roam over massive, remote desert regions. Tracking the exact location of individual camels, ensuring they haven't wandered off, and monitoring their daily movement patterns manually is virtually impossible.
* **Extreme Environmental Stress**: Summer temperatures in the UAE frequently exceed 45°C. Without continuous biometric monitoring, it is extremely difficult to know when a camel is experiencing silent dehydration or dangerous heat stress before physical collapse occurs.
* **Isolated Farming Communities**: When a disease outbreak (like Camel Pox) occurs, or when local hazards (like dried wells or broken fences) emerge, farmers have no rapid, centralized way to alert their neighbors, leaving surrounding herds vulnerable.

---

## 📌 Project Overview

**REDAT** bridges the gap between ancient pastoral heritage and cutting-edge modern technology. The platform introduces a comprehensive, end-to-end ecosystem designed to protect and optimize camel herds:

1. **Wearable IoT Telemetry & Biometrics**  
   Every camel is equipped with a ruggedized, smart IoT collar designed for the harsh desert environment. These collars act as continuous health monitors, streaming real-time vitals (body temperature, heart rate), behavioral metrics (activity level, step count), ambient environmental data (humidity, ambient temperature), and precise GPS coordinates to the cloud.

2. **Edge-to-Cloud Machine Learning**  
   Instead of just displaying raw sensor numbers, REDAT makes the data smart. The continuous stream of collar readings is fed into a custom-trained, highly optimized **CatBoost Machine Learning Classifier**. This model instantly analyzes complex feature interactions (such as the ratio of body heat to physical exertion) and yields immediate, highly accurate predictions about the camel's health state—flagging early warnings for heat stress or possible illness long before human eyes could detect them.

3. **Generative Veterinary AI**  
   Understanding raw biometric data can be overwhelming for traditional farmers. REDAT employs **Gemini 3.5 Flash** to act as a 24/7 personalized veterinary assistant. The generative AI constantly monitors the ML predictions, local weather, and herd context, translating complex veterinary warnings into friendly, instant, and highly actionable advisory notes in both Arabic and English. Farmers can even chat naturally with the AI to ask questions about their herd's well-being.

4. **Cooperative Geolocation Network**  
   REDAT goes beyond individual herd management by introducing community-driven security. The platform includes an interactive, shared map where farmers can drop real-time pins to alert their community. Whether it's marking a newly discovered lush grazing area, warning neighbors about a loose wire hazard, confirming water well statuses, or broadcasting local disease outbreaks, REDAT fosters a safer, collaborative agricultural network across the desert.

---

## 🏗️ System Architecture

The following diagram illustrates how REDAT coordinates IoT telemetry, cloud databases, predictive machine learning classifiers, and generative AI models to deliver real-time insights to the farmer.

![REDAT System Architecture](assets/architecture.png)

### 🔄 Architectural Flow & Data Pipeline
1. **The Telemetry Stream (Collar to Firebase)**:
   * The **Collar Device** placed on the camel continuously measures real-time physical telemetry: Body Temperature, Ambient Temperature, Activity Level (accelerometer), Heart Rate, Movement Speed, Humidity, Water Intake, and GPS Coordinates.
   * Telemetry is uploaded in real time and stored securely in the **Firebase Realtime Database**.
2. **Prediction Pipeline (AI Engine Module - FastAPI Backend)**:
   * The **FastAPI Backend** acts as the orchestrator. When telemetry changes, the backend retrieves the live sensor data from Firebase.
   * **Feature Engineering**: The raw data undergoes rapid processing to construct features representing critical indicators:
     * **Heat Index**: Combined physiological and ambient thermal loads ($T_{body} + 0.33 \times T_{ambient}$).
     * **Temp-Activity Ratio**: Relates body temperature to physical exertion.
     * **Hydration Stress**: Ambient temperature scaled against water intake rate.
     * **Mobility Score**: Travel distance multiplied by active hours.
     * **Fever & Ambient Flags**: Binary warning thresholds ($T_{body} > 40.0^\circ\text{C}$).
   * **Classification**: These engineered features are fed into our custom-trained **CatBoost Model** (`redat_best_model.pkl`), which classifies the camel’s status into one of four states: `healthy`, `heat_stress`, `low_activity`, or `possible_illness`.
3. **Contextual Analysis (LLM Integration)**:
   * The predicted health state, along with the farm context (active regional alerts, community pins, and full herd stats), is sent to **Gemini 3.5 Flash**.
   * The LLM synthesizes this complex veterinary data and translates it into friendly, actionable advice tailored for the farmer.
4. **User Delivery (Mobile App & Web Dashboard)**:
   * **Authentication**: The farmer logs into the mobile app securely.
   * **Display**: The application queries the FastAPI backend to display real-time camel trajectories, health status predictions, active alerts, and veterinary advice.
   * **Web Console**: Dashboard administrators track the entire agricultural footprint, localized hazard maps, and predictive analytics curves.

---

## 🧠 Machine Learning & Data Science Layer

The machine learning pipeline was researched and validated inside `ai_model_layer/REDAT_SmartLivestock.ipynb` using a dataset of over **10,000 physiological profiles** representing diverse environmental stresses.

### 📊 Dataset Target Distribution
* **`healthy`**: $54.7\%$ (5,600 samples)
* **`heat_stress`**: $20.2\%$ (2,064 samples)
* **`low_activity`**: $14.7\%$ (1,505 samples)
* **`possible_illness`**: $10.4\%$ (1,065 samples)

### 🏆 Model Comparison & Validation Results
We compared several classification algorithms on 5-fold cross-validation. The final selected model was a **CatBoost Classifier** due to its outstanding accuracy and low generalization gap.

| Model | Test Accuracy | F1 Score | Train-Test Gap |
| :--- | :---: | :---: | :---: |
| 🏆 **CatBoost** | **81.51%** | **81.43%** | **4.40%** *(Best Generalization)* |
| **CatBoost (Tuned)** | 81.18% | 80.89% | 18.82% |
| **Random Forest** | 81.05% | 80.93% | 17.59% |
| **XGBoost** | 80.99% | 80.94% | 14.04% |
| **LightGBM** | 80.86% | 80.64% | 18.26% |
| **Decision Tree (Baseline)** | 74.15% | 74.63% | 25.85% |

---

## 📱 Mobile App Features (React Native & Expo)
Designed with a premium dark-mode aesthetic utilizing modern typography (Roboto Mono) and rich micro-interactions, the mobile application provides farmers with critical tools:
* **Dashboard Console**: Weather monitoring (ambient temperature, humidity, UV index, and regional heat indexes) coupled with live herd analytics.
* **Camel Roster**: Expandable health tracking displaying a custom **ProgressRing** showing health scores, unique identifiers, pregnancy statistics, and vet notes.
* **GPS Tracking & Navigation**: Real-time geolocation of collars relative to home base, displaying distance and prompting direct navigation routes.
* **Community Pin Board**: Interactive map letting farmers add pins about:
  * 💧 **Water Wells** (depth, pump status)
  * 🌾 **Prime Grazing areas** (good grass after rain)
  * ⚠️ **Loose Wire Hazards** (damaged fencing)
  * 🦠 **Disease Outbreaks** (regional camel pox warning)
* **REDAT Intelligence Chat**: Live conversational chatbot that automatically consumes farm context so farmers can ask questions in English or Arabic (e.g., *"Why is Noor's(Noor is camel name) temperature rising?"*).

---

## 💻 Web Dashboard Features (Vite & React)
A powerful tool for herd managers and local agricultural authorities:
* **Herd Overview**: Detailed breakdown of counts (healthy vs. sick/pregnant/heat stress).
* **Live Camel Tracking Map**: Visual markers tracking movement speed and battery telemetry.
* **AI Risk Heatmap**: Real-time risk modeling showcasing regions with high ambient hazard concentrations.
* **Predictive Analytics**: Graphical reports plotting temperature vs. activity over time.
* **Central Alert Hub**: Instantly registers critical-severity predictions generated by the CatBoost classifier.

---

## 🛠️ Technology Stack
* **Mobile Client**: `React Native (Expo)`, `React Navigation`, `Zustand` (State Management), `React Query` (Caching), `React Native Maps`.
* **Web Client**: `React 19`, `Vite`, `Tailwind CSS`, `Recharts` (Visual Analytics).
* **AI & Backend Layer**: `FastAPI` (Python API framework), `Uvicorn`, `CatBoost` / `XGBoost` / `Scikit-Learn`, `Google Generative AI SDK`, `Joblib`, `Pandas`, `Python-Dotenv`.
* **Database & Auth**: `Firebase Realtime Database` & `Firebase Auth`.

---

## 🚀 Installation & Setup

### ⚙️ Prerequisites
Ensure you have the following installed on your system:
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Python](https://www.python.org/) (v3.10 or higher)
* NPM or Yarn

---

### 📡 1. AI Backend Layer & ML Server
Navigate to the `ai_model_layer` directory to start the predictive inference server:

```bash
# Navigate to backend directory
cd ai_model_layer

# Create a virtual environment
python -m venv venv
# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside `ai_model_layer`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the FastAPI development server:
```bash
uvicorn main:app --reload --port 8000
```
The server will start at `http://127.0.0.1:8000`. You can access automated Swagger documentation at `http://127.0.0.1:8000/docs`.

---

### 📱 2. Mobile App (Expo Client)
From the root project directory:

```bash
# Install mobile dependencies
npm install

# Start the Expo bundler
npm run start
```
Use the **Expo Go** application on iOS or Android to scan the generated QR code, or press `a` for Android Emulator / `i` for iOS Simulator.

---

### 💻 3. Web Dashboard
Navigate to the web dashboard directory:

```bash
# Navigate to dashboard
cd web-dashboard

# Install dashboard dependencies
npm install

# Start Vite server
npm run dev
```
The web dashboard will open locally at `http://localhost:5173`.

---
*Developed with 🐪 passion for the Tatweer Hackathon 2026. Enabling the next generation of smart desert agriculture.*