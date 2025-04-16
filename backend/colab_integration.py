# This file would be hosted on Google Colab as a notebook
# It would expose an API endpoint that the frontend can call

import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = tf.keras.models.load_model('diabetes_prediction_model.h5')

# Load the scaler - this would be saved during training
scaler = StandardScaler()
# In a real implementation, you would load the fitted scaler
# scaler = joblib.load('scaler.pkl')

# Define feature names in the same order as used during training
feature_names = [
    'Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 
    'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 
    'Gender_M', 'Gender_F'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        features = data.get('features', [])
        
        if len(features) != len(feature_names):
            return jsonify({
                'error': f'Expected {len(feature_names)} features, got {len(features)}'
            }), 400
        
        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Scale the features
        # In a real implementation, you would use the fitted scaler
        # features_scaled = scaler.transform(features_array)
        features_scaled = features_array  # For demo purposes
        
        # Make prediction
        prediction_prob = model.predict(features_scaled)[0][0]
        prediction = "Diabetic" if prediction_prob > 0.5 else "Non-Diabetic"
        
        # Determine risk level
        if prediction_prob < 0.3:
            risk = "low"
        elif prediction_prob < 0.7:
            risk = "moderate"
        else:
            risk = "high"
        
        # Return prediction
        return jsonify({
            'prediction': prediction,
            'probability': float(prediction_prob),
            'risk': risk
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# This is for local testing only
if __name__ == '__main__':
    app.run(debug=True)
