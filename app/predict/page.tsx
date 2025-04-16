"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertCircle, ArrowRight, CheckCircle, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { predictDiabetes } from "@/lib/api"
// Remove the import for now as we'll implement this differently

interface FormData {
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

interface PredictionResult {
  prediction: string
  probability: number
  risk: "low" | "moderate" | "high"
}

export default function PredictPage() {
  const [formData, setFormData] = useState<FormData>({
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 80,
    bmi: 25,
    diabetesPedigree: 0.5,
    age: 30,
    pregnancies: 0,
    gender: "female",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("form")

  const handleInputChange = (field: keyof FormData, value: number | string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Call the API function that connects to ChatGPT
      const result = await predictDiabetes(formData)
      setResult(result)
      setActiveTab("results")
    } catch (err) {
      setError("An error occurred while processing your request. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950 dark:via-teal-950 dark:to-blue-950"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Health Assessment
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300">
              Diabetes Risk Prediction
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Enter your health metrics to get an assessment of your diabetes risk using our advanced neural network
              model
            </p>
            <div className="flex justify-center mt-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
                Model Ready
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 animate-in fade-in-50 slide-in-from-top-5">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-green-100/50 dark:bg-green-900/20 rounded-xl">
              <TabsTrigger
                value="form"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm"
              >
                Input Form
              </TabsTrigger>
              <TabsTrigger
                value="results"
                disabled={!result}
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-green-600 dark:data-[state=active]:text-green-400 data-[state=active]:shadow-sm"
              >
                Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center">
                    <Activity className="mr-2 h-6 w-6 text-green-600 dark:text-green-400" />
                    Health Metrics
                  </CardTitle>
                  <CardDescription className="text-base">
                    Please provide your health information for an accurate prediction.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <Label htmlFor="gender" className="text-sm font-medium">
                          Gender
                        </Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="age" className="text-sm font-medium">
                            Age
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">{formData.age} years</span>
                        </div>
                        <Slider
                          id="age"
                          min={18}
                          max={100}
                          step={1}
                          value={[formData.age]}
                          onValueChange={(value) => handleInputChange("age", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>18</span>
                          <span>100</span>
                        </div>
                      </div>

                      {formData.gender === "female" && (
                        <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                          <div className="flex justify-between items-center">
                            <Label htmlFor="pregnancies" className="text-sm font-medium">
                              Number of Pregnancies
                            </Label>
                            <span className="text-green-600 dark:text-green-400 font-medium">
                              {formData.pregnancies}
                            </span>
                          </div>
                          <Slider
                            id="pregnancies"
                            min={0}
                            max={15}
                            step={1}
                            value={[formData.pregnancies]}
                            onValueChange={(value) => handleInputChange("pregnancies", value[0])}
                            className="py-2"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0</span>
                            <span>15</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="glucose" className="text-sm font-medium">
                            Glucose Level
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formData.glucose} mg/dL
                          </span>
                        </div>
                        <Slider
                          id="glucose"
                          min={70}
                          max={200}
                          step={1}
                          value={[formData.glucose]}
                          onValueChange={(value) => handleInputChange("glucose", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>70</span>
                          <span>200</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="bloodPressure" className="text-sm font-medium">
                            Blood Pressure
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formData.bloodPressure} mm Hg
                          </span>
                        </div>
                        <Slider
                          id="bloodPressure"
                          min={40}
                          max={130}
                          step={1}
                          value={[formData.bloodPressure]}
                          onValueChange={(value) => handleInputChange("bloodPressure", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>40</span>
                          <span>130</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="skinThickness" className="text-sm font-medium">
                            Skin Thickness
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formData.skinThickness} mm
                          </span>
                        </div>
                        <Slider
                          id="skinThickness"
                          min={10}
                          max={50}
                          step={1}
                          value={[formData.skinThickness]}
                          onValueChange={(value) => handleInputChange("skinThickness", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>10</span>
                          <span>50</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="insulin" className="text-sm font-medium">
                            Insulin
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formData.insulin} mu U/ml
                          </span>
                        </div>
                        <Slider
                          id="insulin"
                          min={0}
                          max={300}
                          step={1}
                          value={[formData.insulin]}
                          onValueChange={(value) => handleInputChange("insulin", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>300</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="bmi" className="text-sm font-medium">
                            BMI
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formData.bmi.toFixed(1)}
                          </span>
                        </div>
                        <Slider
                          id="bmi"
                          min={15}
                          max={50}
                          step={0.1}
                          value={[formData.bmi]}
                          onValueChange={(value) => handleInputChange("bmi", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>15</span>
                          <span>50</span>
                        </div>
                      </div>

                      <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="diabetesPedigree" className="text-sm font-medium">
                            Diabetes Pedigree Function
                          </Label>
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {formData.diabetesPedigree.toFixed(2)}
                          </span>
                        </div>
                        <Slider
                          id="diabetesPedigree"
                          min={0.1}
                          max={2.5}
                          step={0.01}
                          value={[formData.diabetesPedigree]}
                          onValueChange={(value) => handleInputChange("diabetesPedigree", value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0.1</span>
                          <span>2.5</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300 py-6 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Get Prediction <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="results">
              {result && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Activity className="mr-2 h-6 w-6 text-green-600 dark:text-green-400" />
                      Your Diabetes Risk Assessment
                    </CardTitle>
                    <CardDescription className="text-base">Based on the health metrics you provided</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-inner">
                        <h3 className="text-xl font-semibold mb-6 text-center">Prediction Result</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Prediction</div>
                            <div
                              className={`text-lg font-bold ${
                                result.prediction === "Diabetic"
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-green-600 dark:text-green-400"
                              }`}
                            >
                              {result.prediction === "Diabetic" ? "Diabetic" : "Non-Diabetic"}
                            </div>
                          </div>
                          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Probability</div>
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {(result.probability * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Risk Level</div>
                            <div
                              className={`text-lg font-bold ${
                                result.risk === "high"
                                  ? "text-red-600 dark:text-red-400"
                                  : result.risk === "moderate"
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : "text-green-600 dark:text-green-400"
                              }`}
                            >
                              {result.risk.charAt(0).toUpperCase() + result.risk.slice(1)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                result.risk === "high"
                                  ? "bg-gradient-to-r from-yellow-500 to-red-500"
                                  : result.risk === "moderate"
                                    ? "bg-gradient-to-r from-green-500 to-yellow-500"
                                    : "bg-gradient-to-r from-green-500 to-teal-500"
                              }`}
                              style={{ width: `${result.probability * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Low Risk</span>
                            <span>Moderate Risk</span>
                            <span>High Risk</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Info className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
                            What This Means
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {result.prediction === "Diabetic"
                              ? "Based on the information you provided, our model indicates that you may have a higher risk of diabetes. This is not a diagnosis, but we recommend consulting with a healthcare professional for further evaluation."
                              : "Based on the information you provided, our model indicates that you currently have a lower risk of diabetes. However, it's always good to maintain healthy habits and regular check-ups."}
                          </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                            Next Steps
                          </h3>
                          <ul className="space-y-3">
                            {[
                              "Consult with a healthcare professional for a proper medical evaluation",
                              "Explore our Diet Recommendations section for healthy eating tips",
                              "Check out our Exercise Plans to help maintain healthy blood sugar levels",
                              "Schedule regular check-ups to monitor your health",
                            ].map((step, index) => (
                              <li key={index} className="flex items-start">
                                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 mr-3">
                                  <span className="text-green-600 dark:text-green-400 text-xs font-bold">
                                    {index + 1}
                                  </span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">{step}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300">
                              <a href="/diet">Diet Recommendations</a>
                            </Button>
                            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300">
                              <a href="/exercise">Exercise Plans</a>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setResult(null)
                        setActiveTab("form")
                      }}
                      className="border-2 border-gray-200 dark:border-gray-700"
                    >
                      Start Over
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300">
                      Save Results
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <AlertCircle className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Important Information</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  This prediction tool is for informational purposes only and should not be considered a medical
                  diagnosis. Always consult with a healthcare professional for proper medical advice and treatment.
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  The prediction is based on a machine learning model trained on historical data. Individual health
                  situations may vary, and additional factors not captured in this form may affect your actual risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
