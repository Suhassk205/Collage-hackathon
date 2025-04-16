"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Type 2 Diabetes Patient",
    image: "/images/user1.png",
    quote:
      "Sugar Wise has been a game-changer for me. The prediction tool helped me understand my risk factors, and the diet recommendations have made managing my blood sugar levels so much easier. I've lost 15 pounds and my A1C is down to 6.2!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Pre-diabetic",
    image: "/images/user2.png",
    quote:
      "I was diagnosed as pre-diabetic last year and was feeling lost about what to do. Sugar Wise provided me with clear, actionable advice that helped me make lifestyle changes. Six months later, my blood sugar is back in the normal range!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Type 1 Diabetes Patient",
    image: "/images/user3.png",
    quote:
      "As someone with Type 1 diabetes, I've tried many apps, but Sugar Wise stands out with its personalized exercise plans and AI-powered diet recommendations. It's like having a diabetes educator in my pocket at all times.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Healthcare Professional",
    image: "/images/user4.png",
    quote:
      "I recommend Sugar Wise to my patients because it provides science-based recommendations and makes diabetes management accessible. The prediction tool is remarkably accurate and helps patients understand their risk factors.",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="bg-white dark:bg-gray-800 shadow-xl p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-6 right-6 text-green-500/20 dark:text-green-400/10">
                  <Quote className="h-24 w-24" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="mr-4 rounded-full overflow-hidden border-4 border-green-100 dark:border-green-900/50">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{testimonial.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setIsAnimating(true)
              setActiveIndex(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-green-600 w-8" : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 rounded-full z-10 hidden md:flex"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 rounded-full z-10 hidden md:flex"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
