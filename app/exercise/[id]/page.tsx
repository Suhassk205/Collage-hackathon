"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, Dumbbell, Flame, Heart, BarChart, Calendar, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface ExerciseDay {
  day: string
  focus: string
  exercises: {
    name: string
    sets?: number
    reps?: number
    duration?: string
    restBetween?: string
    description: string
    technique?: string
  }[]
  warmup: string
  cooldown: string
  totalDuration: string
  intensity: "Low" | "Moderate" | "High"
  caloriesBurn: string
}

interface ExercisePlan {
  id: string
  title: string
  description: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  image: string
  goals: string[]
  equipment: string[]
  schedule: ExerciseDay[]
  tips: string[]
  warnings: string[]
}

export default function ExercisePlanDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("monday")

  // Find the exercise plan based on the ID
  const exercisePlan = exercisePlans.find((plan) => plan.id === params.id)

  if (!exercisePlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <Dumbbell className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">Exercise Plan Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
          We couldn't find the exercise plan you're looking for. It may have been removed or doesn't exist.
        </p>
        <Button
          onClick={() => router.push("/exercise")}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Exercise Plans
        </Button>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/exercise")}
              className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Exercise Plans
            </Button>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative w-full md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full animate-blob"></div>
                    <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-blob animation-delay-4000"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Dumbbell className="h-12 w-12 text-white" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge
                    className={`
                  ${
                    exercisePlan.level === "Beginner"
                      ? "bg-green-500"
                      : exercisePlan.level === "Intermediate"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  } 
                  text-white border-0 mb-2`}
                  >
                    {exercisePlan.level}
                  </Badge>
                  <Badge className="bg-blue-500 text-white border-0 ml-2 mb-2">{exercisePlan.category}</Badge>
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                  {exercisePlan.title}
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{exercisePlan.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                        <Dumbbell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                        <p className="font-medium">{exercisePlan.level}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="font-medium">7 Days</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                        <Flame className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Intensity</p>
                        <p className="font-medium">Varies</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                        <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Category</p>
                        <p className="font-medium">{exercisePlan.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            <Tabs defaultValue="monday" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                  <TabsList className="flex w-full bg-transparent p-0 h-auto">
                    <Link href="/" className="flex-1">
                      <Button
                        variant="ghost"
                        className="w-full rounded-none border-b-2 border-transparent py-3 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </Button>
                    </Link>
                    {exercisePlan.schedule.map((day) => (
                      <TabsTrigger
                        key={day.day.toLowerCase()}
                        value={day.day.toLowerCase()}
                        className="flex-1 rounded-none border-b-2 border-transparent py-3 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-none"
                      >
                        <Calendar className="h-4 w-4 mr-2 hidden sm:inline-block" />
                        {day.day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {exercisePlan.schedule.map((day) => (
                <TabsContent key={day.day.toLowerCase()} value={day.day.toLowerCase()} className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">
                            {day.day} Overview
                          </h3>

                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Focus</p>
                                <p className="font-medium">{day.focus}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                                <p className="font-medium">{day.totalDuration}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                                <Flame className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Intensity</p>
                                <p className="font-medium">{day.intensity}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-3">
                                <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Calories Burn</p>
                                <p className="font-medium">{day.caloriesBurn}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-6 border-t border-blue-100 dark:border-blue-800">
                            <h4 className="font-medium mb-2">Warm-up (5-10 min)</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{day.warmup}</p>

                            <h4 className="font-medium mt-4 mb-2">Cool-down (5-10 min)</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{day.cooldown}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Workout Details</h3>

                      <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
                        {day.exercises.map((exercise, index) => (
                          <motion.div
                            key={index}
                            variants={item}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                          >
                            <div className="flex flex-col">
                              <div className="flex-1 p-5">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                  <h4 className="text-lg font-semibold">{exercise.name}</h4>
                                  <div className="flex gap-2">
                                    {exercise.sets && exercise.reps && (
                                      <Badge
                                        variant="outline"
                                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                      >
                                        {exercise.sets} sets × {exercise.reps} reps
                                      </Badge>
                                    )}
                                    {exercise.duration && (
                                      <Badge
                                        variant="outline"
                                        className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
                                      >
                                        {exercise.duration}
                                      </Badge>
                                    )}
                                    {exercise.restBetween && (
                                      <Badge
                                        variant="outline"
                                        className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                                      >
                                        Rest: {exercise.restBetween}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-3">{exercise.description}</p>

                                {exercise.technique && (
                                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                    <h5 className="text-sm font-medium mb-1">Technique Tips:</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.technique}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800">
                        <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-300">Tips for Today</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                          {exercisePlan.tips.slice(0, 3).map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <Dumbbell className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Equipment Needed
              </h3>
              <ul className="space-y-2">
                {exercisePlan.equipment.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-2">
                      <span className="text-blue-600 dark:text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Goals & Benefits
              </h3>
              <ul className="space-y-2">
                {exercisePlan.goals.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-2">
                      <span className="text-blue-600 dark:text-blue-400 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {exercisePlan.warnings.length > 0 && (
            <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">Important Warnings</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {exercisePlan.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 px-8 py-6 text-lg"
              onClick={() => {
                /* Add to my plan functionality */
              }}
            >
              Add to My Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample exercise plans data
const exercisePlans: ExercisePlan[] = [
  {
    id: "walking",
    title: "Daily Walking Plan",
    description:
      "A comprehensive 7-day walking plan designed specifically for people with diabetes to help control blood sugar levels, improve cardiovascular health, and boost overall fitness.",
    level: "Beginner",
    category: "Cardio",
    image: "/images/walking.png",
    goals: [
      "Improve insulin sensitivity and glucose control",
      "Strengthen cardiovascular system",
      "Burn calories and support weight management",
      "Reduce stress and improve mental wellbeing",
      "Build a sustainable exercise habit",
    ],
    equipment: [
      "Comfortable walking shoes",
      "Water bottle",
      "Fitness tracker (optional)",
      "Glucose monitor",
      "Light weights for some exercises (optional)",
    ],
    schedule: [
      {
        day: "Monday",
        focus: "Endurance Building",
        exercises: [
          {
            name: "Morning Walk",
            duration: "20 minutes",
            description:
              "Start your week with a moderate-paced walk on flat terrain. Focus on maintaining good posture and breathing deeply.",
            technique:
              "Keep your head up, shoulders relaxed, and swing your arms naturally. Take medium-length strides.",
          },
          {
            name: "Evening Stroll",
            duration: "15 minutes",
            description: "A gentle evening walk to help lower post-dinner blood sugar levels.",
            technique: "Walk at a comfortable pace, focusing on relaxation and enjoyment rather than intensity.",
          },
          {
            name: "Standing Calf Raises",
            sets: 2,
            reps: 15,
            restBetween: "30 seconds",
            description: "Stand with feet shoulder-width apart, rise up onto toes, then lower back down.",
            technique: "Hold onto a wall or chair for balance if needed. Rise up as high as possible on your toes.",
          },
        ],
        warmup: "5 minutes of gentle walking followed by ankle rotations and leg swings.",
        cooldown: "5 minutes of slow walking and lower body stretches focusing on calves, hamstrings, and quadriceps.",
        totalDuration: "45-50 minutes",
        intensity: "Low",
        caloriesBurn: "150-200 calories",
      },
      {
        day: "Tuesday",
        focus: "Interval Training",
        exercises: [
          {
            name: "Interval Walking",
            duration: "25 minutes",
            description: "Alternate between 2 minutes of brisk walking and 2 minutes of normal-paced walking.",
            technique:
              "During brisk intervals, increase your pace until you're breathing harder but can still hold a conversation.",
          },
          {
            name: "Seated Leg Extensions",
            sets: 2,
            reps: 12,
            restBetween: "45 seconds",
            description: "Sitting on a chair, extend one leg until straight, hold briefly, then lower.",
            technique: "Keep your back straight against the chair. Extend your leg fully but don't lock your knee.",
          },
          {
            name: "Standing Wall Push-ups",
            sets: 2,
            reps: 10,
            restBetween: "45 seconds",
            description: "Stand facing a wall, place hands on wall at shoulder height, then push body away from wall.",
            technique:
              "Keep your body straight from head to heels. The further your feet are from the wall, the more challenging it becomes.",
          },
        ],
        warmup: "5 minutes of marching in place and arm circles.",
        cooldown: "5 minutes of walking at a decreasing pace followed by upper and lower body stretches.",
        totalDuration: "45-50 minutes",
        intensity: "Moderate",
        caloriesBurn: "200-250 calories",
      },
      {
        day: "Wednesday",
        focus: "Active Recovery",
        exercises: [
          {
            name: "Gentle Nature Walk",
            duration: "30 minutes",
            description:
              "A longer, leisurely walk preferably in a park or natural setting to reduce stress and enjoy the outdoors.",
            technique: "Focus on your surroundings and breathing. This is as much for mental health as physical.",
          },
          {
            name: "Seated Shoulder Rolls",
            sets: 2,
            reps: 10,
            description: "Sitting comfortably, roll shoulders forward, up, back, and down in a circular motion.",
            technique: "Move slowly and deliberately, feeling the full range of motion in your shoulders.",
          },
          {
            name: "Seated Ankle Rotations",
            sets: 2,
            reps: 10,
            description: "Sitting with feet slightly off the ground, rotate ankles in both directions.",
            technique: "Make the circles as large as comfortable, moving through the full range of motion.",
          },
        ],
        warmup: "5 minutes of gentle walking and light stretching.",
        cooldown: "5 minutes of deep breathing exercises and full-body stretching.",
        totalDuration: "45 minutes",
        intensity: "Low",
        caloriesBurn: "120-170 calories",
      },
      {
        day: "Thursday",
        focus: "Strength & Walking",
        exercises: [
          {
            name: "Brisk Walk with Hills",
            duration: "25 minutes",
            description: "Walk at a moderate pace, incorporating hills or inclines if available.",
            technique:
              "Lean slightly forward when going uphill. Take shorter steps if needed. Use arms to help power up hills.",
          },
          {
            name: "Chair Squats",
            sets: 3,
            reps: 10,
            restBetween: "60 seconds",
            description:
              "Stand in front of a chair, lower yourself as if to sit down, then stand back up before touching the seat.",
            technique: "Keep weight in your heels, knees tracking over toes. Only go as low as comfortable.",
          },
          {
            name: "Wall Angels",
            sets: 2,
            reps: 8,
            restBetween: "45 seconds",
            description:
              "Stand with back against wall, arms at 90 degrees. Slide arms up and down while maintaining contact with wall.",
            technique: "Keep lower back, elbows, and hands in contact with the wall throughout the movement.",
          },
        ],
        warmup: "5 minutes of walking in place, arm swings, and gentle torso twists.",
        cooldown: "5 minutes of walking at a decreasing pace and static stretching for worked muscles.",
        totalDuration: "50-55 minutes",
        intensity: "Moderate",
        caloriesBurn: "220-270 calories",
      },
      {
        day: "Friday",
        focus: "Endurance & Balance",
        exercises: [
          {
            name: "Longer Sustained Walk",
            duration: "30 minutes",
            description: "A continuous walk at a steady, moderate pace to build endurance.",
            technique:
              "Focus on maintaining the same pace throughout. Pay attention to your breathing rhythm and try to establish a comfortable, sustainable cadence.",
          },
          {
            name: "Standing Balance Practice",
            sets: 3,
            reps: 30,
            restBetween: "30 seconds",
            description: "Stand on one foot for 30 seconds, then switch. Use a wall or chair for support if needed.",
            technique: "Engage your core muscles and focus your gaze on a fixed point to help maintain balance.",
          },
          {
            name: "Arm Circles",
            sets: 2,
            reps: 15,
            description:
              "Stand with arms extended to sides, make small circles, then medium, then large in both directions.",
            technique: "Keep shoulders relaxed and down away from ears. Move slowly and with control.",
          },
        ],
        warmup: "5 minutes of easy walking and dynamic stretches for shoulders, hips, and ankles.",
        cooldown: "5 minutes of slow walking and full-body stretching with emphasis on legs and lower back.",
        totalDuration: "50 minutes",
        intensity: "Moderate",
        caloriesBurn: "200-250 calories",
      },
      {
        day: "Saturday",
        focus: "Longer Distance",
        exercises: [
          {
            name: "Extended Walk",
            duration: "45 minutes",
            description: "Your longest walk of the week. Choose a scenic route or new location to keep it interesting.",
            technique:
              "Start at a comfortable pace and maintain it. Take a short break at the halfway point if needed.",
          },
          {
            name: "Seated Torso Twists",
            sets: 2,
            reps: 10,
            description: "Sitting on a chair with feet flat, twist torso to one side, then the other.",
            technique:
              "Keep hips facing forward and twist from your waist. Place hands on opposite shoulders or extend them for more challenge.",
          },
        ],
        warmup: "5-10 minutes of easy walking, gradually increasing pace.",
        cooldown: "5-10 minutes of decreasing pace walking and thorough stretching of all major muscle groups.",
        totalDuration: "60-70 minutes",
        intensity: "Moderate",
        caloriesBurn: "300-350 calories",
      },
      {
        day: "Sunday",
        focus: "Active Rest & Flexibility",
        exercises: [
          {
            name: "Leisure Walk",
            duration: "20 minutes",
            description: "A relaxed, enjoyable walk at whatever pace feels comfortable.",
            technique: "No specific technique focus today - just enjoy the movement and fresh air.",
          },
          {
            name: "Full Body Stretching Routine",
            duration: "15 minutes",
            description: "A comprehensive stretching session targeting all major muscle groups.",
            technique:
              "Hold each stretch for 20-30 seconds. Breathe deeply and relax into each stretch without bouncing.",
          },
          {
            name: "Deep Breathing Exercise",
            duration: "5 minutes",
            description: "Seated or lying down, practice deep diaphragmatic breathing.",
            technique: "Inhale slowly through nose for 4 counts, hold for 2, exhale through mouth for 6 counts.",
          },
        ],
        warmup: "5 minutes of gentle movement to prepare for stretching.",
        cooldown: "The stretching routine serves as your cooldown today.",
        totalDuration: "40-45 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
    ],
    tips: [
      "Check your blood sugar before, during (for longer sessions), and after exercise",
      "Always carry a fast-acting carbohydrate source in case of low blood sugar",
      "Stay well hydrated before, during, and after walking",
      "Wear proper footwear with good arch support and cushioning",
      "If you feel pain (not normal muscle fatigue), stop and rest",
      "Try to walk at the same time each day to establish a routine",
      "Consider walking with a friend or family member for motivation",
    ],
    warnings: [
      "Consult your healthcare provider before starting this or any exercise program",
      "If you experience dizziness, unusual shortness of breath, or chest pain, stop immediately and seek medical attention",
      "Be extra cautious if you have peripheral neuropathy or foot problems",
      "Adjust the program based on your blood glucose readings and how you feel",
    ],
  },
  {
    id: "strength",
    title: "Strength Training Basics",
    description:
      "A beginner-friendly strength training program designed specifically for people with diabetes to improve insulin sensitivity, build muscle mass, and enhance overall metabolic health.",
    level: "Intermediate",
    category: "Strength",
    image: "/images/strength-training.png",
    goals: [
      "Increase muscle mass to improve glucose metabolism",
      "Enhance insulin sensitivity",
      "Strengthen bones and joints",
      "Improve functional strength for daily activities",
      "Boost metabolic rate",
    ],
    equipment: [
      "Light to moderate dumbbells",
      "Resistance bands",
      "Exercise mat",
      "Sturdy chair",
      "Water bottle",
      "Glucose monitor",
    ],
    schedule: [
      {
        day: "Monday",
        focus: "Upper Body Strength",
        exercises: [
          {
            name: "Dumbbell Chest Press",
            sets: 3,
            reps: 10,
            restBetween: "60 seconds",
            description: "Lie on back with knees bent, press dumbbells from chest level to full arm extension.",
            technique: "Keep wrists straight and move dumbbells in a slight arc. Don't lock elbows at the top.",
          },
          {
            name: "Seated Rows with Resistance Band",
            sets: 3,
            reps: 12,
            restBetween: "60 seconds",
            description:
              "Sit with legs extended, resistance band around feet. Pull band toward torso while squeezing shoulder blades.",
            technique:
              "Keep back straight, pull elbows back past torso, and squeeze shoulder blades at the end of movement.",
          },
          {
            name: "Dumbbell Shoulder Press",
            sets: 3,
            reps: 10,
            restBetween: "60 seconds",
            description: "Seated or standing, press dumbbells from shoulder height to overhead.",
            technique: "Keep core engaged and avoid arching lower back. Press weights directly overhead.",
          },
          {
            name: "Bicep Curls",
            sets: 2,
            reps: 12,
            restBetween: "45 seconds",
            description: "Standing with dumbbells at sides, curl weights toward shoulders.",
            technique: "Keep elbows close to sides, wrists straight. Control the movement in both directions.",
          },
        ],
        warmup:
          "5 minutes of light cardio (marching in place) followed by arm circles, shoulder rolls, and wrist rotations.",
        cooldown: "5 minutes of upper body stretches focusing on chest, back, shoulders, and arms.",
        totalDuration: "45-50 minutes",
        intensity: "Moderate",
        caloriesBurn: "180-230 calories",
      },
      {
        day: "Tuesday",
        focus: "Cardio & Core",
        exercises: [
          {
            name: "Brisk Walking",
            duration: "20 minutes",
            description: "Moderate-paced walking to elevate heart rate.",
            technique: "Maintain good posture with shoulders back and down, engage core, and take purposeful strides.",
          },
          {
            name: "Modified Plank",
            sets: 3,
            duration: "20-30 seconds",
            restBetween: "45 seconds",
            description: "Hold plank position from knees or toes, keeping body in straight line.",
            technique: "Engage core muscles, keep shoulders over wrists, and don't let hips sag or pike up.",
          },
          {
            name: "Seated Russian Twists",
            sets: 3,
            reps: 10,
            restBetween: "45 seconds",
            description:
              "Sit with knees bent, feet flat or slightly raised. Twist torso to tap hands on floor beside hips.",
            technique: "Keep back straight, chest up. Twist from waist, not shoulders.",
          },
          {
            name: "Supine Leg Raises",
            sets: 2,
            reps: 10,
            restBetween: "45 seconds",
            description:
              "Lie on back, hands at sides or under lower back. Raise straight legs to 90 degrees, then lower slowly.",
            technique: "Keep lower back pressed into floor. Only lower legs as far as you can maintain back position.",
          },
        ],
        warmup: "5 minutes of light cardio and dynamic stretching for core and hips.",
        cooldown: "5 minutes of stretching focusing on abdominals, obliques, and lower back.",
        totalDuration: "40-45 minutes",
        intensity: "Moderate",
        caloriesBurn: "150-200 calories",
      },
      {
        day: "Wednesday",
        focus: "Lower Body Strength",
        exercises: [
          {
            name: "Chair Squats",
            sets: 3,
            reps: 12,
            restBetween: "60 seconds",
            description: "Stand in front of chair, lower as if to sit without touching, then return to standing.",
            technique: "Keep weight in heels, knees tracking over toes but not past them. Chest up, back straight.",
          },
          {
            name: "Standing Calf Raises",
            sets: 3,
            reps: 15,
            restBetween: "45 seconds",
            description: "Stand with feet hip-width apart, rise up onto toes, then lower heels back down.",
            technique: "Hold onto a counter or chair for balance if needed. Rise as high as possible on toes.",
          },
          {
            name: "Glute Bridges",
            sets: 3,
            reps: 12,
            restBetween: "60 seconds",
            description: "Lie on back with knees bent, feet flat. Lift hips toward ceiling, squeezing glutes at top.",
            technique: "Press through heels to lift. Create a straight line from knees to shoulders at the top.",
          },
          {
            name: "Seated Leg Extensions",
            sets: 2,
            reps: 12,
            restBetween: "45 seconds",
            description:
              "Sit on chair, extend one leg until straight, hold briefly, then lower. Repeat with other leg.",
            technique: "Keep back straight against chair. Extend leg fully but don't lock knee.",
          },
        ],
        warmup:
          "5 minutes of marching in place, followed by dynamic lower body stretches like leg swings and ankle rotations.",
        cooldown: "5-10 minutes of static stretching for quadriceps, hamstrings, calves, and glutes.",
        totalDuration: "45-50 minutes",
        intensity: "Moderate",
        caloriesBurn: "200-250 calories",
      },
      {
        day: "Thursday",
        focus: "Active Recovery",
        exercises: [
          {
            name: "Gentle Walking",
            duration: "20 minutes",
            description: "Easy-paced walking to promote blood flow and recovery.",
            technique: "Focus on relaxed, comfortable movement rather than pace or intensity.",
          },
          {
            name: "Full Body Stretching Routine",
            duration: "20 minutes",
            description: "Comprehensive stretching session targeting all major muscle groups worked this week.",
            technique: "Hold each stretch for 30 seconds. Breathe deeply and focus on relaxing into each position.",
          },
          {
            name: "Self-Myofascial Release",
            duration: "10 minutes",
            description: "Using a foam roller or tennis ball to release tension in muscles.",
            technique: "Roll slowly over tight areas, pausing on tender spots for 20-30 seconds.",
          },
        ],
        warmup: "5 minutes of very light movement to increase blood flow.",
        cooldown: "The stretching routine serves as your cooldown today.",
        totalDuration: "50-55 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Friday",
        focus: "Full Body Circuit",
        exercises: [
          {
            name: "Circuit Training (3 rounds)",
            duration: "30 minutes",
            description:
              "Complete each exercise for 40 seconds with 20 seconds rest between exercises and 2 minutes between rounds.",
            technique: "Focus on proper form rather than speed. Modify exercises as needed.",
          },
          {
            name: "Chair Squats",
            description: "Lower toward chair without touching, then stand back up.",
            technique: "Keep weight in heels, chest up, back straight.",
          },
          {
            name: "Wall Push-ups",
            description: "Hands on wall at shoulder height, bend elbows to bring chest toward wall.",
            technique: "Keep body straight from head to heels. The further feet are from wall, the more challenging.",
          },
          {
            name: "Seated Rows with Band",
            description: "Seated with band around feet, pull band toward torso.",
            technique: "Sit tall, pull elbows back, and squeeze shoulder blades together.",
          },
          {
            name: "Marching in Place",
            description: "Lift knees high while marching in place.",
            technique: "Engage core and pump arms for added intensity.",
          },
          {
            name: "Modified Plank",
            description: "Hold plank position from knees or toes.",
            technique: "Keep body in straight line, shoulders over wrists.",
          },
        ],
        warmup: "5 minutes of light cardio and dynamic stretching for all major joints.",
        cooldown: "5-10 minutes of full body stretching and deep breathing.",
        totalDuration: "45-50 minutes",
        intensity: "Moderate to High",
        caloriesBurn: "250-300 calories",
      },
      {
        day: "Saturday",
        focus: "Flexibility & Balance",
        exercises: [
          {
            name: "Standing Balance Exercises",
            sets: 3,
            duration: "30 seconds each side",
            restBetween: "30 seconds",
            description: "Stand on one foot, holding position. Use wall or chair for support if needed.",
            technique: "Engage core, focus gaze on fixed point. Progress by closing eyes or adding arm movements.",
          },
          {
            name: "Seated Spinal Twist",
            sets: 2,
            duration: "30 seconds each side",
            description: "Sit on chair, twist torso to one side holding chair back for deeper stretch.",
            technique: "Keep hips facing forward, initiate twist from lower back and continue through spine.",
          },
          {
            name: "Hamstring Stretch",
            sets: 2,
            duration: "30 seconds each leg",
            description: "Seated on edge of chair, extend one leg, lean forward from hips.",
            technique: "Keep back straight, bend from hips not waist. Feel stretch in back of extended leg.",
          },
          {
            name: "Chest and Shoulder Opener",
            sets: 2,
            duration: "30 seconds",
            description: "Stand in doorway with arms on door frame, step forward to feel stretch.",
            technique: "Keep core engaged, avoid arching lower back. Step forward until you feel gentle stretch.",
          },
        ],
        warmup: "5 minutes of gentle movement to prepare joints and muscles.",
        cooldown: "5 minutes of deep breathing and relaxation exercises.",
        totalDuration: "40-45 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Sunday",
        focus: "Rest & Reflection",
        exercises: [
          {
            name: "Gentle Walking (Optional)",
            duration: "15-20 minutes",
            description: "Very light walking if desired, otherwise complete rest day.",
            technique: "Focus on enjoyment and relaxation rather than exercise intensity.",
          },
          {
            name: "Progress Reflection",
            duration: "10 minutes",
            description: "Review your week's workouts, noting strengths and areas for improvement.",
            technique: "Consider keeping an exercise journal to track progress over time.",
          },
          {
            name: "Week Planning",
            duration: "10 minutes",
            description: "Set goals for the coming week based on how this week felt.",
            technique: "Be realistic and progressive. Consider increasing weights or reps slightly if ready.",
          },
        ],
        warmup: "Not applicable for rest day.",
        cooldown: "Not applicable for rest day.",
        totalDuration: "30-40 minutes",
        intensity: "Very Low",
        caloriesBurn: "50-100 calories",
      },
    ],
    tips: [
      "Start with lighter weights and focus on proper form before increasing",
      "Check blood glucose before and after workouts to understand your body's response",
      "Stay well hydrated throughout your workouts",
      "Breathe out during the exertion phase of each exercise",
      "Progress gradually by increasing weights, reps, or sets over time",
      "Listen to your body and rest when needed",
      "Aim for consistency rather than intensity, especially when starting",
    ],
    warnings: [
      "Consult your healthcare provider before beginning this program",
      "If you have retinopathy, avoid exercises that increase pressure in the eyes",
      "For those with neuropathy, be extra cautious with balance exercises",
      "Stop immediately if you experience dizziness, unusual shortness of breath, or pain",
      "Have fast-acting carbohydrates available in case of hypoglycemia",
    ],
  },
  {
    id: "yoga",
    title: "Yoga for Diabetes",
    description:
      "A gentle yoga program designed to reduce stress, improve circulation, and enhance insulin sensitivity for people with diabetes.",
    level: "Beginner",
    category: "Flexibility",
    image: "/images/yoga.png",
    goals: [
      "Reduce stress and cortisol levels that can affect blood sugar",
      "Improve circulation to enhance insulin delivery",
      "Stimulate pancreatic function through specific poses",
      "Increase body awareness and mindfulness",
      "Enhance flexibility and joint mobility",
      "Promote better sleep quality",
    ],
    equipment: [
      "Yoga mat",
      "2 yoga blocks (or thick books)",
      "Yoga strap (or belt/scarf)",
      "Comfortable clothing",
      "Blanket for relaxation",
      "Chair for modified poses",
      "Water bottle",
      "Glucose monitor",
    ],
    schedule: [
      {
        day: "Monday",
        focus: "Gentle Introduction & Stress Reduction",
        exercises: [
          {
            name: "Seated Breathing Practice",
            duration: "5 minutes",
            description:
              "Seated comfortably, practice deep diaphragmatic breathing to activate the relaxation response.",
            technique:
              "Inhale slowly through nose for 4 counts, exhale through nose for 6 counts. Place one hand on belly to feel it rise and fall.",
          },
          {
            name: "Seated Spinal Twists",
            duration: "5 minutes",
            description: "Sitting cross-legged or on a chair, gently twist torso to each side to stimulate digestion.",
            technique: "Keep spine tall, twist from base of spine. Use hands on knees or chair for gentle leverage.",
          },
          {
            name: "Cat-Cow Pose Flow",
            duration: "5 minutes",
            description: "On hands and knees, alternate between arching and rounding the spine with breath.",
            technique:
              "Inhale into cow pose (spine arched, belly down), exhale into cat pose (spine rounded, belly in). Move slowly with breath.",
          },
          {
            name: "Mountain Pose to Forward Fold",
            duration: "5 minutes",
            description: "Standing tall, then folding forward with bent knees to release tension.",
            technique:
              "Keep knees soft, fold from hips not waist. Let head and arms hang heavy. Rise slowly to avoid dizziness.",
          },
          {
            name: "Supported Child's Pose",
            duration: "5 minutes",
            description:
              "Resting pose with knees wide, big toes touching, sitting back on heels with arms extended or alongside body.",
            technique:
              "Use a blanket under knees if uncomfortable. Rest forehead on mat or stacked fists/blocks for support.",
          },
        ],
        warmup: "5 minutes of gentle joint rotations (wrists, shoulders, neck, ankles) and light stretching.",
        cooldown: "5 minutes of Savasana (corpse pose) - lying flat on back with arms and legs relaxed outward.",
        totalDuration: "40 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Tuesday",
        focus: "Lower Body Circulation",
        exercises: [
          {
            name: "Seated Ankle Rotations",
            duration: "3 minutes",
            description: "Sitting with one leg extended, rotate ankle in both directions to improve circulation.",
            technique:
              "Make circles as large as comfortable. Repeat with other ankle. Flex and point feet between sets.",
          },
          {
            name: "Reclined Hamstring Stretch",
            duration: "6 minutes (3 minutes per side)",
            description:
              "Lying on back, extend one leg up with strap around foot, gently pulling to stretch hamstring.",
            technique:
              "Keep opposite leg bent with foot on floor for lower back support. Only straighten raised leg as much as comfortable.",
          },
          {
            name: "Butterfly Pose",
            duration: "5 minutes",
            description: "Sitting with soles of feet together, knees wide, gently press knees toward floor.",
            technique: "Sit on folded blanket if hips are tight. Don't force knees down - use gravity and time.",
          },
          {
            name: "Seated Forward Fold",
            duration: "5 minutes",
            description: "Sitting with legs extended, fold forward from hips reaching toward feet.",
            technique:
              "Bend knees if hamstrings are tight. Focus on lengthening spine forward rather than reaching toes.",
          },
          {
            name: "Legs Up The Wall",
            duration: "10 minutes",
            description: "Lie on back with legs extended up wall, forming an L-shape with body.",
            technique:
              "Position buttocks as close to wall as comfortable. Use folded blanket under hips for support if needed.",
          },
        ],
        warmup: "5 minutes of gentle walking in place and ankle/knee mobility exercises.",
        cooldown: "5 minutes of Savasana with deep breathing.",
        totalDuration: "40 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Wednesday",
        focus: "Abdominal Organs & Digestion",
        exercises: [
          {
            name: "Seated Side Bends",
            duration: "4 minutes",
            description: "Sitting cross-legged, extend one arm overhead and bend to opposite side.",
            technique:
              "Keep both sitting bones grounded. Create length before bending sideways. Breathe into the stretched side.",
          },
          {
            name: "Gentle Supine Twist",
            duration: "6 minutes (3 minutes per side)",
            description: "Lying on back, knees to chest then gently drop knees to one side while looking opposite way.",
            technique: "Keep both shoulders on the floor. Use a pillow under knees if needed for comfort.",
          },
          {
            name: "Wind-Relieving Pose",
            duration: "4 minutes",
            description: "Lying on back, draw one knee to chest and hold, then switch legs, then both knees.",
            technique:
              "Gently press knee toward chest without straining. Keep opposite leg extended or bent as needed for comfort.",
          },
          {
            name: "Modified Bow Pose",
            duration: "5 minutes",
            description: "Lying on belly, bend knees and hold ankles or calves, gently lifting chest.",
            technique:
              "For gentler version, keep one leg down and work one side at a time. Focus on opening chest rather than height.",
          },
          {
            name: "Seated Forward Fold with Twist",
            duration: "6 minutes",
            description: "From seated forward fold, twist to place one hand beside hip and reach other arm up.",
            technique: "Initiate twist from base of spine. Look up toward raised hand if neck is comfortable.",
          },
        ],
        warmup: "5 minutes of gentle cat-cow flows and torso circles.",
        cooldown: "5 minutes of Savasana with body scan meditation.",
        totalDuration: "40 minutes",
        intensity: "Low to Moderate",
        caloriesBurn: "120-170 calories",
      },
      {
        day: "Thursday",
        focus: "Gentle Standing Flow",
        exercises: [
          {
            name: "Mountain Pose with Arm Flows",
            duration: "5 minutes",
            description:
              "Standing tall, synchronize arm movements with breath - raising on inhale, lowering on exhale.",
            technique:
              "Ground through all four corners of feet. Keep shoulders relaxed away from ears throughout movement.",
          },
          {
            name: "Standing Side Bends",
            duration: "4 minutes",
            description: "From mountain pose, extend one arm overhead and bend to opposite side.",
            technique: "Keep both feet grounded with equal weight. Avoid leaning forward or backward.",
          },
          {
            name: "Warrior II Pose",
            duration: "6 minutes (3 minutes per side)",
            description: "Wide stance with front knee bent, arms extended, gaze over front hand.",
            technique: "Align front knee over ankle. Keep torso centered between legs, not leaning forward.",
          },
          {
            name: "Tree Pose with Chair Support",
            duration: "6 minutes (3 minutes per side)",
            description: "Balance on one leg with other foot against inner leg, using chair for support if needed.",
            technique: "Place foot against ankle, calf, or inner thigh (avoid knee). Use wall or chair for balance.",
          },
          {
            name: "Standing Forward Fold",
            duration: "4 minutes",
            description: "Fold forward from hips with soft knees, letting head and arms hang heavy.",
            technique:
              "Bend knees generously to release lower back. Focus on lengthening spine rather than touching floor.",
          },
        ],
        warmup: "5 minutes of gentle walking in place and joint mobility exercises.",
        cooldown: "5 minutes of seated forward fold and relaxation breathing.",
        totalDuration: "40 minutes",
        intensity: "Moderate",
        caloriesBurn: "150-200 calories",
      },
      {
        day: "Friday",
        focus: "Balance & Mindfulness",
        exercises: [
          {
            name: "Seated Meditation",
            duration: "5 minutes",
            description:
              "Sitting comfortably, focus on breath and body sensations to cultivate present-moment awareness.",
            technique:
              "Use chair if floor sitting is uncomfortable. Keep spine tall but not rigid. Return attention to breath when mind wanders.",
          },
          {
            name: "Chair Sun Salutations",
            duration: "10 minutes",
            description: "Modified sequence of poses done with chair support to warm up the body.",
            technique: "Move with breath. Use chair for balance and support. Modify range of motion as needed.",
          },
          {
            name: "Standing Figure 4 Balance",
            duration: "6 minutes (3 minutes per side)",
            description: "Balance on one leg with opposite ankle crossed above knee, creating figure 4 shape.",
            technique:
              "Use wall or chair for support. Keep standing knee soft. Fold forward slightly for deeper stretch.",
          },
          {
            name: "Warrior I Pose",
            duration: "6 minutes (3 minutes per side)",
            description: "Lunge position with back foot angled, hips forward, arms reaching overhead.",
            technique:
              "Align front knee over ankle. Keep back heel grounded. Modify arm position if shoulders are tight.",
          },
          {
            name: "Wide-Legged Forward Fold",
            duration: "5 minutes",
            description: "Standing with feet wide apart, fold forward from hips with hands on floor or blocks.",
            technique:
              "Keep feet parallel or slightly turned out. Bend knees as needed. Use blocks under hands if floor is too far.",
          },
        ],
        warmup: "5 minutes of gentle joint mobility and breath awareness.",
        cooldown: "5 minutes of seated twist and forward fold.",
        totalDuration: "45 minutes",
        intensity: "Moderate",
        caloriesBurn: "150-200 calories",
      },
      {
        day: "Saturday",
        focus: "Restorative Practice",
        exercises: [
          {
            name: "Supported Bridge Pose",
            duration: "7 minutes",
            description: "Lie on back, feet flat near buttocks, lift hips and place block or cushion under sacrum.",
            technique: "Start with lower height of support. Adjust position for comfort. Arms can rest alongside body.",
          },
          {
            name: "Supported Bound Angle Pose",
            duration: "8 minutes",
            description: "Reclined butterfly pose with bolster or folded blankets supporting spine and head.",
            technique:
              "Place support under spine from lower back to head. Use additional supports under outer thighs if needed.",
          },
          {
            name: "Supported Child's Pose",
            duration: "7 minutes",
            description: "Child's pose with bolster or folded blankets supporting torso and head.",
            technique:
              "Place support between thighs extending to forehead. Turn head to alternate sides halfway through.",
          },
          {
            name: "Legs Up The Wall with Hip Support",
            duration: "10 minutes",
            description: "Legs up wall pose with folded blanket supporting hips for deeper relaxation.",
            technique:
              "Position support under hips before swinging legs up wall. Adjust distance from wall for comfort.",
          },
        ],
        warmup: "5 minutes of gentle stretching and breath awareness.",
        cooldown: "8 minutes of Savasana with guided body scan.",
        totalDuration: "50 minutes",
        intensity: "Low",
        caloriesBurn: "80-120 calories",
      },
      {
        day: "Sunday",
        focus: "Gentle Flow & Integration",
        exercises: [
          {
            name: "Seated Centering Practice",
            duration: "5 minutes",
            description: "Seated meditation focusing on breath and setting intention for practice.",
            technique:
              "Find comfortable seated position. Connect with natural rhythm of breath. Set positive intention.",
          },
          {
            name: "Gentle Sun Salutation Variations",
            duration: "10 minutes",
            description: "Modified flowing sequence linking breath with movement.",
            technique: "Move at slower pace. Modify poses as needed. Focus on breath coordination with movement.",
          },
          {
            name: "Standing Balance Flow",
            duration: "8 minutes",
            description: "Gentle flow between mountain pose, tree pose, and warrior III with modifications.",
            technique:
              "Use wall or chair for support. Hold each pose for several breaths. Focus on stability before mobility.",
          },
          {
            name: "Seated Twist Series",
            duration: "6 minutes",
            description: "Series of seated spinal twists to improve digestion and spinal mobility.",
            technique:
              "Lengthen spine before twisting. Twist from base of spine upward. Use gentle pressure from hands.",
          },
          {
            name: "Final Relaxation with Guided Meditation",
            duration: "10 minutes",
            description: "Savasana with focus on body awareness and stress reduction.",
            technique:
              "Use supports under knees and head if needed. Cover with blanket to stay warm. Allow complete relaxation.",
          },
        ],
        warmup: "5 minutes of gentle joint mobility and breath awareness.",
        cooldown: "5 minutes of guided relaxation focusing on each body part.",
        totalDuration: "45 minutes",
        intensity: "Low to Moderate",
        caloriesBurn: "120-170 calories",
      },
    ],
    tips: [
      "Practice at the same time each day, preferably before meals or 2-3 hours after eating",
      "Check blood glucose before and after yoga sessions to understand your body's response",
      "Always move within your comfortable range - never force or strain",
      "Use props liberally to support your practice and prevent injury",
      "Focus on breath quality throughout your practice",
      "Stay well hydrated before and after practice",
      "If you feel dizzy, lightheaded, or experience unusual symptoms, stop and rest",
    ],
    warnings: [
      "Consult your healthcare provider before beginning this yoga program",
      "If you have retinopathy, avoid inversions and poses where head goes below heart",
      "For neuropathy in feet, practice extra awareness during standing poses",
      "If you have uncontrolled high blood pressure, avoid full inversions",
      "Have fast-acting carbohydrates nearby in case of hypoglycemia",
      "Modify or skip poses that cause pain or discomfort",
    ],
  },
  {
    id: "hiit",
    title: "HIIT Workout",
    description:
      "High-intensity interval training designed specifically for people with well-controlled diabetes to maximize calorie burn, improve cardiovascular fitness, and enhance glucose metabolism in short, efficient workouts.",
    level: "Advanced",
    category: "Cardio",
    image: "/images/hiit.png",
    goals: [
      "Improve insulin sensitivity and glucose uptake by muscles",
      "Maximize calorie burn in minimal time",
      "Enhance cardiovascular fitness and endurance",
      "Increase metabolic rate for hours after workout (afterburn effect)",
      "Build functional strength and power",
      "Improve body composition",
    ],
    equipment: [
      "Comfortable athletic shoes",
      "Exercise mat",
      "Water bottle",
      "Glucose monitor",
      "Timer or interval timer app",
      "Light dumbbells (optional)",
      "Jump rope (optional)",
      "Heart rate monitor (recommended)",
    ],
    schedule: [
      {
        day: "Monday",
        focus: "Lower Body HIIT",
        exercises: [
          {
            name: "Warm-up Circuit",
            duration: "5 minutes",
            description: "Dynamic movements to prepare lower body for intense exercise.",
            technique:
              "Perform each movement for 30 seconds: marching in place, bodyweight squats, leg swings, ankle bounces, hip circles.",
          },
          {
            name: "Squat Variations Interval",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute between sets",
            description: "20 seconds bodyweight squats, 10 seconds rest, 20 seconds squat pulses, 10 seconds rest.",
            technique: "Keep weight in heels, knees tracking over toes. Maintain neutral spine throughout.",
          },
          {
            name: "Lunge Matrix Interval",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute between sets",
            description: "20 seconds forward lunges, 10 seconds rest, 20 seconds reverse lunges, 10 seconds rest.",
            technique:
              "Step far enough to create 90-degree angles with both knees. Keep front knee aligned over ankle.",
          },
          {
            name: "Glute Bridge Variations",
            sets: 3,
            duration: "3 minutes",
            restBetween: "1 minute between sets",
            description: "20 seconds basic bridges, 10 seconds rest, 20 seconds single-leg bridges, 10 seconds rest.",
            technique:
              "Press through heels to lift hips. Squeeze glutes at top position. Keep core engaged throughout.",
          },
        ],
        warmup: "5 minutes of light cardio and dynamic stretching focusing on lower body.",
        cooldown: "5 minutes of static stretching for quadriceps, hamstrings, calves, and hip flexors.",
        totalDuration: "30 minutes",
        intensity: "High",
        caloriesBurn: "250-350 calories",
      },
      {
        day: "Tuesday",
        focus: "Active Recovery",
        exercises: [
          {
            name: "Light Walking",
            duration: "15 minutes",
            description: "Easy-paced walking to promote blood flow and recovery.",
            technique: "Focus on relaxed, comfortable movement rather than pace or intensity.",
          },
          {
            name: "Dynamic Stretching Flow",
            duration: "10 minutes",
            description: "Flowing movement through various stretches to maintain mobility.",
            technique: "Move gently through stretches without holding. Focus on smooth transitions and breathing.",
          },
          {
            name: "Self-Myofascial Release",
            duration: "10 minutes",
            description: "Using foam roller or tennis ball to release tension in muscles worked yesterday.",
            technique: "Roll slowly over tight areas, pausing on tender spots for 20-30 seconds. Breathe deeply.",
          },
        ],
        warmup: "Not needed - the light walking serves as warm-up.",
        cooldown: "5 minutes of deep breathing and gentle stretching.",
        totalDuration: "30 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Wednesday",
        focus: "Upper Body & Core HIIT",
        exercises: [
          {
            name: "Warm-up Circuit",
            duration: "5 minutes",
            description: "Dynamic movements to prepare upper body and core for intense exercise.",
            technique:
              "Perform each movement for 30 seconds: arm circles, torso twists, shoulder taps, modified push-ups, plank holds.",
          },
          {
            name: "Push-Pull Interval",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute between sets",
            description:
              "20 seconds modified push-ups, 10 seconds rest, 20 seconds bent-over rows (with or without weights), 10 seconds rest.",
            technique:
              "For push-ups, modify on knees if needed. For rows, hinge at hips with flat back, pull elbows back.",
          },
          {
            name: "Core Crusher Interval",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute between sets",
            description: "20 seconds modified plank, 10 seconds rest, 20 seconds bicycle crunches, 10 seconds rest.",
            technique:
              "In plank, keep shoulders over wrists, body in straight line. For bicycles, focus on rotation quality over speed.",
          },
          {
            name: "Shoulder Blaster Interval",
            sets: 3,
            duration: "3 minutes",
            restBetween: "1 minute between sets",
            description:
              "20 seconds arm raises (front), 10 seconds rest, 20 seconds arm raises (lateral), 10 seconds rest.",
            technique:
              "Use light weights or no weights. Keep shoulders down away from ears. Maintain controlled movement.",
          },
        ],
        warmup: "5 minutes of light cardio and dynamic stretching focusing on upper body and core.",
        cooldown: "5 minutes of static stretching for chest, back, shoulders, and core.",
        totalDuration: "30 minutes",
        intensity: "High",
        caloriesBurn: "250-350 calories",
      },
      {
        day: "Thursday",
        focus: "Active Recovery",
        exercises: [
          {
            name: "Light Walking",
            duration: "15 minutes",
            description: "Easy-paced walking to promote blood flow and recovery.",
            technique: "Focus on relaxed, comfortable movement rather than pace or intensity.",
          },
          {
            name: "Mobility Flow",
            duration: "10 minutes",
            description: "Gentle movement through various joint ranges of motion.",
            technique: "Move slowly and deliberately. Focus on quality of movement rather than quantity.",
          },
          {
            name: "Gentle Yoga Poses",
            duration: "10 minutes",
            description: "Basic yoga poses to promote flexibility and relaxation.",
            technique: "Hold each pose for 30-60 seconds. Focus on breath and proper alignment.",
          },
        ],
        warmup: "Not needed - the light walking serves as warm-up.",
        cooldown: "5 minutes of deep breathing and relaxation.",
        totalDuration: "30 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Friday",
        focus: "Full Body HIIT",
        exercises: [
          {
            name: "Warm-up Circuit",
            duration: "5 minutes",
            description: "Dynamic movements to prepare the entire body for intense exercise.",
            technique:
              "Perform each movement for 30 seconds: jogging in place, jumping jacks, bodyweight squats, arm circles, high knees.",
          },
          {
            name: "Tabata Round 1: Lower Body",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute after completion",
            description: "20 seconds squat jumps (or squat to calf raise), 10 seconds rest. Repeat 8 times.",
            technique: "Land softly with bent knees. Modify by removing jump component if needed.",
          },
          {
            name: "Tabata Round 2: Upper Body",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute after completion",
            description: "20 seconds push-ups (modified as needed), 10 seconds rest. Repeat 8 times.",
            technique: "Maintain straight line from head to heels. Modify on knees or against wall if needed.",
          },
          {
            name: "Tabata Round 3: Core",
            sets: 4,
            duration: "4 minutes",
            restBetween: "1 minute after completion",
            description: "20 seconds mountain climbers (modified as needed), 10 seconds rest. Repeat 8 times.",
            technique: "Keep hips level, core engaged. Modify by slowing pace or stepping instead of running feet.",
          },
        ],
        warmup: "5 minutes of light cardio and dynamic full-body stretching.",
        cooldown: "5 minutes of static stretching for all major muscle groups.",
        totalDuration: "30 minutes",
        intensity: "High",
        caloriesBurn: "300-400 calories",
      },
      {
        day: "Saturday",
        focus: "Cardio HIIT",
        exercises: [
          {
            name: "Warm-up Circuit",
            duration: "5 minutes",
            description: "Dynamic movements to prepare cardiovascular system for intense exercise.",
            technique:
              "Perform each movement for 30 seconds: marching in place, arm swings, side steps, knee lifts, heel taps.",
          },
          {
            name: "Cardio Blast Circuit",
            sets: 3,
            duration: "12 minutes",
            restBetween: "1 minute between sets",
            description:
              "30 seconds jumping jacks, 15 seconds rest, 30 seconds high knees, 15 seconds rest, 30 seconds butt kicks, 15 seconds rest, 30 seconds lateral shuffles, 15 seconds rest.",
            technique:
              "Modify all movements as needed - e.g., step jacks instead of jumps, marching instead of high knees.",
          },
          {
            name: "Pyramid Interval",
            duration: "8 minutes",
            description:
              "Increasing/decreasing work intervals: 10s work/50s rest, 20s/40s, 30s/30s, 40s/20s, 50s/10s, then back down.",
            technique:
              "Choose one cardio movement (e.g., squat to stand, step touches, or marching) and maintain throughout pyramid.",
          },
        ],
        warmup: "5 minutes of light cardio and dynamic stretching.",
        cooldown: "5 minutes of static stretching and deep breathing.",
        totalDuration: "30 minutes",
        intensity: "High",
        caloriesBurn: "300-400 calories",
      },
      {
        day: "Sunday",
        focus: "Rest & Recovery",
        exercises: [
          {
            name: "Light Walking (Optional)",
            duration: "15-20 minutes",
            description: "Very light walking if desired, otherwise complete rest day.",
            technique: "Focus on enjoyment and relaxation rather than exercise intensity.",
          },
          {
            name: "Full Body Stretching",
            duration: "15 minutes",
            description: "Comprehensive stretching session targeting all major muscle groups.",
            technique: "Hold each stretch for 30-60 seconds. Focus on breathing deeply and relaxing into each stretch.",
          },
          {
            name: "Week Review & Planning",
            duration: "10 minutes",
            description: "Review your week's workouts, noting strengths and areas for improvement.",
            technique: "Consider keeping an exercise journal to track progress over time. Plan for the coming week.",
          },
        ],
        warmup: "Not applicable for rest day.",
        cooldown: "Not applicable for rest day.",
        totalDuration: "30-45 minutes",
        intensity: "Very Low",
        caloriesBurn: "50-100 calories",
      },
    ],
    tips: [
      "Always monitor blood glucose before, during, and after HIIT sessions",
      "Start with shorter intervals and longer rest periods, gradually progressing as fitness improves",
      "Modify exercises to match your fitness level - there's always an alternative",
      "Stay well hydrated before, during, and after workouts",
      "Consider working out with a partner for safety and motivation",
      "If you feel dizzy, lightheaded, or experience unusual symptoms, stop immediately",
      "Aim for 2-3 HIIT sessions per week with recovery days in between",
      "Focus on proper form rather than speed, especially when starting out",
    ],
    warnings: [
      "HIIT is not appropriate for everyone with diabetes - consult your healthcare provider before starting",
      "This program is designed for those with well-controlled diabetes without complications",
      "If you have cardiovascular disease, retinopathy, or neuropathy, HIIT may not be suitable",
      "Monitor blood glucose closely as HIIT can cause significant drops during and after exercise",
      "Have fast-acting carbohydrates readily available during all workouts",
      "Consider reducing insulin doses before HIIT sessions (consult your healthcare provider)",
      "Stop immediately if you experience chest pain, severe shortness of breath, or dizziness",
    ],
  },
  {
    id: "swimming",
    title: "Swimming Routine",
    description:
      "A comprehensive swimming program designed for people with diabetes to improve cardiovascular fitness, build muscle strength, and enhance insulin sensitivity with minimal impact on joints.",
    level: "Intermediate",
    category: "Cardio",
    image: "/images/swimming.png",
    goals: [
      "Improve cardiovascular health without joint stress",
      "Enhance insulin sensitivity through full-body exercise",
      "Build muscle strength and endurance",
      "Promote better circulation to extremities",
      "Improve lung capacity and breathing efficiency",
      "Support weight management goals",
      "Reduce stress through rhythmic movement",
    ],
    equipment: [
      "Swimsuit",
      "Goggles",
      "Swim cap (optional)",
      "Kickboard",
      "Pull buoy",
      "Swim fins (optional)",
      "Water bottle",
      "Glucose monitor",
      "Waterproof bag for diabetes supplies",
      "Fast-acting carbohydrate source in waterproof container",
    ],
    schedule: [
      {
        day: "Monday",
        focus: "Technique & Endurance",
        exercises: [
          {
            name: "Pool Familiarization",
            duration: "5 minutes",
            description: "Easy swimming or walking in shallow end to adjust to water temperature and environment.",
            technique: "Focus on comfortable breathing and relaxation in water. No performance pressure.",
          },
          {
            name: "Freestyle Technique Drills",
            duration: "15 minutes",
            description: "Practice freestyle technique with focus on body position, arm stroke, and breathing.",
            technique: "Include drills like catch-up, finger-drag, and one-arm freestyle. Use kickboard as needed.",
          },
          {
            name: "Endurance Swim",
            duration: "15 minutes",
            description:
              "Continuous swimming at moderate pace, alternating 2 laps freestyle with 1 lap backstroke for recovery.",
            technique: "Focus on maintaining consistent form throughout. Take brief rests at wall if needed.",
          },
          {
            name: "Kickboard Set",
            duration: "10 minutes",
            description: "Kick-only laps using kickboard to strengthen legs and improve kick technique.",
            technique:
              "Keep legs relatively straight with small, fast kicks from hips. Maintain streamlined body position.",
          },
        ],
        warmup: "5 minutes of water walking/jogging and arm circles in shallow end.",
        cooldown: "5 minutes of easy swimming followed by stretching at pool edge.",
        totalDuration: "55 minutes",
        intensity: "Moderate",
        caloriesBurn: "300-400 calories",
      },
      {
        day: "Tuesday",
        focus: "Active Recovery",
        exercises: [
          {
            name: "Water Walking/Jogging",
            duration: "20 minutes",
            description: "Walking or jogging in shallow to chest-deep water at varying speeds.",
            technique:
              "Maintain good posture. Use full range of motion with arms and legs. Try different patterns - forward, backward, sideways.",
          },
          {
            name: "Water Yoga Flow",
            duration: "15 minutes",
            description: "Gentle yoga poses adapted for water to improve flexibility and balance.",
            technique: "Use pool wall or edge for stability if needed. Move slowly and focus on breath coordination.",
          },
          {
            name: "Gentle Stretching in Water",
            duration: "10 minutes",
            description: "Using water's support to achieve deeper stretches for major muscle groups.",
            technique:
              "Hold each stretch for 20-30 seconds. Use pool wall for stability. Let water assist in deepening stretches.",
          },
        ],
        warmup: "5 minutes of easy water movement to warm muscles.",
        cooldown: "5 minutes of floating and deep breathing.",
        totalDuration: "50 minutes",
        intensity: "Low",
        caloriesBurn: "200-250 calories",
      },
      {
        day: "Wednesday",
        focus: "Interval Training",
        exercises: [
          {
            name: "Mixed Stroke Warm-up",
            duration: "10 minutes",
            description: "Easy swimming using different strokes to prepare all muscle groups.",
            technique:
              "Rotate through freestyle, backstroke, and breaststroke (or any strokes you're comfortable with).",
          },
          {
            name: "Pyramid Intervals",
            duration: "20 minutes",
            description:
              "Swimming intervals that increase then decrease in distance: 1 lap, 2 laps, 3 laps, 2 laps, 1 lap with rest between each set.",
            technique:
              "Swim at about 70-80% effort. Rest 30-60 seconds between intervals or until breathing normalizes.",
          },
          {
            name: "Pull Buoy Set",
            duration: "10 minutes",
            description: "Swimming using pull buoy between legs to focus on upper body strength.",
            technique:
              "Place pull buoy between upper thighs. Focus on good arm technique and rotation. Legs should float naturally.",
          },
          {
            name: "Kick Sprint Intervals",
            duration: "10 minutes",
            description: "Short, faster kicks with kickboard alternated with recovery periods.",
            technique: "20 seconds fast kick, 40 seconds moderate kick. Repeat 10 times.",
          },
        ],
        warmup: "5 minutes of easy swimming and water exercises.",
        cooldown: "5 minutes of gentle backstroke and floating.",
        totalDuration: "60 minutes",
        intensity: "Moderate to High",
        caloriesBurn: "400-500 calories",
      },
      {
        day: "Thursday",
        focus: "Technique & Strength",
        exercises: [
          {
            name: "Drill-Focused Warm-up",
            duration: "10 minutes",
            description: "Technical drills to reinforce proper swimming mechanics.",
            technique: "Include side-swimming, fist swimming, and catch-up drill. Focus on one element at a time.",
          },
          {
            name: "Stroke Rotation Set",
            duration: "15 minutes",
            description:
              "Alternating different strokes to work various muscle groups: freestyle, backstroke, breaststroke.",
            technique: "Swim 2 laps of each stroke, focusing on proper technique rather than speed.",
          },
          {
            name: "Water Resistance Exercises",
            duration: "15 minutes",
            description: "Strength exercises using water resistance: arm pushes/pulls, leg lifts, trunk rotations.",
            technique:
              "Stand in chest-deep water. Move limbs against water resistance. Perform 15-20 reps of each exercise.",
          },
          {
            name: "Vertical Kicking",
            duration: "5 minutes",
            description: "Treading water using only legs in deep end to build leg strength and endurance.",
            technique: "Keep upper body relatively still. Use flutter kick or egg-beater kick. Take breaks as needed.",
          },
        ],
        warmup: "5 minutes of water walking/jogging and arm movements.",
        cooldown: "5 minutes of gentle swimming and stretching.",
        totalDuration: "55 minutes",
        intensity: "Moderate",
        caloriesBurn: "350-450 calories",
      },
      {
        day: "Friday",
        focus: "Endurance Building",
        exercises: [
          {
            name: "Progressive Distance Swim",
            duration: "30 minutes",
            description: "Continuous swimming with goal of covering more distance than previous sessions.",
            technique:
              "Pace yourself to maintain consistent form throughout. Alternate strokes as needed for recovery.",
          },
          {
            name: "Medley Swimming",
            duration: "15 minutes",
            description:
              "Swimming all four competitive strokes in sequence: butterfly (or freestyle), backstroke, breaststroke, freestyle.",
            technique: "Modify butterfly to freestyle if needed. Focus on smooth transitions between strokes.",
          },
          {
            name: "Kick-Pull-Swim Set",
            duration: "10 minutes",
            description: "Alternating between kickboard laps, pull buoy laps, and full swimming laps.",
            technique: "1 lap kick, 1 lap pull, 1 lap swim. Repeat sequence 3-4 times.",
          },
        ],
        warmup: "5 minutes of easy swimming mixing strokes.",
        cooldown: "5 minutes of backstroke and water floating.",
        totalDuration: "60 minutes",
        intensity: "Moderate to High",
        caloriesBurn: "400-500 calories",
      },
      {
        day: "Saturday",
        focus: "Fun & Skill Development",
        exercises: [
          {
            name: "Choice Stroke Warm-up",
            duration: "10 minutes",
            description: "Swimming using preferred strokes at comfortable pace.",
            technique: "Focus on enjoyment and finding your rhythm in the water.",
          },
          {
            name: "Skill Stations",
            duration: "25 minutes",
            description:
              "Rotating through different skill-building activities: treading water, floating, underwater swimming, flip turns.",
            technique: "Spend 5 minutes at each station. Focus on technique refinement and comfort in water.",
          },
          {
            name: "Relay-Style Swims",
            duration: "15 minutes",
            description:
              "Self-challenge with varied swim patterns: fast lap followed by recovery lap, building speed within lap, etc.",
            technique: "Create your own 'relay' challenges. Focus on changing speeds and maintaining form.",
          },
          {
            name: "Water Play/Exploration",
            duration: "5 minutes",
            description: "Unstructured time to enjoy water movement and practice favorite skills.",
            technique:
              "No specific technique focus - just enjoy moving in the water and practicing what you've learned.",
          },
        ],
        warmup: "5 minutes of easy swimming and water movements.",
        cooldown: "5 minutes of gentle swimming and stretching.",
        totalDuration: "60 minutes",
        intensity: "Moderate",
        caloriesBurn: "350-450 calories",
      },
      {
        day: "Sunday",
        focus: "Active Recovery & Reflection",
        exercises: [
          {
            name: "Gentle Swimming",
            duration: "15 minutes",
            description: "Easy, relaxed swimming using comfortable strokes.",
            technique: "Focus on smooth, efficient movement rather than speed or distance.",
          },
          {
            name: "Water Walking Meditation",
            duration: "10 minutes",
            description: "Mindful walking in shallow water focusing on sensation and movement.",
            technique:
              "Pay attention to how water feels against skin, resistance with each step, and breathing rhythm.",
          },
          {
            name: "Floating Practice",
            duration: "10 minutes",
            description: "Back floating and relaxation in water to promote recovery.",
            technique: "Focus on relaxing completely, allowing water to support body. Practice controlled breathing.",
          },
          {
            name: "Weekly Progress Review",
            duration: "10 minutes",
            description: "Mental review of week's accomplishments and areas for improvement.",
            technique: "Consider keeping a swimming journal to track progress, feelings, and blood glucose responses.",
          },
        ],
        warmup: "5 minutes of gentle water movement.",
        cooldown: "5 minutes of stretching at pool edge.",
        totalDuration: "50 minutes",
        intensity: "Low",
        caloriesBurn: "200-250 calories",
      },
    ],
    tips: [
      "Check blood glucose before swimming and have a small snack if below 100 mg/dL",
      "Recheck glucose every 30 minutes during longer sessions",
      "Hydrate before, during, and after swimming even though you may not feel thirsty",
      "Consider reducing insulin doses before swimming sessions (consult your healthcare provider)",
      "Wear medical ID while swimming that indicates you have diabetes",
      "Start with shorter sessions and gradually increase duration as fitness improves",
      "Learn proper breathing techniques to make swimming more enjoyable and efficient",
      "Consider taking lessons if you're new to swimming or want to improve technique",
    ],
    warnings: [
      "Never swim alone - always swim in supervised areas with lifeguards",
      "Exit the pool immediately if you feel symptoms of hypoglycemia",
      "Be aware that swimming can lower blood glucose for up to 24 hours afterward",
      "If you have open wounds or foot ulcers, check with your doctor before swimming",
      "For those with neuropathy, check pool deck and feet carefully to avoid injuries",
      "If you have retinopathy, avoid diving and jumping into water",
      "Dry between toes thoroughly after swimming to prevent fungal infections",
    ],
  },
  {
    id: "pilates",
    title: "Pilates for Core Strength",
    description:
      "A specialized Pilates program designed for people with diabetes to strengthen core muscles, improve posture, enhance body awareness, and promote better blood circulation with controlled, mindful movements.",
    level: "Intermediate",
    category: "Flexibility",
    image: "/images/pilates.png",
    goals: [
      "Strengthen core muscles to improve posture and reduce back pain",
      "Enhance body awareness and mind-body connection",
      "Improve flexibility and joint mobility",
      "Promote better circulation to enhance insulin delivery",
      "Develop balanced muscle strength without bulking",
      "Improve breathing efficiency and stress management",
      "Support better balance and stability",
    ],
    equipment: [
      "Exercise mat",
      "Small pillow or cushion",
      "Resistance band (light to medium)",
      "Small exercise ball (optional)",
      "Water bottle",
      "Glucose monitor",
      "Comfortable clothing that allows movement",
    ],
    schedule: [
      {
        day: "Monday",
        focus: "Foundation & Breathing",
        exercises: [
          {
            name: "Pilates Breathing Practice",
            duration: "5 minutes",
            description: "Focused practice of lateral thoracic breathing used in Pilates.",
            technique:
              "Lie on back with knees bent. Place hands on ribcage. Inhale to expand ribs laterally, exhale to draw navel to spine.",
          },
          {
            name: "Pelvic Tilts & Imprinting",
            duration: "5 minutes",
            description: "Subtle movements of pelvis to find neutral spine position and develop awareness.",
            technique:
              "Lie on back with knees bent. Practice tilting pelvis posteriorly and anteriorly, then find neutral position.",
          },
          {
            name: "Basic Abdominal Engagement",
            duration: "10 minutes",
            description: "Fundamental exercises to activate deep core muscles.",
            technique:
              "Include toe taps, heel slides, and modified hundred prep. Focus on maintaining stable pelvis during limb movement.",
          },
          {
            name: "Spine Articulation",
            duration: "10 minutes",
            description: "Gentle rolling through spine to improve mobility and awareness.",
            technique:
              "Practice supported bridge rolls and gentle curl-ups. Move slowly with breath, articulating one vertebra at a time.",
          },
          {
            name: "Basic Stretches",
            duration: "5 minutes",
            description: "Gentle stretches for areas that tend to be tight.",
            technique:
              "Include knee-to-chest, gentle spinal twist, and cat-cow. Hold static stretches for 20-30 seconds.",
          },
        ],
        warmup: "5 minutes of gentle joint mobility exercises and breathing awareness.",
        cooldown: "5 minutes of relaxation breathing and gentle stretching.",
        totalDuration: "45 minutes",
        intensity: "Low to Moderate",
        caloriesBurn: "150-200 calories",
      },
      {
        day: "Tuesday",
        focus: "Active Recovery",
        exercises: [
          {
            name: "Gentle Walking",
            duration: "15 minutes",
            description: "Easy-paced walking focusing on posture and alignment.",
            technique:
              "Apply Pilates principles to walking: engage core, maintain length in spine, and breathe laterally.",
          },
          {
            name: "Standing Posture Work",
            duration: "10 minutes",
            description: "Exercises to improve awareness of alignment in standing position.",
            technique:
              "Practice finding neutral spine, proper weight distribution through feet, and shoulder alignment.",
          },
          {
            name: "Gentle Stretching Sequence",
            duration: "10 minutes",
            description: "Full-body stretching with focus on breathing and release.",
            technique:
              "Hold each stretch for 30 seconds. Breathe deeply, lengthening on inhale and releasing tension on exhale.",
          },
        ],
        warmup: "5 minutes of joint mobility exercises.",
        cooldown: "5 minutes of relaxation breathing.",
        totalDuration: "40 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
      {
        day: "Wednesday",
        focus: "Core Strength & Stability",
        exercises: [
          {
            name: "The Hundred",
            sets: 1,
            duration: "100 beats (approximately 2 minutes)",
            description: "Classic Pilates exercise pumping arms while holding core in a challenging position.",
            technique:
              "Modify by keeping head down or knees bent. Maintain imprinted spine. Coordinate breath with arm pumps.",
          },
          {
            name: "Roll-Up Progression",
            sets: 3,
            reps: 5,
            description: "Controlled rolling up and down through spine from lying to seated position.",
            technique:
              "Begin with modified version if needed. Use arms as counterbalance. Focus on articulating through each vertebra.",
          },
          {
            name: "Single Leg Circles",
            sets: 2,
            reps: 5,
            restBetween: "30 seconds between sides",
            description: "Lying on back, circling one leg while maintaining stable pelvis.",
            technique:
              "Keep circles small initially. Focus on stability rather than range. Maintain neutral pelvis throughout.",
          },
          {
            name: "Spine Twist",
            sets: 2,
            reps: 8,
            description: "Seated rotation of spine while maintaining length and stability.",
            technique:
              "Sit tall with legs extended or crossed. Rotate from waist while keeping hips stable and spine long.",
          },
          {
            name: "Side Leg Lifts Series",
            sets: 1,
            reps: 10,
            restBetween: "30 seconds between sides",
            description: "Lying on side, lifting and lowering leg in different directions.",
            technique:
              "Maintain alignment of shoulders, hips, and ankles. Engage core to stabilize. Keep movements controlled.",
          },
        ],
        warmup: "5 minutes of Pilates breathing and gentle joint mobility.",
        cooldown: "5 minutes of stretching and relaxation.",
        totalDuration: "45 minutes",
        intensity: "Moderate",
        caloriesBurn: "180-230 calories",
      },
      {
        day: "Thursday",
        focus: "Flexibility & Mobility",
        exercises: [
          {
            name: "Cat-Cow Flow",
            duration: "5 minutes",
            description: "Flowing between spinal flexion and extension on hands and knees.",
            technique:
              "Coordinate movement with breath. Move slowly and deliberately. Focus on articulating through entire spine.",
          },
          {
            name: "Thread the Needle",
            sets: 2,
            duration: "1 minute each side",
            description: "Rotational stretch for upper back and shoulders from quadruped position.",
            technique:
              "Start on hands and knees. Thread one arm under body, rotating spine. Keep hips level throughout.",
          },
          {
            name: "Mermaid Stretch",
            sets: 2,
            duration: "1 minute each side",
            description: "Side-bending stretch in seated position to lengthen lateral trunk.",
            technique:
              "Sit with legs folded to one side. Extend opposite arm overhead and side bend. Create length before bending.",
          },
          {
            name: "Spine Stretch Forward",
            sets: 3,
            reps: 5,
            description: "Seated forward bend with focus on articulating through spine.",
            technique:
              "Sit tall with legs extended. Nod chin and roll forward one vertebra at a time. Return to upright with control.",
          },
          {
            name: "Hip Opener Series",
            duration: "10 minutes",
            description: "Sequence of stretches targeting hip mobility in multiple planes.",
            technique: "Include figure-4 stretch, lunges, and gentle frog pose. Hold each position for 30-60 seconds.",
          },
        ],
        warmup: "5 minutes of joint mobility and gentle movement.",
        cooldown: "5 minutes of relaxation breathing.",
        totalDuration: "40 minutes",
        intensity: "Low to Moderate",
        caloriesBurn: "150-200 calories",
      },
      {
        day: "Friday",
        focus: "Functional Strength",
        exercises: [
          {
            name: "Standing Pilates Series",
            duration: "10 minutes",
            description: "Core-focused exercises performed in standing position.",
            technique:
              "Include standing roll-down, standing leg lifts, and arm circles. Focus on stability and control.",
          },
          {
            name: "Quadruped Series",
            duration: "10 minutes",
            description: "Core stabilization exercises on hands and knees.",
            technique:
              "Include bird-dog, knee hovering, and arm reaches. Maintain neutral spine and stable pelvis throughout.",
          },
          {
            name: "Modified Plank Series",
            duration: "8 minutes",
            description: "Various plank positions modified as needed for core strength.",
            technique:
              "Include forearm plank, side plank variations, and plank with leg lifts. Modify by using knees or wall.",
          },
          {
            name: "Bridging Variations",
            sets: 2,
            reps: 10,
            description: "Progressive bridge exercises for posterior chain strength.",
            technique:
              "Start with basic bridge, progress to single leg or marching. Focus on even weight distribution and neutral pelvis.",
          },
          {
            name: "Resistance Band Arm Work",
            duration: "7 minutes",
            description: "Upper body strengthening using light resistance band.",
            technique:
              "Include bicep curls, tricep extensions, and rows. Focus on scapular stability and proper alignment.",
          },
        ],
        warmup: "5 minutes of Pilates breathing and gentle movement.",
        cooldown: "5 minutes of stretching and relaxation.",
        totalDuration: "50 minutes",
        intensity: "Moderate",
        caloriesBurn: "200-250 calories",
      },
      {
        day: "Saturday",
        focus: "Flow & Integration",
        exercises: [
          {
            name: "Pilates Flow Sequence",
            duration: "25 minutes",
            description: "Flowing series of exercises linking movement with breath.",
            technique:
              "Connect exercises like roll-up, single leg stretch, spine twist with minimal transitions. Focus on flow and control.",
          },
          {
            name: "Balance Challenge Series",
            duration: "10 minutes",
            description: "Exercises to challenge balance and stability.",
            technique:
              "Include standing leg lifts, modified star, and single leg balance with arm movements. Use wall for support if needed.",
          },
          {
            name: "Rolling Exercises",
            duration: "5 minutes",
            description: "Controlled rolling movements to massage spine and challenge core.",
            technique:
              "Include rolling like a ball and open leg rocker modifications. Keep movements smooth and controlled.",
          },
          {
            name: "Pilates Push-up Preparation",
            sets: 2,
            reps: 5,
            description: "Modified push-ups with Pilates principles of alignment and control.",
            technique:
              "Can be done against wall, on knees, or full form. Focus on scapular movement and core engagement.",
          },
        ],
        warmup: "5 minutes of joint mobility and activation exercises.",
        cooldown: "5 minutes of stretching and relaxation.",
        totalDuration: "50 minutes",
        intensity: "Moderate",
        caloriesBurn: "200-250 calories",
      },
      {
        day: "Sunday",
        focus: "Gentle Practice & Mindfulness",
        exercises: [
          {
            name: "Breathing Review",
            duration: "5 minutes",
            description: "Focused practice of Pilates breathing patterns.",
            technique:
              "Practice in different positions: lying, sitting, standing. Focus on expanding ribcage laterally and posterior.",
          },
          {
            name: "Gentle Mobility Flow",
            duration: "15 minutes",
            description: "Flowing sequence of gentle movements to maintain mobility.",
            technique:
              "Include gentle spinal articulation, hip circles, and shoulder rolls. Move slowly with breath awareness.",
          },
          {
            name: "Restorative Positions",
            duration: "15 minutes",
            description: "Supported, comfortable positions to promote relaxation and release.",
            technique:
              "Hold each position for 3-5 minutes. Use pillows or blankets for support. Focus on deep breathing and letting go.",
          },
          {
            name: "Body Scan Meditation",
            duration: "10 minutes",
            description: "Guided awareness through each part of body to release tension.",
            technique:
              "Lie comfortably. Systematically bring attention to each body part, noticing sensations without judgment.",
          },
        ],
        warmup: "5 minutes of gentle movement to prepare body.",
        cooldown: "Not needed - the practice ends with relaxation.",
        totalDuration: "45 minutes",
        intensity: "Low",
        caloriesBurn: "100-150 calories",
      },
    ],
    tips: [
      "Focus on quality of movement rather than quantity or speed",
      "Check blood glucose before and after sessions to understand your body's response",
      "Modify exercises as needed - there's always an alternative that will work for your body",
      "Breathe continuously during exercises - never hold your breath",
      "Progress gradually as your body adapts to the movements",
      "Practice Pilates principles (centering, control, precision, etc.) in daily activities",
      "Stay well hydrated before, during, and after practice",
      "Consider working with a certified Pilates instructor initially to learn proper technique",
    ],
    warnings: [
      "Consult your healthcare provider before beginning this program",
      "If you have retinopathy, avoid positions where head is below heart",
      "For those with neuropathy, be extra mindful of positioning and alignment",
      "If you have uncontrolled high blood pressure, avoid exercises with head below heart",
      "Modify or skip any exercise that causes pain or discomfort",
      "Have fast-acting carbohydrates available in case of hypoglycemia",
      "If you experience dizziness or unusual symptoms, stop and rest",
    ],
  },
]
