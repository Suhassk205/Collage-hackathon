"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, Clock, Calendar, ArrowRight, MessageSquare, User, Bot, Send, Search } from "lucide-react"
import { getExerciseRecommendations } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

interface ExercisePlan {
  id: string
  title: string
  description: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  category: string
  image: string
  benefits: string[]
  featured?: boolean
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ExercisePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("plans")
  const [filterLevel, setFilterLevel] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [query, setQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your exercise assistant. Ask me any questions about exercise plans for managing diabetes or maintaining a healthy lifestyle.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) return

    const userMessage: Message = {
      role: "user",
      content: query,
    }

    setMessages((prev) => [...prev, userMessage])
    setQuery("")
    setLoading(true)

    try {
      // Call the API function that connects to ChatGPT
      const response = await getExerciseRecommendations(userMessage.content)

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting exercise recommendations:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const exercisePlans: ExercisePlan[] = [
    {
      id: "walking",
      title: "Daily Walking Plan",
      description: "A simple walking plan to help control blood sugar levels and improve cardiovascular health.",
      duration: "30 minutes",
      level: "Beginner",
      category: "Cardio",
      image: "/images/walking.png",
      benefits: [
        "Improves insulin sensitivity",
        "Reduces blood sugar levels",
        "Low impact on joints",
        "Can be done anywhere",
      ],
      featured: true,
    },
    {
      id: "strength",
      title: "Strength Training Basics",
      description: "Basic strength training exercises to improve insulin sensitivity and build muscle mass.",
      duration: "45 minutes",
      level: "Intermediate",
      category: "Strength",
      image: "/images/strength-training.png",
      benefits: [
        "Builds muscle mass",
        "Improves glucose metabolism",
        "Increases resting metabolic rate",
        "Enhances overall strength",
      ],
    },
    {
      id: "yoga",
      title: "Yoga for Diabetes",
      description: "Gentle yoga poses to reduce stress and improve blood circulation.",
      duration: "40 minutes",
      level: "Beginner",
      category: "Flexibility",
      image: "/images/yoga.png",
      benefits: ["Reduces stress", "Improves flexibility", "Enhances mindfulness", "Gentle on the body"],
      featured: true,
    },
    {
      id: "hiit",
      title: "HIIT Workout",
      description: "High-intensity interval training to boost metabolism and improve glucose control.",
      duration: "25 minutes",
      level: "Advanced",
      category: "Cardio",
      image: "/images/hiit.png",
      benefits: [
        "Maximizes calorie burn",
        "Improves cardiovascular fitness",
        "Efficient use of time",
        "Continues burning calories after workout",
      ],
    },
    {
      id: "swimming",
      title: "Swimming Routine",
      description: "Low-impact swimming exercises that are gentle on joints while providing a full-body workout.",
      duration: "45 minutes",
      level: "Intermediate",
      category: "Cardio",
      image: "/images/swimming.png",
      benefits: ["Full body workout", "Low impact on joints", "Improves cardiovascular health", "Builds endurance"],
    },
    {
      id: "pilates",
      title: "Pilates for Core Strength",
      description: "Core-focused exercises to improve posture, balance, and overall strength.",
      duration: "35 minutes",
      level: "Intermediate",
      category: "Flexibility",
      image: "/images/pilates.png",
      benefits: ["Strengthens core muscles", "Improves posture", "Enhances body awareness", "Increases flexibility"],
    },
  ]

  const filteredPlans = exercisePlans.filter((plan) => {
    // Filter by search query
    if (
      searchQuery &&
      !plan.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !plan.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by level
    if (filterLevel !== "all" && plan.level.toLowerCase() !== filterLevel.toLowerCase()) {
      return false
    }

    // Filter by category
    if (filterCategory !== "all" && plan.category.toLowerCase() !== filterCategory.toLowerCase()) {
      return false
    }

    return true
  })

  return (
    <div className="relative overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Fitness Programs
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              Exercise Plans
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Discover tailored exercise plans to help manage blood sugar levels and improve overall health
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl">
              <TabsTrigger
                value="plans"
                className="flex items-center rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
              >
                <Dumbbell className="mr-2 h-4 w-4" />
                Exercise Plans
              </TabsTrigger>
              <TabsTrigger
                value="chat"
                className="flex items-center rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plans">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search exercise plans..."
                      className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Select value={filterLevel} onValueChange={setFilterLevel}>
                        <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="flexibility">Flexibility</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {filteredPlans.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredPlan(plan.id)}
                        onMouseLeave={() => setHoveredPlan(null)}
                      >
                        <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full flex flex-col group">
                          <div className="relative">
                            <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                                  <Dumbbell className="h-10 w-10 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent"></div>
                            </div>
                            {plan.featured && (
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Featured
                              </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span className="text-sm">{plan.duration}</span>
                                </div>
                                <Badge
                                  className={`
                                  ${
                                    plan.level === "Beginner"
                                      ? "bg-green-500"
                                      : plan.level === "Intermediate"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  } 
                                  text-white border-0`}
                                >
                                  {plan.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{plan.title}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2 flex-grow">
                            <div className="flex items-center mb-3">
                              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">{plan.category}</span>
                            </div>

                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Benefits:</h4>
                              <ul className="space-y-1">
                                {plan.benefits
                                  .slice(0, hoveredPlan === plan.id ? plan.benefits.length : 2)
                                  .map((benefit, i) => (
                                    <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mt-0.5 mr-2">
                                        <span className="text-blue-600 dark:text-blue-400 text-xs">✓</span>
                                      </div>
                                      {benefit}
                                    </li>
                                  ))}
                              </ul>
                              {plan.benefits.length > 2 && hoveredPlan !== plan.id && (
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                  + {plan.benefits.length - 2} more benefits
                                </p>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                              onClick={() => router.push(`/exercise/${plan.id}`)}
                            >
                              View Plan <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                    <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No exercise plans found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      No exercise plans match your current filters. Try adjusting your search criteria.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setFilterLevel("all")
                        setFilterCategory("all")
                        setSearchQuery("")
                      }}
                      className="border-2 border-gray-200 dark:border-gray-700"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
                    Exercise Assistant
                  </CardTitle>
                  <CardDescription className="text-base">
                    Ask questions about exercise plans for diabetes management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 h-[400px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <AnimatePresence initial={false}>
                      {messages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className="flex items-start max-w-[80%] gap-2">
                            {message.role === "assistant" && (
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                            )}
                            <div
                              className={`rounded-xl p-4 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === "user" && (
                              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                                <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start max-w-[80%] gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                              <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                    <Input
                      placeholder="Ask about exercise recommendations..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
                      disabled={loading || !query.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Suggested Questions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "What exercises are best for lowering blood sugar?",
                    "How often should I exercise with diabetes?",
                    "Are there exercises I should avoid?",
                    "Can you suggest a beginner workout routine?",
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4 text-left bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                      onClick={() => {
                        setQuery(question)
                      }}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
