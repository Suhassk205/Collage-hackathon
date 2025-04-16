# This file would be used to train the model on Google Colab
# It's based on the code you provided

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.utils.class_weight import compute_class_weight
from sklearn.metrics import confusion_matrix, classification_report, f1_score

from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout, BatchNormalization
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.regularizers import l2
from tensorflow.keras.models import load_model
import joblib

# ---------------------- 1. Data Loading & Preprocessing ---------------------- #
def train_diabetes_model(file_path):
    data = pd.read_csv(file_path)

    # Clean target: strip spaces, convert 'Y'/'N' to 1/0
    data['CLASS'] = data['CLASS'].str.strip().replace({'Y': 1, 'N': 0}).astype(int)

    # One-hot encode Gender column
    data = pd.get_dummies(data, columns=['Gender'], drop_first=False)

    print(data.info())
    print(data.head())
    print("Missing values:\n", data.isnull().sum())
    print("CLASS counts:\n", data['CLASS'].value_counts())

    # Separate features and target
    X = data.drop(columns=['CLASS'])
    y = data['CLASS']

    # ---------------------- 2. Split Data & Scale Features ---------------------- #
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    y_train = np.array(y_train)
    y_test = np.array(y_test)

    print(f"X_train shape: {X_train_scaled.shape}, y_train shape: {y_train.shape}")
    print(f"X_test shape: {X_test_scaled.shape}, y_test shape: {y_test.shape}")
    print("Unique classes in y_train:", np.unique(y_train))

    # Save the scaler for later use
    joblib.dump(scaler, 'scaler.pkl')
    
    # Save feature names
    feature_names = list(X.columns)
    with open('feature_names.json', 'w') as f:
        json.dump(feature_names, f)

    # Compute class weights
    weights = compute_class_weight('balanced', classes=np.unique(y), y=y)
    class_weights = {cls: weight for cls, weight in zip(np.unique(y), weights)}
    print("Class weights:", class_weights)

    # ---------------------- 3. Build a Simpler, Regularized Model ---------------------- #
    model = Sequential([
        Dense(64, activation='relu', input_shape=(X_train_scaled.shape[1],), kernel_regularizer=l2(1e-2)),
        BatchNormalization(),
        Dropout(0.5),
        Dense(32, activation='relu', kernel_regularizer=l2(1e-2)),
        BatchNormalization(),
        Dropout(0.5),
        Dense(1, activation='sigmoid')
    ])

    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

    early_stop = EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True, verbose=1)
    reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=5, min_lr=1e-6, verbose=1)

    history = model.fit(
        X_train_scaled, y_train,
        epochs=100,
        validation_split=0.2,
        batch_size=32,
        callbacks=[early_stop, reduce_lr],
        class_weight=class_weights,
        verbose=1
    )

    # ---------------------- 4. Plot Training History ---------------------- #
    plt.figure(figsize=(14, 5))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.title('Training vs. Validation Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Validation Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.title('Training vs. Validation Loss')
    plt.legend()

    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.close()

    # ---------------------- 5. Evaluate the Model ---------------------- #
    loss, accuracy = model.evaluate(X_test_scaled, y_test, verbose=0)
    print(f"\nTest Accuracy: {accuracy * 100:.2f}%")

    y_pred = (model.predict(X_test_scaled) > 0.5).astype(int)
    f1 = f1_score(y_test, y_pred)
    print(f"F1 Score: {f1:.2f}")

    conf_matrix = confusion_matrix(y_test, y_pred)
    print("\nConfusion Matrix:")
    print(conf_matrix)

    plt.figure(figsize=(6, 4))
    sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues',
                xticklabels=['Non-Diabetic', 'Diabetic'],
                yticklabels=['Non-Diabetic', 'Diabetic'])
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.savefig('confusion_matrix.png')
    plt.close()

    class_report = classification_report(y_test, y_pred, target_names=['Non-Diabetic', 'Diabetic'])
    print("\nClassification Report:")
    print(class_report)

    # ---------------------- 6. Save the Trained Model ---------------------- #
    model.save('diabetes_prediction_model.h5')
    print("\nModel saved as 'diabetes_prediction_model.h5'")
    
    return model, scaler, feature_names

if __name__ == "__main__":
    file_path = 'Cleaned_Diabetes_Dataset.csv'
    train_diabetes_model(file_path)
