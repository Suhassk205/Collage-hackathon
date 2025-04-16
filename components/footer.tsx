import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail, Activity } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg animate-pulse"></div>
                <div className="absolute inset-1 bg-white dark:bg-gray-900 rounded-md flex items-center justify-center">
                  <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300 ml-2">
                Sugar Wise
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              A comprehensive platform for diabetes prediction, diet recommendations, and exercise plans.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Features</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/predict"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Diabetes Prediction
                </Link>
              </li>
              <li>
                <Link
                  href="/diet"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Diet Recommendations
                </Link>
              </li>
              <li>
                <Link
                  href="/exercise"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Exercise Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Health Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Subscribe</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Stay updated with the latest health tips and features.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              />
              <Button className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Sugar Wise. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
