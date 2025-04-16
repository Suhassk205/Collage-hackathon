"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Utensils, MessageSquare, Search, ArrowRight, User, Bot, Send, Filter } from "lucide-react"
import { getDietRecommendations } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function DietPage() {
  const [activeTab, setActiveTab] = useState("chat")
  const [query, setQuery] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your diet assistant. Ask me any questions about diet recommendations for managing diabetes or maintaining a healthy lifestyle.",
    },
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      const response = await getDietRecommendations(userMessage.content)

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting diet recommendations:", error)

      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const dietPlans = [
    {
      id: "low-carb",
      title: "Low Carb Diet Plan",
      description: "A diet plan focused on reducing carbohydrate intake to help manage blood sugar levels.",
      image: "/images/low-carb.png",
      tags: ["Low Carb", "Diabetes-Friendly", "Weight Loss"],
      featured: true,
    },
    {
      id: "mediterranean",
      title: "Mediterranean Diet",
      description: "A heart-healthy eating plan that emphasizes fruits, vegetables, whole grains, and lean proteins.",
      image: "/images/mediterranean.png",
      tags: ["Heart-Healthy", "Anti-Inflammatory", "Balanced"],
      featured: true,
    },
    {
      id: "dash",
      title: "DASH Diet",
      description: "Dietary Approaches to Stop Hypertension - a plan designed to help lower blood pressure.",
      image: "/images/dash.png",
      tags: ["Blood Pressure", "Heart-Healthy", "Low Sodium"],
      featured: false,
    },
    {
      id: "plant-based",
      title: "Plant-Based Diet",
      description: "A diet centered around plant foods, with limited or no animal products.",
      image: "/images/plant-based.png",
      tags: ["Vegan", "Vegetarian", "High-Fiber"],
      featured: true,
    },
    {
      id: "keto",
      title: "Ketogenic Diet",
      description: "A very low-carb, high-fat diet that puts your body into a metabolic state called ketosis.",
      image: "/images/low-carb.png",
      tags: ["Very Low Carb", "High Fat", "Weight Loss"],
      featured: false,
    },
    {
      id: "paleo",
      title: "Paleo Diet",
      description: "A diet based on foods similar to what might have been eaten during the Paleolithic era.",
      image: "/images/mediterranean.png",
      tags: ["Whole Foods", "Grain-Free", "Sugar-Free"],
      featured: false,
    },
  ]

  const availableFilters = ["Low Carb", "Heart-Healthy", "Diabetes-Friendly", "Weight Loss", "Vegetarian", "High-Fiber"]

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const filteredDietPlans = dietPlans.filter((plan) => {
    // Filter by search query
    if (
      searchQuery &&
      !plan.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !plan.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by selected tags
    if (selectedFilters.length > 0 && !plan.tags.some((tag) => selectedFilters.includes(tag))) {
      return false
    }

    return true
  })

  return (
    <div className="relative overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 dark:from-teal-950 dark:via-blue-950 dark:to-indigo-950"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium text-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
              Nutrition Guidance
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-500 dark:from-teal-400 dark:to-blue-300">
              Diet Recommendations
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Get personalized diet advice and explore meal plans to help manage diabetes and improve your overall
              health
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-teal-100/50 dark:bg-teal-900/20 rounded-xl">
              <TabsTrigger
                value="chat"
                className="flex items-center rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask AI Assistant
              </TabsTrigger>
              <TabsTrigger
                value="plans"
                className="flex items-center rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm"
              >
                <Utensils className="mr-2 h-4 w-4" />
                Diet Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500"></div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl flex items-center">
                    <MessageSquare className="mr-2 h-6 w-6 text-teal-600 dark:text-teal-400" />
                    Diet Assistant
                  </CardTitle>
                  <CardDescription className="text-base">
                    Ask questions about diet recommendations for diabetes management
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
                              <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                                <Bot className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                              </div>
                            )}
                            <div
                              className={`rounded-xl p-4 ${
                                message.role === "user"
                                  ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white"
                                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
                              }`}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === "user" && (
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                                <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
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
                          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div className="rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                            <div className="flex space-x-2">
                              <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce"></div>
                              <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce animation-delay-200"></div>
                              <div className="h-2 w-2 bg-teal-500 rounded-full animate-bounce animation-delay-400"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                    <Input
                      placeholder="Ask about diet recommendations..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300"
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
                    "What foods should I avoid with diabetes?",
                    "Can you suggest a low-carb meal plan?",
                    "How can I reduce sugar cravings?",
                    "What fruits are safe for diabetics?",
                  ].map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto py-3 px-4 text-left bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300"
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

            <TabsContent value="plans">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                      placeholder="Search diet plans..."
                      className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full md:w-auto flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      onClick={() => document.getElementById("filter-dropdown")?.classList.toggle("hidden")}
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                      {selectedFilters.length > 0 && (
                        <Badge className="ml-1 bg-teal-500">{selectedFilters.length}</Badge>
                      )}
                    </Button>
                    <div
                      id="filter-dropdown"
                      className="hidden absolute right-0 mt-2 w-64 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10 border border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-medium mb-3">Diet Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {availableFilters.map((filter) => (
                          <Badge
                            key={filter}
                            variant={selectedFilters.includes(filter) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              selectedFilters.includes(filter)
                                ? "bg-teal-500 hover:bg-teal-600"
                                : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                            }`}
                            onClick={() => toggleFilter(filter)}
                          >
                            {filter}
                          </Badge>
                        ))}
                      </div>
                      {selectedFilters.length > 0 && (
                        <Button
                          variant="link"
                          className="text-sm p-0 h-auto mt-3 text-teal-600 dark:text-teal-400"
                          onClick={() => setSelectedFilters([])}
                        >
                          Clear all
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {selectedFilters.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    {selectedFilters.map((filter) => (
                      <Badge key={filter} className="bg-teal-500">
                        {filter}
                        <button className="ml-1 hover:text-white/80" onClick={() => toggleFilter(filter)}>
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {filteredDietPlans.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDietPlans.map((plan, index) => (
                      <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full flex flex-col group">
                          <div className="relative">
                            <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center shadow-lg">
                                  <Utensils className="h-10 w-10 text-white" />
                                </div>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/80 dark:from-gray-800/80 to-transparent"></div>
                            </div>
                            {plan.featured && (
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Featured
                              </div>
                            )}
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{plan.title}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2 flex-grow">
                            <div className="flex flex-wrap gap-2">
                              {plan.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Link href={`/diet/${plan.id}`} className="w-full">
                              <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300">
                                View Plan <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                    <Utensils className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No diet plans found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      No diet plans match your current filters. Try adjusting your search criteria.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedFilters([])
                      }}
                      className="border-2 border-gray-200 dark:border-gray-700"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
