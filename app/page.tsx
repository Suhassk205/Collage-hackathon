import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Activity, Utensils, Dumbbell, CheckCircle } from "lucide-react"
import StatsCounter from "@/components/stats-counter"
import TestimonialCarousel from "@/components/testimonial-carousel"

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Gradient Background */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 dark:from-green-950 dark:via-teal-950 dark:to-blue-950"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm">
                <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                Diabetes Management Made Simple
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300">
                Take Control of Your Health with Sugar Wise
              </h1>
              <p className="text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive platform helps you predict diabetes risk, get personalized diet recommendations, and
                follow tailored exercise plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/predict">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300"
                  >
                    Check Your Risk <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/diet">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-green-500/20 hover:border-green-500/40 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
                  >
                    Explore Diet Plans
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative lg:order-last">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 opacity-30 blur-xl"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 h-64 md:h-80">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-400/30 dark:bg-green-400/10 rounded-full animate-blob"></div>
                  <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-teal-400/30 dark:bg-teal-400/10 rounded-full animate-blob animation-delay-2000"></div>
                  <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-blue-400/30 dark:bg-blue-400/10 rounded-full animate-blob animation-delay-4000"></div>
                  <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-indigo-400/30 dark:bg-indigo-400/10 rounded-full animate-blob animation-delay-2000"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                        <Activity className="h-8 w-8 text-white" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-30 animate-pulse"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Diabetes Management</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Smart monitoring for better health</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center shadow-lg transform rotate-6">
                <Activity className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center shadow-lg transform -rotate-6">
                <Utensils className="h-12 w-12 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value={10000} label="Users" duration={3} className="text-green-600 dark:text-green-400" />
            <StatsCounter
              value={95}
              suffix="%"
              label="Accuracy"
              duration={2.5}
              className="text-teal-600 dark:text-teal-400"
            />
            <StatsCounter
              value={500}
              suffix="+"
              label="Diet Plans"
              duration={2}
              className="text-blue-600 dark:text-blue-400"
            />
            <StatsCounter
              value={300}
              suffix="+"
              label="Exercise Routines"
              duration={2.8}
              className="text-indigo-600 dark:text-indigo-400"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-green-50 dark:from-gray-900 dark:to-green-950"></div>
        <div className="absolute inset-0 bg-[url('/dots-pattern.svg')] opacity-5"></div>

        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 font-medium text-sm">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
              Comprehensive Tools
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300">
              Our Key Features
            </h2>
            <p className="max-w-[800px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sugar Wise offers a comprehensive suite of tools to help you manage diabetes and maintain a healthy
              lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <Activity className="h-8 w-8 text-white" />,
                title: "Diabetes Prediction",
                description:
                  "Input your health metrics and get an instant prediction of your diabetes risk using our advanced neural network model.",
                link: "/predict",
                gradient: "from-green-500 to-teal-500",
                hoverGradient: "from-green-600 to-teal-600",
                bgGradient: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30",
              },
              {
                icon: <Utensils className="h-8 w-8 text-white" />,
                title: "Diet Recommendations",
                description:
                  "Get personalized diet recommendations and answers to your nutrition questions powered by advanced AI.",
                link: "/diet",
                gradient: "from-teal-500 to-blue-500",
                hoverGradient: "from-teal-600 to-blue-600",
                bgGradient: "from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30",
              },
              {
                icon: <Dumbbell className="h-8 w-8 text-white" />,
                title: "Exercise Plans",
                description:
                  "Access tailored exercise plans designed to help reduce blood sugar levels and improve overall health.",
                link: "/exercise",
                gradient: "from-blue-500 to-indigo-500",
                hoverGradient: "from-blue-600 to-indigo-600",
                bgGradient: "from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative group rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className={`h-48 overflow-hidden bg-gradient-to-br ${feature.bgGradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110`}
                    >
                      {feature.icon}
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-30 animate-pulse`}
                      ></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col h-full">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} group-hover:${feature.hoverGradient} shadow-lg mb-6 self-start transition-all duration-300 -mt-12`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{feature.description}</p>
                  <Link href={feature.link}>
                    <Button
                      variant="ghost"
                      className={`group/btn p-0 h-auto text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-transparent`}
                    >
                      <span className="mr-2">Explore</span>
                      <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Simple Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              How Sugar Wise Works
            </h2>
            <p className="max-w-[800px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform makes diabetes management simple and effective with just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500"></div>

            {[
              {
                step: "01",
                title: "Input Your Health Data",
                description: "Enter your health metrics like glucose levels, BMI, age, and other relevant information.",
                icon: <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />,
                color: "green",
              },
              {
                step: "02",
                title: "Get Instant Analysis",
                description:
                  "Our AI model processes your data and provides an instant prediction of your diabetes risk.",
                icon: <Activity className="h-6 w-6 text-teal-600 dark:text-teal-400" />,
                color: "teal",
              },
              {
                step: "03",
                title: "Receive Personalized Plans",
                description:
                  "Based on your results, get tailored diet and exercise recommendations to improve your health.",
                icon: <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
                color: "blue",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center border-2 border-${step.color}-500 z-10 md:z-20`}
                >
                  <span className={`text-${step.color}-600 dark:text-${step.color}-400 font-bold`}>{step.step}</span>
                </div>
                <div className="pt-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10">
                  <div
                    className={`p-3 rounded-full bg-${step.color}-100 dark:bg-${step.color}-900/30 inline-flex mb-4`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-teal-50 dark:from-gray-900 dark:to-teal-950"></div>
        <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-5"></div>

        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
              User Stories
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-500 dark:from-indigo-400 dark:to-purple-300">
              Success Stories
            </h2>
            <p className="max-w-[800px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how Sugar Wise has helped people take control of their health
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-500"></div>
        <div className="absolute inset-0 bg-[url('/cta-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-8 right-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

        <div className="container relative px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium text-sm">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                  Get Started Today
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 dark:from-green-400 dark:to-teal-300">
                  Start Your Health Journey Now
                </h2>
                <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step towards better health with Sugar Wise. Our platform provides everything you need
                  to manage diabetes effectively.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Link href="/predict">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300"
                    >
                      Check Your Diabetes Risk
                    </Button>
                  </Link>
                  <Link href="/diet">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-green-500/20 hover:border-green-500/40 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
                    >
                      Explore Diet Plans
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
