// lib/api.ts

interface DiabetesPredictionInput {
  glucose: number
  bloodPressure: number
  skinThickness: number
  insulin: number
  bmi: number
  diabetesPedigree: number
  age: number
  pregnancies: number
  gender: string
}

interface DiabetesPredictionResult {
  prediction: string
  probability: number
  risk: "low" | "moderate" | "high"
}

// Load the API key securely from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""

if (!OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key in environment variables")
}

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${OPENAI_API_KEY}`,
}

// Function to call ChatGPT for diabetes prediction
export async function predictDiabetes(data: DiabetesPredictionInput): Promise<DiabetesPredictionResult> {
  try {
    console.log("Sending prediction request with data:", data)

    const prompt = `
      I need a diabetes risk assessment based on the following health metrics:
      - Gender: ${data.gender}
      - Age: ${data.age} years
      - Pregnancies: ${data.pregnancies}
      - Glucose Level: ${data.glucose} mg/dL
      - Blood Pressure: ${data.bloodPressure} mm Hg
      - Skin Thickness: ${data.skinThickness} mm
      - Insulin: ${data.insulin} mu U/ml
      - BMI: ${data.bmi}
      - Diabetes Pedigree Function: ${data.diabetesPedigree}

      Based on these metrics, provide a diabetes risk assessment with the following information:
      1. Prediction (Diabetic or Non-Diabetic)
      2. Probability (as a decimal between 0 and 1)
      3. Risk Level (low, moderate, or high)

      Format your response as a JSON object with the following structure:
      {
        "prediction": "Diabetic" or "Non-Diabetic",
        "probability": decimal between 0 and 1,
        "risk": "low", "moderate", or "high"
      }
    `

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a medical AI assistant specialized in diabetes risk assessment. Provide accurate assessments based on health metrics. Always respond with a valid JSON object.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()
    const content = result.choices[0].message.content

    try {
      const parsedResult = JSON.parse(content)
      return {
        prediction: parsedResult.prediction,
        probability: parsedResult.probability,
        risk: parsedResult.risk,
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error)
      return {
        prediction: data.glucose > 140 ? "Diabetic" : "Non-Diabetic",
        probability: data.glucose > 140 ? 0.75 : 0.25,
        risk: data.glucose > 140 ? "high" : "low",
      }
    }
  } catch (error) {
    console.error("Error predicting diabetes:", error)
    throw error
  }
}

// Function to call ChatGPT for diet recommendations
export async function getDietRecommendations(query: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a nutritionist specializing in diabetes management. 
            Only answer questions related to diet, nutrition, and food recommendations for diabetes management.
            If the question is not related to diet or nutrition, politely decline to answer and suggest asking a diet-related question.
            Keep your answers precise and short.
            Format your responses using bullet points whenever possible.
            Focus on evidence-based dietary recommendations.`,
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()
    return result.choices[0].message.content
  } catch (error) {
    console.error("Error generating diet recommendations:", error)
    return "I'm sorry, I couldn't generate diet recommendations at this time. Please try again later."
  }
}

// Function to call ChatGPT for exercise recommendations
export async function getExerciseRecommendations(query: string): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a certified fitness trainer specializing in exercise programs for people with diabetes.
            Only answer questions related to exercise, physical activity, and fitness for diabetes management.
            If the question is not related to exercise or fitness, politely decline to answer and suggest asking an exercise-related question.
            Keep your answers precise and short.
            Format your responses using bullet points whenever possible.
            Focus on safe and effective exercise recommendations for people with diabetes.`,
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.5,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()
    return result.choices[0].message.content
  } catch (error) {
    console.error("Error generating exercise recommendations:", error)
    return "I'm sorry, I couldn't generate exercise recommendations at this time. Please try again later."
  }
}
