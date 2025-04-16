"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Diabetes Prediction", href: "/predict" },
  { name: "Diet Recommendations", href: "/diet" },
  { name: "Exercise Plans", href: "/exercise" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-white dark:bg-gray-900",
      )}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center">
            <div className="h-10 w-10 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg animate-pulse"></div>
              <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-md flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 ml-2">
              Sugar Wise
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button variant="ghost" onClick={() => setMobileMenuOpen(true)} className="text-gray-700 dark:text-gray-300">
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-semibold leading-6 transition-colors relative group",
                pathname === item.href
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        <motion.div
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center">
              <div className="h-8 w-8 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg animate-pulse"></div>
                <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-md flex items-center justify-center">
                  <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 ml-2">
                Sugar Wise
              </span>
            </Link>
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300"
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors",
                      pathname === item.href
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Switch Theme</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-700" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </div>
                <Button className="w-full bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
