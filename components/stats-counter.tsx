"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface StatsCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function StatsCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
}: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            let startTime: number
            const startValue = 0
            const endValue = value
            const totalDuration = duration * 1000 // convert to ms

            const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4)

            const animateCount = (timestamp: number) => {
              if (!startTime) startTime = timestamp
              const progress = Math.min((timestamp - startTime) / totalDuration, 1)
              const easedProgress = easeOutQuart(progress)

              setCount(Math.floor(startValue + easedProgress * (endValue - startValue)))

              if (progress < 1) {
                requestAnimationFrame(animateCount)
              } else {
                setCount(endValue)
              }
            }

            requestAnimationFrame(animateCount)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [value, duration])

  return (
    <div className="text-center" ref={countRef}>
      <div className={cn("text-4xl md:text-5xl font-bold", className)}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-gray-500 dark:text-gray-400 mt-2 font-medium">{label}</div>
    </div>
  )
}
