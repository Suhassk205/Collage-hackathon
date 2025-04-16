"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ModelStatusProps {
  apiEndpoint?: string
}

export default function ModelStatus({ apiEndpoint = "https://your-colab-endpoint.com/status" }: ModelStatusProps) {
  const [status, setStatus] = useState<"online" | "offline" | "checking">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkStatus = async () => {
    setStatus("checking")
    try {
      // In a real implementation, this would make an actual API call
      // const response = await fetch(apiEndpoint);
      // if (response.ok) {
      //   setStatus("online");
      // } else {
      //   setStatus("offline");
      // }

      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus("online")
      setLastChecked(new Date())
    } catch (error) {
      console.error("Error checking model status:", error)
      setStatus("offline")
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkStatus()

    // Check status every 5 minutes
    const interval = setInterval(checkStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Badge
                variant="outline"
                className={`
                  ${
                    status === "online"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : status === "offline"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }
                `}
              >
                {status === "online" ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" /> Model Online
                  </>
                ) : status === "offline" ? (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" /> Model Offline
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Checking...
                  </>
                )}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1"
                onClick={checkStatus}
                disabled={status === "checking"}
              >
                <RefreshCw className="h-3 w-3" />
                <span className="sr-only">Refresh status</span>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Google Colab Model Status</p>
            {lastChecked && <p className="text-xs text-gray-500">Last checked: {lastChecked.toLocaleTimeString()}</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
