"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Printer,
  Download,
  Share2,
  BookmarkPlus,
  Utensils,
} from "lucide-react"
import { motion } from "framer-motion"

// Define the diet plan interface
interface DietPlan {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  benefits: string[]
  foodsToEat: string[]
  foodsToAvoid: string[]
  mealPlan: {
    day: string
    meals: {
      type: string
      name: string
      description: string
      ingredients?: string[]
      nutritionInfo?: {
        calories: number
        carbs: number
        protein: number
        fat: number
      }
    }[]
  }[]
  tips: string[]
  researchBacked: string
}

// Sample diet plans data with detailed content
const dietPlans: Record<string, DietPlan> = {
  "low-carb": {
    id: "low-carb",
    title: "Low Carb Diet Plan",
    description: "A diet plan focused on reducing carbohydrate intake to help manage blood sugar levels.",
    longDescription:
      "The Low Carb Diet Plan is specifically designed for individuals with diabetes or those at risk of developing the condition. By significantly reducing carbohydrate intake, particularly refined carbs and sugars, this plan helps stabilize blood glucose levels and improve insulin sensitivity. Research has shown that low-carb diets can be particularly effective for managing type 2 diabetes, often resulting in reduced medication needs and improved glycemic control.",
    image: "/images/low-carb.png",
    tags: ["Low Carb", "Diabetes-Friendly", "Weight Loss"],
    benefits: [
      "Helps stabilize blood sugar levels throughout the day",
      "May reduce need for diabetes medication in some individuals",
      "Promotes weight loss, which improves insulin sensitivity",
      "Can lower triglycerides and increase HDL (good) cholesterol",
      "Reduces hunger and cravings by stabilizing blood sugar",
    ],
    foodsToEat: [
      "Non-starchy vegetables (leafy greens, broccoli, cauliflower, peppers)",
      "Moderate amounts of protein (chicken, fish, eggs, tofu)",
      "Healthy fats (avocados, olive oil, nuts, seeds)",
      "Limited amounts of low-glycemic fruits (berries, cherries)",
      "Full-fat dairy in moderation (Greek yogurt, cheese)",
      "Nuts and seeds (almonds, walnuts, chia seeds, flaxseeds)",
    ],
    foodsToAvoid: [
      "Refined grains (white bread, pasta, rice)",
      "Sugary foods and beverages",
      "Starchy vegetables in large amounts (potatoes, corn)",
      "High-sugar fruits (bananas, grapes, mangoes)",
      "Processed foods with added sugars",
      "Sweetened condiments and sauces",
    ],
    mealPlan: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Veggie Egg Scramble",
            description:
              "Eggs scrambled with spinach, bell peppers, and a sprinkle of cheese, served with avocado slices.",
            nutritionInfo: {
              calories: 350,
              carbs: 9,
              protein: 22,
              fat: 26,
            },
          },
          {
            type: "Lunch",
            name: "Grilled Chicken Salad",
            description: "Mixed greens topped with grilled chicken, cucumber, cherry tomatoes, and olive oil dressing.",
            nutritionInfo: {
              calories: 420,
              carbs: 12,
              protein: 35,
              fat: 25,
            },
          },
          {
            type: "Dinner",
            name: "Baked Salmon with Roasted Vegetables",
            description: "Herb-seasoned salmon fillet with roasted broccoli and cauliflower.",
            nutritionInfo: {
              calories: 480,
              carbs: 15,
              protein: 38,
              fat: 28,
            },
          },
          {
            type: "Snack",
            name: "Celery with Almond Butter",
            description: "Celery sticks served with unsweetened almond butter.",
            nutritionInfo: {
              calories: 150,
              carbs: 6,
              protein: 5,
              fat: 12,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Greek Yogurt Parfait",
            description: "Full-fat Greek yogurt topped with berries, chia seeds, and a sprinkle of chopped nuts.",
            nutritionInfo: {
              calories: 320,
              carbs: 14,
              protein: 20,
              fat: 22,
            },
          },
          {
            type: "Lunch",
            name: "Turkey and Avocado Lettuce Wraps",
            description: "Sliced turkey, avocado, and vegetables wrapped in large lettuce leaves.",
            nutritionInfo: {
              calories: 380,
              carbs: 11,
              protein: 30,
              fat: 24,
            },
          },
          {
            type: "Dinner",
            name: "Zucchini Noodles with Meatballs",
            description: "Spiralized zucchini topped with homemade meatballs and low-sugar marinara sauce.",
            nutritionInfo: {
              calories: 450,
              carbs: 18,
              protein: 35,
              fat: 26,
            },
          },
          {
            type: "Snack",
            name: "Mixed Nuts",
            description: "A small handful of mixed nuts (almonds, walnuts, and pecans).",
            nutritionInfo: {
              calories: 180,
              carbs: 5,
              protein: 6,
              fat: 16,
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            type: "Breakfast",
            name: "Spinach and Feta Omelette",
            description: "Two-egg omelette with spinach, feta cheese, and herbs, served with sliced avocado.",
            nutritionInfo: {
              calories: 370,
              carbs: 8,
              protein: 24,
              fat: 28,
            },
          },
          {
            type: "Lunch",
            name: "Tuna Salad Stuffed Peppers",
            description: "Bell peppers stuffed with tuna salad made with olive oil mayo, celery, and herbs.",
            nutritionInfo: {
              calories: 360,
              carbs: 10,
              protein: 32,
              fat: 22,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Steak with Cauliflower Mash",
            description: "Grilled steak served with garlic cauliflower mash and sautéed green beans.",
            nutritionInfo: {
              calories: 520,
              carbs: 12,
              protein: 42,
              fat: 32,
            },
          },
          {
            type: "Snack",
            name: "Cucumber and Cream Cheese",
            description: "Cucumber slices topped with full-fat cream cheese and everything bagel seasoning.",
            nutritionInfo: {
              calories: 140,
              carbs: 5,
              protein: 4,
              fat: 12,
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            type: "Breakfast",
            name: "Chia Seed Pudding",
            description:
              "Chia seeds soaked in unsweetened almond milk with vanilla extract and cinnamon, topped with a few berries.",
            nutritionInfo: {
              calories: 290,
              carbs: 12,
              protein: 10,
              fat: 22,
            },
          },
          {
            type: "Lunch",
            name: "Cobb Salad",
            description:
              "Mixed greens topped with grilled chicken, bacon, hard-boiled egg, avocado, and blue cheese with olive oil dressing.",
            nutritionInfo: {
              calories: 490,
              carbs: 9,
              protein: 38,
              fat: 34,
            },
          },
          {
            type: "Dinner",
            name: "Stuffed Portobello Mushrooms",
            description:
              "Portobello mushrooms stuffed with ground turkey, spinach, and cheese, served with a side salad.",
            nutritionInfo: {
              calories: 420,
              carbs: 14,
              protein: 36,
              fat: 26,
            },
          },
          {
            type: "Snack",
            name: "Cheese and Olives",
            description: "Cubes of cheddar cheese with a small serving of olives.",
            nutritionInfo: {
              calories: 170,
              carbs: 2,
              protein: 8,
              fat: 14,
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            type: "Breakfast",
            name: "Avocado Baked Eggs",
            description: "Eggs baked in avocado halves, topped with crumbled bacon and chives.",
            nutritionInfo: {
              calories: 380,
              carbs: 10,
              protein: 18,
              fat: 32,
            },
          },
          {
            type: "Lunch",
            name: "Shrimp and Vegetable Stir-Fry",
            description: "Shrimp stir-fried with broccoli, bell peppers, and snap peas in a ginger-garlic sauce.",
            nutritionInfo: {
              calories: 340,
              carbs: 15,
              protein: 34,
              fat: 16,
            },
          },
          {
            type: "Dinner",
            name: "Baked Chicken Thighs with Roasted Vegetables",
            description: "Herb-seasoned chicken thighs baked with Brussels sprouts and radishes.",
            nutritionInfo: {
              calories: 460,
              carbs: 12,
              protein: 38,
              fat: 28,
            },
          },
          {
            type: "Snack",
            name: "Beef Jerky",
            description: "Sugar-free beef jerky with a small handful of macadamia nuts.",
            nutritionInfo: {
              calories: 190,
              carbs: 3,
              protein: 15,
              fat: 13,
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            type: "Breakfast",
            name: "Smoked Salmon with Cream Cheese",
            description: "Smoked salmon and cream cheese roll-ups with capers and dill, served with cucumber slices.",
            nutritionInfo: {
              calories: 340,
              carbs: 5,
              protein: 26,
              fat: 24,
            },
          },
          {
            type: "Lunch",
            name: "Cauliflower Soup with Side Salad",
            description: "Creamy cauliflower soup with a mixed green salad topped with olive oil and lemon dressing.",
            nutritionInfo: {
              calories: 320,
              carbs: 16,
              protein: 12,
              fat: 24,
            },
          },
          {
            type: "Dinner",
            name: "Pork Tenderloin with Asparagus",
            description: "Roasted pork tenderloin with garlic-roasted asparagus and a side of sautéed mushrooms.",
            nutritionInfo: {
              calories: 450,
              carbs: 10,
              protein: 45,
              fat: 24,
            },
          },
          {
            type: "Snack",
            name: "Deviled Eggs",
            description: "Deviled eggs made with avocado oil mayo and paprika.",
            nutritionInfo: {
              calories: 160,
              carbs: 1,
              protein: 12,
              fat: 12,
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            type: "Breakfast",
            name: "Keto Pancakes",
            description: "Low-carb pancakes made with almond flour and topped with a few berries and sugar-free syrup.",
            nutritionInfo: {
              calories: 360,
              carbs: 12,
              protein: 16,
              fat: 28,
            },
          },
          {
            type: "Lunch",
            name: "Bunless Burger with Side Salad",
            description: "Beef patty topped with cheese, lettuce, tomato, and avocado, served with a side salad.",
            nutritionInfo: {
              calories: 480,
              carbs: 8,
              protein: 36,
              fat: 34,
            },
          },
          {
            type: "Dinner",
            name: "Baked Cod with Lemon Butter",
            description: "Cod fillet baked with lemon butter sauce, served with roasted zucchini and yellow squash.",
            nutritionInfo: {
              calories: 390,
              carbs: 10,
              protein: 38,
              fat: 22,
            },
          },
          {
            type: "Snack",
            name: "Keto Fat Bombs",
            description: "Homemade chocolate fat bombs made with coconut oil, cocoa powder, and a sugar substitute.",
            nutritionInfo: {
              calories: 180,
              carbs: 2,
              protein: 2,
              fat: 18,
            },
          },
        ],
      },
    ],
    tips: [
      "Start gradually by reducing carbs rather than eliminating them completely",
      "Focus on eating whole, unprocessed foods",
      "Stay hydrated, as low-carb diets can initially increase water loss",
      "Monitor your blood sugar regularly to see how different foods affect you",
      "Consider working with a dietitian to personalize the plan to your needs",
      "Include plenty of fiber-rich vegetables to stay full and support gut health",
    ],
    researchBacked:
      "A 2019 study published in Diabetes Therapy found that a low-carb diet helped people with type 2 diabetes reduce their HbA1c levels and medication use. Another study in the Journal of Medical Internet Research showed that participants following a low-carb diet for one year lost more weight and had better blood sugar control than those on a low-fat diet.",
  },
  mediterranean: {
    id: "mediterranean",
    title: "Mediterranean Diet",
    description: "A heart-healthy eating plan that emphasizes fruits, vegetables, whole grains, and lean proteins.",
    longDescription:
      "The Mediterranean Diet is inspired by the traditional eating patterns of countries bordering the Mediterranean Sea. This well-researched dietary approach emphasizes plant-based foods, healthy fats (especially olive oil), and moderate consumption of fish, poultry, and dairy. It's not just a diet but a lifestyle that has been consistently ranked as one of the healthiest dietary patterns worldwide. For people with diabetes, the Mediterranean diet offers excellent glycemic control while providing cardiovascular benefits.",
    image: "/images/mediterranean.png",
    tags: ["Heart-Healthy", "Anti-Inflammatory", "Balanced"],
    benefits: [
      "Improves insulin sensitivity and glycemic control",
      "Reduces risk of cardiovascular disease, which is elevated in diabetes",
      "Helps maintain healthy weight through satisfying, nutrient-dense foods",
      "Lowers inflammation, which is linked to diabetes complications",
      "Rich in antioxidants that protect against oxidative stress",
      "Supports brain health and may reduce risk of depression",
    ],
    foodsToEat: [
      "Abundant vegetables and fruits (aim for variety and color)",
      "Whole grains (whole wheat, brown rice, quinoa, barley)",
      "Legumes (beans, lentils, chickpeas)",
      "Nuts and seeds (walnuts, almonds, flaxseeds)",
      "Olive oil as the primary fat source",
      "Fish and seafood at least twice a week",
      "Moderate amounts of poultry, eggs, and dairy",
      "Herbs and spices instead of salt for flavoring",
    ],
    foodsToAvoid: [
      "Processed meats (bacon, sausage, deli meats)",
      "Refined grains (white bread, white pasta)",
      "Added sugars and sweetened beverages",
      "Highly processed foods with artificial ingredients",
      "Excessive red meat consumption",
      "Trans fats and hydrogenated oils",
    ],
    mealPlan: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Greek Yogurt with Berries and Nuts",
            description: "Plain Greek yogurt topped with mixed berries, chopped walnuts, and a drizzle of honey.",
            nutritionInfo: {
              calories: 340,
              carbs: 28,
              protein: 22,
              fat: 16,
            },
          },
          {
            type: "Lunch",
            name: "Mediterranean Chickpea Salad",
            description:
              "Chickpeas, cucumber, tomatoes, red onion, feta cheese, and olives with olive oil and lemon dressing.",
            nutritionInfo: {
              calories: 420,
              carbs: 45,
              protein: 15,
              fat: 22,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Fish with Roasted Vegetables",
            description:
              "Grilled fish (such as salmon or sea bass) with a medley of roasted vegetables and a side of quinoa.",
            nutritionInfo: {
              calories: 480,
              carbs: 35,
              protein: 38,
              fat: 20,
            },
          },
          {
            type: "Snack",
            name: "Handful of Mixed Nuts",
            description: "A small portion of unsalted mixed nuts (almonds, walnuts, pistachios).",
            nutritionInfo: {
              calories: 170,
              carbs: 6,
              protein: 6,
              fat: 15,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Toast with Avocado",
            description:
              "Whole grain toast topped with mashed avocado, a sprinkle of feta cheese, and cherry tomatoes.",
            nutritionInfo: {
              calories: 320,
              carbs: 30,
              protein: 10,
              fat: 18,
            },
          },
          {
            type: "Lunch",
            name: "Lentil Soup with Side Salad",
            description:
              "Hearty lentil soup with vegetables, served with a small side salad dressed with olive oil and vinegar.",
            nutritionInfo: {
              calories: 390,
              carbs: 50,
              protein: 18,
              fat: 12,
            },
          },
          {
            type: "Dinner",
            name: "Chicken Souvlaki with Greek Salad",
            description:
              "Grilled chicken skewers with a traditional Greek salad and a small portion of whole grain pita.",
            nutritionInfo: {
              calories: 460,
              carbs: 30,
              protein: 40,
              fat: 22,
            },
          },
          {
            type: "Snack",
            name: "Apple with Almond Butter",
            description: "A medium apple sliced and served with a tablespoon of almond butter.",
            nutritionInfo: {
              calories: 200,
              carbs: 25,
              protein: 5,
              fat: 10,
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            type: "Breakfast",
            name: "Mediterranean Vegetable Omelette",
            description:
              "Omelette with tomatoes, spinach, olives, and a sprinkle of feta cheese, served with a slice of whole grain toast.",
            nutritionInfo: {
              calories: 360,
              carbs: 22,
              protein: 24,
              fat: 20,
            },
          },
          {
            type: "Lunch",
            name: "Tuna and White Bean Salad",
            description:
              "Tuna mixed with white beans, red onion, parsley, and lemon-olive oil dressing on a bed of greens.",
            nutritionInfo: {
              calories: 380,
              carbs: 30,
              protein: 35,
              fat: 14,
            },
          },
          {
            type: "Dinner",
            name: "Vegetable and Chickpea Tagine",
            description: "Moroccan-style vegetable and chickpea stew served over whole grain couscous.",
            nutritionInfo: {
              calories: 420,
              carbs: 65,
              protein: 15,
              fat: 12,
            },
          },
          {
            type: "Snack",
            name: "Greek Yogurt with Honey",
            description: "Plain Greek yogurt drizzled with honey and a sprinkle of cinnamon.",
            nutritionInfo: {
              calories: 160,
              carbs: 18,
              protein: 15,
              fat: 4,
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            type: "Breakfast",
            name: "Overnight Oats with Figs and Honey",
            description:
              "Rolled oats soaked in milk overnight, topped with chopped dried figs, honey, and a sprinkle of pistachios.",
            nutritionInfo: {
              calories: 340,
              carbs: 55,
              protein: 12,
              fat: 10,
            },
          },
          {
            type: "Lunch",
            name: "Mediterranean Quinoa Bowl",
            description: "Quinoa topped with roasted vegetables, chickpeas, olives, and tahini dressing.",
            nutritionInfo: {
              calories: 410,
              carbs: 55,
              protein: 14,
              fat: 16,
            },
          },
          {
            type: "Dinner",
            name: "Baked Cod with Tomatoes and Olives",
            description:
              "Cod fillet baked with tomatoes, olives, capers, and herbs, served with a side of roasted potatoes.",
            nutritionInfo: {
              calories: 390,
              carbs: 25,
              protein: 35,
              fat: 15,
            },
          },
          {
            type: "Snack",
            name: "Hummus with Vegetable Sticks",
            description: "Homemade hummus served with carrot, cucumber, and bell pepper sticks.",
            nutritionInfo: {
              calories: 180,
              carbs: 20,
              protein: 7,
              fat: 8,
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Pancakes with Fruit",
            description: "Whole grain pancakes topped with fresh berries and a dollop of Greek yogurt.",
            nutritionInfo: {
              calories: 380,
              carbs: 60,
              protein: 15,
              fat: 10,
            },
          },
          {
            type: "Lunch",
            name: "Stuffed Bell Peppers",
            description: "Bell peppers stuffed with a mixture of brown rice, ground turkey, tomatoes, and herbs.",
            nutritionInfo: {
              calories: 360,
              carbs: 35,
              protein: 25,
              fat: 14,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Shrimp with Herb Salad",
            description: "Grilled shrimp served over a salad of fresh herbs, tomatoes, cucumber, and bulgur wheat.",
            nutritionInfo: {
              calories: 370,
              carbs: 30,
              protein: 32,
              fat: 12,
            },
          },
          {
            type: "Snack",
            name: "Fresh Fruit with Yogurt Dip",
            description: "Sliced fresh fruit served with a yogurt, honey, and cinnamon dip.",
            nutritionInfo: {
              calories: 150,
              carbs: 25,
              protein: 8,
              fat: 2,
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            type: "Breakfast",
            name: "Shakshuka",
            description:
              "Eggs poached in a sauce of tomatoes, peppers, onions, and spices, served with whole grain bread.",
            nutritionInfo: {
              calories: 370,
              carbs: 25,
              protein: 20,
              fat: 22,
            },
          },
          {
            type: "Lunch",
            name: "Mediterranean Wrap",
            description: "Whole grain wrap filled with hummus, grilled vegetables, feta cheese, and mixed greens.",
            nutritionInfo: {
              calories: 420,
              carbs: 50,
              protein: 15,
              fat: 18,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Lamb with Tabbouleh",
            description:
              "Grilled lamb chops served with tabbouleh salad (bulgur wheat, parsley, mint, tomatoes, and lemon).",
            nutritionInfo: {
              calories: 490,
              carbs: 25,
              protein: 40,
              fat: 25,
            },
          },
          {
            type: "Snack",
            name: "Olives and Cheese",
            description: "A small serving of mixed olives with cubes of feta cheese.",
            nutritionInfo: {
              calories: 180,
              carbs: 5,
              protein: 8,
              fat: 15,
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            type: "Breakfast",
            name: "Mediterranean Breakfast Board",
            description: "A platter with boiled eggs, cucumber, tomatoes, olives, feta cheese, and whole grain bread.",
            nutritionInfo: {
              calories: 390,
              carbs: 30,
              protein: 22,
              fat: 22,
            },
          },
          {
            type: "Lunch",
            name: "Seafood Paella",
            description: "Traditional Spanish rice dish with seafood, saffron, and vegetables.",
            nutritionInfo: {
              calories: 460,
              carbs: 60,
              protein: 25,
              fat: 14,
            },
          },
          {
            type: "Dinner",
            name: "Ratatouille with Grilled Chicken",
            description:
              "Classic French vegetable stew (eggplant, zucchini, bell peppers, tomatoes) served with grilled chicken breast.",
            nutritionInfo: {
              calories: 380,
              carbs: 25,
              protein: 35,
              fat: 15,
            },
          },
          {
            type: "Snack",
            name: "Dark Chocolate and Almonds",
            description: "A small piece of dark chocolate (70% or higher) with a few almonds.",
            nutritionInfo: {
              calories: 170,
              carbs: 12,
              protein: 5,
              fat: 13,
            },
          },
        ],
      },
    ],
    tips: [
      "Use olive oil as your primary cooking oil and for salad dressings",
      "Aim to eat fish at least twice a week, focusing on fatty fish rich in omega-3s",
      "Fill half your plate with vegetables at lunch and dinner",
      "Choose whole fruits instead of juices to get more fiber",
      "Experiment with herbs and spices to add flavor without salt",
      "Enjoy meals with family and friends when possible – the social aspect is part of the Mediterranean lifestyle",
      "Stay physically active, another key component of the Mediterranean lifestyle",
    ],
    researchBacked:
      "A landmark study published in the New England Journal of Medicine found that the Mediterranean diet reduced the risk of major cardiovascular events by approximately 30% among high-risk individuals. For diabetes specifically, a meta-analysis in BMJ Open showed that the Mediterranean diet improved glycemic control, reduced cardiovascular risk factors, and promoted weight loss in people with type 2 diabetes.",
  },
  dash: {
    id: "dash",
    title: "DASH Diet",
    description: "Dietary Approaches to Stop Hypertension - a plan designed to help lower blood pressure.",
    longDescription:
      "The DASH (Dietary Approaches to Stop Hypertension) Diet was originally developed to help lower blood pressure, but it has proven beneficial for diabetes management as well. This evidence-based eating plan emphasizes fruits, vegetables, whole grains, lean proteins, and low-fat dairy while limiting sodium, saturated fats, and added sugars. Since many people with diabetes also have hypertension, the DASH diet addresses multiple health concerns simultaneously, making it an excellent choice for comprehensive health management.",
    image: "/images/dash.png",
    tags: ["Blood Pressure", "Heart-Healthy", "Low Sodium"],
    benefits: [
      "Lowers blood pressure, a common comorbidity with diabetes",
      "Improves insulin sensitivity and helps manage blood glucose",
      "Reduces risk of heart disease and stroke",
      "Supports kidney health, which is crucial for people with diabetes",
      "Promotes weight loss and maintenance",
      "Provides a balanced approach to nutrition that's sustainable long-term",
    ],
    foodsToEat: [
      "Vegetables (4-5 servings daily)",
      "Fruits (4-5 servings daily)",
      "Whole grains (6-8 servings daily)",
      "Low-fat dairy products (2-3 servings daily)",
      "Lean meats, poultry, and fish (6 or fewer servings daily)",
      "Nuts, seeds, and legumes (4-5 servings weekly)",
      "Healthy oils (2-3 servings daily)",
    ],
    foodsToAvoid: [
      "High-sodium foods (processed foods, canned soups, deli meats)",
      "Sugary beverages and sweets",
      "Red and processed meats",
      "Full-fat dairy products",
      "Foods high in saturated and trans fats",
      "Alcohol (limit to moderate consumption)",
    ],
    mealPlan: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Overnight Oats with Berries",
            description:
              "Rolled oats soaked in low-fat milk, topped with mixed berries and a sprinkle of chopped nuts.",
            nutritionInfo: {
              calories: 320,
              carbs: 45,
              protein: 15,
              fat: 10,
            },
          },
          {
            type: "Lunch",
            name: "Quinoa Bowl with Grilled Chicken",
            description: "Quinoa topped with grilled chicken, roasted vegetables, and a light vinaigrette dressing.",
            nutritionInfo: {
              calories: 430,
              carbs: 40,
              protein: 35,
              fat: 15,
            },
          },
          {
            type: "Dinner",
            name: "Baked Fish with Sweet Potato",
            description: "Herb-seasoned baked fish fillet with a side of roasted sweet potato and steamed broccoli.",
            nutritionInfo: {
              calories: 390,
              carbs: 30,
              protein: 30,
              fat: 14,
            },
          },
          {
            type: "Snack",
            name: "Fresh Fruit with Yogurt Dip",
            description: "Sliced fresh fruit served with a small amount of low-fat yogurt for dipping.",
            nutritionInfo: {
              calories: 150,
              carbs: 25,
              protein: 8,
              fat: 2,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Toast with Egg",
            description:
              "Whole grain toast topped with scrambled egg whites, spinach, and a sprinkle of low-fat cheese.",
            nutritionInfo: {
              calories: 290,
              carbs: 30,
              protein: 20,
              fat: 10,
            },
          },
          {
            type: "Lunch",
            name: "Turkey and Vegetable Wrap",
            description: "Whole grain wrap filled with lean turkey, plenty of vegetables, and a thin spread of hummus.",
            nutritionInfo: {
              calories: 380,
              carbs: 40,
              protein: 25,
              fat: 12,
            },
          },
          {
            type: "Dinner",
            name: "Vegetable and Bean Soup",
            description: "Hearty vegetable soup with beans, served with a small whole grain roll.",
            nutritionInfo: {
              calories: 340,
              carbs: 50,
              protein: 15,
              fat: 8,
            },
          },
          {
            type: "Snack",
            name: "Unsalted Mixed Nuts",
            description: "A small portion of unsalted mixed nuts.",
            nutritionInfo: {
              calories: 170,
              carbs: 6,
              protein: 6,
              fat: 15,
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            type: "Breakfast",
            name: "Fruit and Vegetable Smoothie",
            description:
              "Smoothie made with spinach, banana, berries, low-fat yogurt, and a tablespoon of ground flaxseed.",
            nutritionInfo: {
              calories: 280,
              carbs: 45,
              protein: 12,
              fat: 6,
            },
          },
          {
            type: "Lunch",
            name: "Grilled Chicken and Vegetable Salad",
            description:
              "Mixed greens topped with grilled chicken, plenty of colorful vegetables, and a light olive oil dressing.",
            nutritionInfo: {
              calories: 350,
              carbs: 20,
              protein: 35,
              fat: 14,
            },
          },
          {
            type: "Dinner",
            name: "Whole Wheat Pasta with Lean Meat Sauce",
            description:
              "Whole wheat pasta topped with a sauce made from lean ground turkey, tomatoes, and vegetables.",
            nutritionInfo: {
              calories: 420,
              carbs: 55,
              protein: 30,
              fat: 10,
            },
          },
          {
            type: "Snack",
            name: "Low-Fat Greek Yogurt with Honey",
            description: "Low-fat Greek yogurt drizzled with a small amount of honey.",
            nutritionInfo: {
              calories: 140,
              carbs: 20,
              protein: 15,
              fat: 2,
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Cereal with Berries",
            description: "High-fiber, low-sugar whole grain cereal with low-fat milk and topped with fresh berries.",
            nutritionInfo: {
              calories: 310,
              carbs: 55,
              protein: 12,
              fat: 5,
            },
          },
          {
            type: "Lunch",
            name: "Lentil and Vegetable Soup",
            description: "Hearty lentil soup with carrots, celery, and onions, served with a small whole grain roll.",
            nutritionInfo: {
              calories: 360,
              carbs: 60,
              protein: 18,
              fat: 6,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Salmon with Quinoa",
            description: "Grilled salmon fillet served with quinoa and steamed asparagus.",
            nutritionInfo: {
              calories: 420,
              carbs: 25,
              protein: 40,
              fat: 18,
            },
          },
          {
            type: "Snack",
            name: "Apple with Peanut Butter",
            description: "Apple slices served with a small amount of natural peanut butter.",
            nutritionInfo: {
              calories: 180,
              carbs: 25,
              protein: 5,
              fat: 8,
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegetable Egg White Omelette",
            description:
              "Egg white omelette with spinach, mushrooms, and bell peppers, served with a slice of whole grain toast.",
            nutritionInfo: {
              calories: 270,
              carbs: 25,
              protein: 22,
              fat: 8,
            },
          },
          {
            type: "Lunch",
            name: "Tuna Sandwich on Whole Grain",
            description: "Tuna mixed with light mayo, celery, and onions on whole grain bread with lettuce and tomato.",
            nutritionInfo: {
              calories: 340,
              carbs: 35,
              protein: 30,
              fat: 10,
            },
          },
          {
            type: "Dinner",
            name: "Stir-Fried Tofu with Vegetables",
            description: "Tofu stir-fried with a variety of vegetables, served over brown rice.",
            nutritionInfo: {
              calories: 380,
              carbs: 45,
              protein: 20,
              fat: 12,
            },
          },
          {
            type: "Snack",
            name: "Vegetable Sticks with Hummus",
            description: "Carrot, celery, and bell pepper sticks served with a small amount of hummus.",
            nutritionInfo: {
              calories: 130,
              carbs: 15,
              protein: 5,
              fat: 6,
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Pancakes with Fruit",
            description: "Whole grain pancakes topped with fresh fruit and a small amount of maple syrup.",
            nutritionInfo: {
              calories: 350,
              carbs: 60,
              protein: 10,
              fat: 8,
            },
          },
          {
            type: "Lunch",
            name: "Chicken and Vegetable Soup",
            description: "Homemade chicken soup with plenty of vegetables, served with a small whole grain roll.",
            nutritionInfo: {
              calories: 320,
              carbs: 30,
              protein: 25,
              fat: 10,
            },
          },
          {
            type: "Dinner",
            name: "Lean Beef Stir-Fry",
            description: "Lean beef strips stir-fried with broccoli, carrots, and snap peas, served over brown rice.",
            nutritionInfo: {
              calories: 430,
              carbs: 40,
              protein: 35,
              fat: 15,
            },
          },
          {
            type: "Snack",
            name: "Low-Fat Cottage Cheese with Fruit",
            description: "Low-fat cottage cheese topped with fresh pineapple chunks.",
            nutritionInfo: {
              calories: 160,
              carbs: 20,
              protein: 15,
              fat: 3,
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            type: "Breakfast",
            name: "Breakfast Burrito",
            description:
              "Whole grain tortilla filled with scrambled egg whites, black beans, vegetables, and a small amount of low-fat cheese.",
            nutritionInfo: {
              calories: 360,
              carbs: 45,
              protein: 25,
              fat: 10,
            },
          },
          {
            type: "Lunch",
            name: "Mediterranean Salad",
            description:
              "Mixed greens topped with chickpeas, cucumber, tomatoes, olives, and feta cheese with olive oil dressing.",
            nutritionInfo: {
              calories: 340,
              carbs: 30,
              protein: 15,
              fat: 18,
            },
          },
          {
            type: "Dinner",
            name: "Baked Chicken with Roasted Vegetables",
            description:
              "Herb-seasoned baked chicken breast with a variety of roasted vegetables and a small portion of wild rice.",
            nutritionInfo: {
              calories: 410,
              carbs: 30,
              protein: 40,
              fat: 12,
            },
          },
          {
            type: "Snack",
            name: "Baked Apple with Cinnamon",
            description: "Baked apple sprinkled with cinnamon and a small amount of chopped walnuts.",
            nutritionInfo: {
              calories: 150,
              carbs: 25,
              protein: 2,
              fat: 6,
            },
          },
        ],
      },
    ],
    tips: [
      "Reduce sodium intake by using herbs and spices instead of salt",
      "Choose whole grains over refined grains",
      "Limit sugary drinks and sweets",
      "Eat plenty of fruits and vegetables",
      "Choose lean protein sources",
      "Limit saturated and trans fats",
      "Monitor your blood pressure regularly",
    ],
    researchBacked:
      "The DASH diet has been shown to lower blood pressure and improve cholesterol levels. It is also a healthy eating plan for people with diabetes.",
  },
  "plant-based": {
    id: "plant-based",
    title: "Plant-Based Diet",
    description: "A diet centered around plant foods, with limited or no animal products.",
    longDescription:
      "A Plant-Based Diet focuses on foods primarily from plants, including vegetables, fruits, whole grains, legumes, nuts, and seeds. This approach can range from flexible (occasionally including animal products) to fully vegan (excluding all animal products). For diabetes management, plant-based diets offer numerous benefits through their high fiber content, complex carbohydrates, and abundance of phytonutrients. Research shows that plant-based eating patterns can significantly improve insulin sensitivity and glycemic control while reducing inflammation and cardiovascular risk factors.",
    image: "/images/plant-based.png",
    tags: ["Vegan", "Vegetarian", "High-Fiber"],
    benefits: [
      "Improves insulin sensitivity through reduced saturated fat intake",
      "High fiber content helps regulate blood sugar levels",
      "Promotes weight loss and maintenance",
      "Reduces inflammation associated with diabetes complications",
      "Lowers risk of cardiovascular disease",
      "Supports gut health through diverse plant fibers",
      "Reduces environmental impact compared to animal-based diets",
    ],
    foodsToEat: [
      "Abundant vegetables of all types and colors",
      "Fruits in moderate portions (berries, apples, citrus fruits are lower glycemic options)",
      "Legumes (beans, lentils, chickpeas, peas)",
      "Whole grains (quinoa, brown rice, oats, barley)",
      "Nuts and seeds (walnuts, flaxseeds, chia seeds, almonds)",
      "Plant-based proteins (tofu, tempeh, seitan)",
      "Healthy plant oils (olive, avocado)",
    ],
    foodsToAvoid: [
      "Processed plant-based foods high in sodium or added sugars",
      "Refined grains (white bread, white rice)",
      "Sweetened beverages and fruit juices",
      "Fried foods, even if plant-based",
      "Excessive amounts of high-glycemic fruits",
      "Animal products (depending on how strict the approach is)",
    ],
    mealPlan: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Chia Seed Pudding",
            description: "Chia seeds soaked in plant-based milk, topped with berries and a sprinkle of nuts.",
            nutritionInfo: {
              calories: 310,
              carbs: 35,
              protein: 12,
              fat: 16,
            },
          },
          {
            type: "Lunch",
            name: "Chickpea and Vegetable Buddha Bowl",
            description: "Roasted chickpeas, mixed vegetables, and quinoa with tahini dressing.",
            nutritionInfo: {
              calories: 450,
              carbs: 60,
              protein: 18,
              fat: 16,
            },
          },
          {
            type: "Dinner",
            name: "Lentil and Vegetable Stew",
            description:
              "Hearty lentil stew with carrots, celery, onions, and tomatoes, served with a small portion of brown rice.",
            nutritionInfo: {
              calories: 420,
              carbs: 65,
              protein: 20,
              fat: 8,
            },
          },
          {
            type: "Snack",
            name: "Apple with Almond Butter",
            description: "Apple slices served with a tablespoon of natural almond butter.",
            nutritionInfo: {
              calories: 200,
              carbs: 25,
              protein: 5,
              fat: 10,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Tofu Scramble with Vegetables",
            description:
              "Crumbled tofu sautéed with turmeric, nutritional yeast, and mixed vegetables, served with whole grain toast.",
            nutritionInfo: {
              calories: 340,
              carbs: 30,
              protein: 22,
              fat: 14,
            },
          },
          {
            type: "Lunch",
            name: "Hearty Bean and Vegetable Soup",
            description: "Mixed bean soup with vegetables and herbs, served with a side salad.",
            nutritionInfo: {
              calories: 380,
              carbs: 60,
              protein: 18,
              fat: 6,
            },
          },
          {
            type: "Dinner",
            name: "Stuffed Bell Peppers",
            description:
              "Bell peppers stuffed with a mixture of quinoa, black beans, corn, and spices, topped with a small amount of plant-based cheese.",
            nutritionInfo: {
              calories: 410,
              carbs: 55,
              protein: 16,
              fat: 12,
            },
          },
          {
            type: "Snack",
            name: "Hummus with Vegetable Sticks",
            description: "Homemade hummus served with carrot, cucumber, and bell pepper sticks.",
            nutritionInfo: {
              calories: 180,
              carbs: 20,
              protein: 7,
              fat: 8,
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            type: "Breakfast",
            name: "Overnight Oats with Fruit",
            description:
              "Rolled oats soaked in plant-based milk with chia seeds, topped with sliced banana and berries.",
            nutritionInfo: {
              calories: 320,
              carbs: 55,
              protein: 10,
              fat: 8,
            },
          },
          {
            type: "Lunch",
            name: "Quinoa Tabbouleh Salad",
            description:
              "Quinoa mixed with parsley, mint, tomatoes, cucumber, and lemon juice, served with whole grain pita.",
            nutritionInfo: {
              calories: 370,
              carbs: 65,
              protein: 12,
              fat: 10,
            },
          },
          {
            type: "Dinner",
            name: "Vegetable and Tofu Stir-Fry",
            description: "Tofu and mixed vegetables stir-fried in a ginger-garlic sauce, served over brown rice.",
            nutritionInfo: {
              calories: 420,
              carbs: 50,
              protein: 22,
              fat: 14,
            },
          },
          {
            type: "Snack",
            name: "Trail Mix",
            description: "Homemade trail mix with nuts, seeds, and a small amount of dried fruit.",
            nutritionInfo: {
              calories: 210,
              carbs: 15,
              protein: 8,
              fat: 14,
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            type: "Breakfast",
            name: "Green Smoothie Bowl",
            description:
              "Smoothie bowl made with spinach, banana, plant-based milk, and topped with granola and berries.",
            nutritionInfo: {
              calories: 350,
              carbs: 65,
              protein: 10,
              fat: 8,
            },
          },
          {
            type: "Lunch",
            name: "Lentil and Vegetable Wrap",
            description: "Whole grain wrap filled with seasoned lentils, roasted vegetables, and tahini sauce.",
            nutritionInfo: {
              calories: 420,
              carbs: 60,
              protein: 16,
              fat: 14,
            },
          },
          {
            type: "Dinner",
            name: "Vegetable and Bean Chili",
            description:
              "Hearty chili made with mixed beans, vegetables, and spices, served with a small portion of brown rice.",
            nutritionInfo: {
              calories: 390,
              carbs: 65,
              protein: 18,
              fat: 6,
            },
          },
          {
            type: "Snack",
            name: "Roasted Chickpeas",
            description: "Crispy roasted chickpeas seasoned with spices.",
            nutritionInfo: {
              calories: 160,
              carbs: 20,
              protein: 8,
              fat: 6,
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            type: "Breakfast",
            name: "Whole Grain Toast with Avocado",
            description:
              "Whole grain toast topped with mashed avocado, sliced tomato, and a sprinkle of nutritional yeast.",
            nutritionInfo: {
              calories: 330,
              carbs: 35,
              protein: 10,
              fat: 18,
            },
          },
          {
            type: "Lunch",
            name: "Mediterranean Grain Bowl",
            description: "Farro or barley topped with roasted vegetables, chickpeas, olives, and lemon-herb dressing.",
            nutritionInfo: {
              calories: 440,
              carbs: 70,
              protein: 14,
              fat: 12,
            },
          },
          {
            type: "Dinner",
            name: "Mushroom and Lentil Burgers",
            description:
              "Homemade mushroom and lentil patties served on whole grain buns with lettuce, tomato, and plant-based sauce.",
            nutritionInfo: {
              calories: 460,
              carbs: 60,
              protein: 20,
              fat: 16,
            },
          },
          {
            type: "Snack",
            name: "Edamame",
            description: "Steamed edamame pods lightly sprinkled with sea salt.",
            nutritionInfo: {
              calories: 150,
              carbs: 12,
              protein: 12,
              fat: 6,
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegan Pancakes with Fruit",
            description: "Whole grain vegan pancakes topped with fresh berries and a small amount of maple syrup.",
            nutritionInfo: {
              calories: 380,
              carbs: 70,
              protein: 8,
              fat: 10,
            },
          },
          {
            type: "Lunch",
            name: "Vegetable Sushi Rolls",
            description: "Brown rice sushi rolls filled with avocado, cucumber, carrot, and other vegetables.",
            nutritionInfo: {
              calories: 350,
              carbs: 65,
              protein: 8,
              fat: 8,
            },
          },
          {
            type: "Dinner",
            name: "Eggplant and Chickpea Curry",
            description:
              "Spiced curry with eggplant, chickpeas, and tomatoes, served with a small portion of brown rice.",
            nutritionInfo: {
              calories: 420,
              carbs: 60,
              protein: 15,
              fat: 14,
            },
          },
          {
            type: "Snack",
            name: "Fruit Salad",
            description: "Mixed fresh fruit salad with a sprinkle of chia seeds.",
            nutritionInfo: {
              calories: 130,
              carbs: 30,
              protein: 2,
              fat: 1,
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegetable Hash with Tofu",
            description: "Sweet potato and vegetable hash with crumbled tofu, seasoned with herbs and spices.",
            nutritionInfo: {
              calories: 360,
              carbs: 40,
              protein: 18,
              fat: 14,
            },
          },
          {
            type: "Lunch",
            name: "Lentil and Spinach Soup",
            description: "Hearty lentil soup with spinach and vegetables, served with whole grain bread.",
            nutritionInfo: {
              calories: 340,
              carbs: 55,
              protein: 16,
              fat: 6,
            },
          },
          {
            type: "Dinner",
            name: "Stuffed Acorn Squash",
            description:
              "Acorn squash halves stuffed with a mixture of wild rice, cranberries, walnuts, and vegetables.",
            nutritionInfo: {
              calories: 390,
              carbs: 60,
              protein: 10,
              fat: 14,
            },
          },
          {
            type: "Snack",
            name: "Dark Chocolate and Almonds",
            description: "A small piece of dark chocolate (70% or higher) with a few almonds.",
            nutritionInfo: {
              calories: 170,
              carbs: 12,
              protein: 5,
              fat: 13,
            },
          },
        ],
      },
    ],
    tips: [
      "Focus on whole, minimally processed plant foods",
      "Ensure adequate protein intake through varied plant sources",
      "Consider supplementing vitamin B12 if following a strict vegan diet",
      "Monitor blood sugar closely when transitioning to a plant-based diet",
      "Include sources of healthy fats like avocados, nuts, and seeds",
      "Experiment with herbs and spices to make plant foods more flavorful",
      "Transition gradually if you're new to plant-based eating",
    ],
    researchBacked:
      "Plant-based diets have been shown to improve blood sugar control and reduce the risk of heart disease in people with diabetes.",
  },
  keto: {
    id: "keto",
    title: "Ketogenic Diet",
    description: "A very low-carb, high-fat diet that puts your body into a metabolic state called ketosis.",
    longDescription:
      "The Ketogenic Diet is a very low-carbohydrate, high-fat eating plan that fundamentally changes how your body uses energy. By drastically reducing carbohydrate intake and replacing it with fat, your body enters a metabolic state called ketosis, where it becomes incredibly efficient at burning fat for energy. Originally developed to treat epilepsy in the 1920s, the keto diet has shown promising results for people with type 2 diabetes by improving glycemic control and reducing medication needs. The diet's ability to stabilize blood sugar levels makes it an attractive option for diabetes management.",
    image: "/images/low-carb.png",
    tags: ["Very Low Carb", "High Fat", "Weight Loss"],
    benefits: [
      "Significantly reduces blood glucose levels and improves insulin sensitivity",
      "Promotes rapid weight loss, which can improve diabetes management",
      "May reduce or eliminate the need for diabetes medications in some individuals",
      "Reduces triglycerides and increases HDL (good) cholesterol",
      "Provides steady energy levels without blood sugar spikes and crashes",
      "Can reduce inflammation, which is linked to many diabetes complications",
      "May improve cognitive function and mental clarity",
    ],
    foodsToEat: [
      "Healthy fats (olive oil, coconut oil, avocado oil, butter, ghee)",
      "Meat and poultry (beef, chicken, turkey, lamb)",
      "Fatty fish (salmon, mackerel, sardines)",
      "Eggs (preferably pasture-raised)",
      "Full-fat dairy (cheese, cream, Greek yogurt)",
      "Avocados and olives",
      "Low-carb vegetables (leafy greens, broccoli, cauliflower, zucchini)",
      "Nuts and seeds (almonds, walnuts, flaxseeds, chia seeds)",
      "Berries in small amounts (strawberries, blueberries, raspberries)",
    ],
    foodsToAvoid: [
      "Grains and starches (wheat, rice, pasta, cereal)",
      "Sugary foods (candy, cookies, cakes, ice cream)",
      "Fruits (except small portions of berries)",
      "Legumes (beans, lentils, chickpeas)",
      "Root vegetables (potatoes, carrots, sweet potatoes)",
      "Low-fat or diet products (often high in carbs)",
      "Condiments and sauces with added sugars",
      "Alcohol (especially beer and sugary cocktails)",
      "Processed foods with hidden carbs",
    ],
    mealPlan: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Avocado Baked Eggs",
            description: "Eggs baked in avocado halves, topped with cheese and bacon crumbles.",
            nutritionInfo: {
              calories: 420,
              carbs: 9,
              protein: 20,
              fat: 35,
            },
          },
          {
            type: "Lunch",
            name: "Keto Cobb Salad",
            description:
              "Mixed greens topped with grilled chicken, bacon, hard-boiled egg, avocado, blue cheese, and olive oil dressing.",
            nutritionInfo: {
              calories: 550,
              carbs: 7,
              protein: 40,
              fat: 38,
            },
          },
          {
            type: "Dinner",
            name: "Butter-Basted Ribeye Steak with Asparagus",
            description: "Pan-seared ribeye steak basted with herb butter, served with roasted asparagus.",
            nutritionInfo: {
              calories: 680,
              carbs: 6,
              protein: 48,
              fat: 52,
            },
          },
          {
            type: "Snack",
            name: "Cheese and Salami Roll-ups",
            description: "Slices of cheddar cheese rolled with salami slices.",
            nutritionInfo: {
              calories: 240,
              carbs: 2,
              protein: 12,
              fat: 20,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Keto Smoothie",
            description:
              "Smoothie made with unsweetened almond milk, avocado, spinach, MCT oil, and a small amount of berries.",
            nutritionInfo: {
              calories: 380,
              carbs: 8,
              protein: 6,
              fat: 36,
            },
          },
          {
            type: "Lunch",
            name: "Tuna Salad Lettuce Wraps",
            description: "Tuna mixed with mayonnaise, celery, and herbs, served in large romaine lettuce leaves.",
            nutritionInfo: {
              calories: 420,
              carbs: 4,
              protein: 35,
              fat: 28,
            },
          },
          {
            type: "Dinner",
            name: "Zucchini Noodles with Alfredo Sauce and Grilled Chicken",
            description: "Spiralized zucchini topped with creamy Alfredo sauce and grilled chicken breast.",
            nutritionInfo: {
              calories: 520,
              carbs: 10,
              protein: 42,
              fat: 34,
            },
          },
          {
            type: "Snack",
            name: "Macadamia Nuts",
            description: "A small handful of macadamia nuts.",
            nutritionInfo: {
              calories: 220,
              carbs: 4,
              protein: 2,
              fat: 22,
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            type: "Breakfast",
            name: "Bacon and Cheese Frittata",
            description: "Eggs baked with bacon, cheese, spinach, and mushrooms.",
            nutritionInfo: {
              calories: 450,
              carbs: 5,
              protein: 28,
              fat: 35,
            },
          },
          {
            type: "Lunch",
            name: "Keto Chicken Caesar Salad",
            description: "Romaine lettuce with grilled chicken, parmesan cheese, and Caesar dressing (no croutons).",
            nutritionInfo: {
              calories: 480,
              carbs: 6,
              protein: 38,
              fat: 32,
            },
          },
          {
            type: "Dinner",
            name: "Baked Salmon with Pesto and Roasted Brussels Sprouts",
            description: "Salmon fillet topped with basil pesto, served with roasted Brussels sprouts.",
            nutritionInfo: {
              calories: 560,
              carbs: 8,
              protein: 40,
              fat: 40,
            },
          },
          {
            type: "Snack",
            name: "Pepperoni Chips with Guacamole",
            description: "Crispy pepperoni slices served with a small portion of guacamole.",
            nutritionInfo: {
              calories: 250,
              carbs: 6,
              protein: 8,
              fat: 22,
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            type: "Breakfast",
            name: "Keto Pancakes",
            description:
              "Low-carb pancakes made with almond flour, cream cheese, and eggs, topped with a pat of butter.",
            nutritionInfo: {
              calories: 420,
              carbs: 8,
              protein: 18,
              fat: 36,
            },
          },
          {
            type: "Lunch",
            name: "Beef and Broccoli Stir-Fry",
            description: "Sliced beef stir-fried with broccoli, garlic, ginger, and soy sauce (no sugar added).",
            nutritionInfo: {
              calories: 490,
              carbs: 10,
              protein: 40,
              fat: 32,
            },
          },
          {
            type: "Dinner",
            name: "Stuffed Bell Peppers",
            description: "Bell peppers stuffed with ground beef, cauliflower rice, cheese, and herbs.",
            nutritionInfo: {
              calories: 520,
              carbs: 12,
              protein: 35,
              fat: 36,
            },
          },
          {
            type: "Snack",
            name: "Celery with Cream Cheese",
            description: "Celery sticks filled with full-fat cream cheese.",
            nutritionInfo: {
              calories: 180,
              carbs: 4,
              protein: 4,
              fat: 16,
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            type: "Breakfast",
            name: "Keto Coffee and Chia Pudding",
            description:
              "Coffee blended with MCT oil and butter, served with chia seeds soaked in unsweetened coconut milk.",
            nutritionInfo: {
              calories: 390,
              carbs: 6,
              protein: 8,
              fat: 36,
            },
          },
          {
            type: "Lunch",
            name: "Avocado Shrimp Salad",
            description: "Mixed greens topped with grilled shrimp, avocado, cucumber, and olive oil dressing.",
            nutritionInfo: {
              calories: 450,
              carbs: 9,
              protein: 32,
              fat: 30,
            },
          },
          {
            type: "Dinner",
            name: "Pork Chops with Creamed Spinach",
            description: "Pan-seared pork chops served with spinach in a creamy sauce.",
            nutritionInfo: {
              calories: 580,
              carbs: 7,
              protein: 45,
              fat: 40,
            },
          },
          {
            type: "Snack",
            name: "Keto Fat Bombs",
            description: "Homemade fat bombs made with coconut oil, cocoa powder, and a sugar substitute.",
            nutritionInfo: {
              calories: 210,
              carbs: 2,
              protein: 2,
              fat: 22,
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            type: "Breakfast",
            name: "Sausage and Egg Breakfast Bowl",
            description: "Scrambled eggs with sausage, bell peppers, cheese, and avocado.",
            nutritionInfo: {
              calories: 520,
              carbs: 7,
              protein: 30,
              fat: 42,
            },
          },
          {
            type: "Lunch",
            name: "Keto Club Lettuce Wraps",
            description: "Turkey, bacon, cheese, avocado, and mayo wrapped in large lettuce leaves.",
            nutritionInfo: {
              calories: 480,
              carbs: 5,
              protein: 35,
              fat: 34,
            },
          },
          {
            type: "Dinner",
            name: "Baked Cod with Lemon Butter and Cauliflower Mash",
            description:
              "Cod fillet baked with lemon butter sauce, served with cauliflower mashed with cream and cheese.",
            nutritionInfo: {
              calories: 510,
              carbs: 10,
              protein: 40,
              fat: 34,
            },
          },
          {
            type: "Snack",
            name: "Pork Rinds with Spinach Dip",
            description: "Pork rinds served with a creamy spinach dip.",
            nutritionInfo: {
              calories: 240,
              carbs: 3,
              protein: 12,
              fat: 20,
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            type: "Breakfast",
            name: "Cream Cheese Pancakes with Berries",
            description: "Pancakes made with cream cheese and eggs, topped with a small amount of fresh berries.",
            nutritionInfo: {
              calories: 410,
              carbs: 8,
              protein: 16,
              fat: 35,
            },
          },
          {
            type: "Lunch",
            name: "Keto Cheeseburger Soup",
            description: "Creamy soup with ground beef, cheese, and low-carb vegetables.",
            nutritionInfo: {
              calories: 490,
              carbs: 6,
              protein: 30,
              fat: 38,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Chicken Thighs with Herb Butter and Asparagus",
            description: "Grilled chicken thighs topped with herb butter, served with roasted asparagus.",
            nutritionInfo: {
              calories: 540,
              carbs: 5,
              protein: 42,
              fat: 38,
            },
          },
          {
            type: "Snack",
            name: "Olives and Cheese Cubes",
            description: "Assorted olives with cubes of cheddar cheese.",
            nutritionInfo: {
              calories: 220,
              carbs: 3,
              protein: 10,
              fat: 18,
            },
          },
        ],
      },
    ],
    tips: [
      "Track your carb intake carefully - aim for 20-50g of net carbs per day",
      "Increase salt intake to help manage the 'keto flu' and electrolyte balance",
      "Stay well-hydrated throughout the day",
      "Focus on healthy fats like avocados, olive oil, and fatty fish",
      "Monitor your ketone levels with urine strips or a blood ketone meter",
      "Consider intermittent fasting to enhance ketosis",
      "Be patient - it can take 2-4 weeks to become fully keto-adapted",
      "Work with a healthcare provider to adjust medications as needed",
    ],
    researchBacked:
      "A 2020 review in BMJ found that low-carbohydrate diets like keto can lead to remission of type 2 diabetes in some individuals. A study in Nutrition & Metabolism showed that participants following a ketogenic diet improved their glycemic control and reduced or eliminated diabetes medications. The diet's ability to reduce insulin levels and improve insulin sensitivity makes it particularly beneficial for those with insulin resistance.",
  },
  paleo: {
    id: "paleo",
    title: "Paleo Diet",
    description: "A diet based on foods similar to what might have been eaten during the Paleolithic era.",
    longDescription:
      "The Paleo Diet, also known as the 'Caveman Diet' or 'Stone Age Diet,' is based on the premise of eating foods that our hunter-gatherer ancestors would have consumed during the Paleolithic era, which ended around 10,000 years ago. This diet focuses on whole, unprocessed foods like lean meats, fish, fruits, vegetables, nuts, and seeds, while eliminating grains, legumes, dairy, and processed foods. For people with diabetes, the Paleo Diet may offer benefits through its emphasis on whole foods with a low glycemic impact, elimination of refined carbohydrates, and focus on nutrient-dense options that can help regulate blood sugar levels.",
    image: "/images/mediterranean.png",
    tags: ["Whole Foods", "Grain-Free", "Sugar-Free"],
    benefits: [
      "Stabilizes blood sugar levels by eliminating refined carbohydrates and sugars",
      "Promotes weight loss, which can improve insulin sensitivity",
      "Reduces inflammation through elimination of processed foods and focus on omega-3 rich foods",
      "Provides abundant nutrients from whole, unprocessed foods",
      "May reduce risk factors for cardiovascular disease, which is common in diabetes",
      "Eliminates many high-glycemic foods that can spike blood sugar",
      "Focuses on protein and healthy fats, which can increase satiety and reduce cravings",
    ],
    foodsToEat: [
      "Lean meats (grass-fed beef, free-range poultry, wild game)",
      "Fish and seafood (especially wild-caught, omega-3 rich varieties)",
      "Fresh fruits (in moderation for diabetes management)",
      "Non-starchy vegetables (leafy greens, broccoli, peppers, etc.)",
      "Nuts and seeds (almonds, walnuts, flaxseeds, etc.)",
      "Eggs (preferably pasture-raised)",
      "Healthy oils (olive, avocado, coconut)",
      "Herbs and spices",
    ],
    foodsToAvoid: [
      "Grains (wheat, oats, rice, corn, etc.)",
      "Legumes (beans, lentils, peanuts, etc.)",
      "Dairy products (milk, cheese, yogurt)",
      "Refined sugar and artificial sweeteners",
      "Processed foods and trans fats",
      "Potatoes (sweet potatoes in moderation are often allowed)",
      "Salt (in excess)",
      "Refined vegetable oils (canola, soybean, etc.)",
    ],
    mealPlan: [
      {
        day: "Monday",
        meals: [
          {
            type: "Breakfast",
            name: "Vegetable Omelette with Avocado",
            description: "Three-egg omelette with spinach, mushrooms, and bell peppers, served with sliced avocado.",
            nutritionInfo: {
              calories: 420,
              carbs: 12,
              protein: 24,
              fat: 32,
            },
          },
          {
            type: "Lunch",
            name: "Grilled Chicken Salad",
            description: "Mixed greens topped with grilled chicken, cucumber, tomatoes, and olive oil dressing.",
            nutritionInfo: {
              calories: 380,
              carbs: 15,
              protein: 35,
              fat: 20,
            },
          },
          {
            type: "Dinner",
            name: "Baked Salmon with Roasted Vegetables",
            description: "Wild-caught salmon fillet with roasted Brussels sprouts, carrots, and onions.",
            nutritionInfo: {
              calories: 460,
              carbs: 18,
              protein: 38,
              fat: 25,
            },
          },
          {
            type: "Snack",
            name: "Mixed Berries with Almonds",
            description: "A small portion of mixed berries with a handful of raw almonds.",
            nutritionInfo: {
              calories: 180,
              carbs: 14,
              protein: 6,
              fat: 12,
            },
          },
        ],
      },
      {
        day: "Tuesday",
        meals: [
          {
            type: "Breakfast",
            name: "Turkey and Vegetable Breakfast Hash",
            description: "Ground turkey sautéed with sweet potatoes, bell peppers, and onions, seasoned with herbs.",
            nutritionInfo: {
              calories: 390,
              carbs: 25,
              protein: 30,
              fat: 18,
            },
          },
          {
            type: "Lunch",
            name: "Tuna Lettuce Wraps",
            description: "Tuna mixed with avocado, diced celery, and herbs, wrapped in large lettuce leaves.",
            nutritionInfo: {
              calories: 340,
              carbs: 8,
              protein: 32,
              fat: 18,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Steak with Asparagus",
            description: "Grass-fed steak with grilled asparagus and a side of mixed berries.",
            nutritionInfo: {
              calories: 520,
              carbs: 15,
              protein: 45,
              fat: 30,
            },
          },
          {
            type: "Snack",
            name: "Apple Slices with Almond Butter",
            description: "Sliced apple served with a tablespoon of natural almond butter.",
            nutritionInfo: {
              calories: 200,
              carbs: 22,
              protein: 5,
              fat: 10,
            },
          },
        ],
      },
      {
        day: "Wednesday",
        meals: [
          {
            type: "Breakfast",
            name: "Paleo Smoothie Bowl",
            description:
              "Smoothie made with coconut milk, berries, spinach, and topped with sliced almonds and coconut flakes.",
            nutritionInfo: {
              calories: 360,
              carbs: 28,
              protein: 10,
              fat: 24,
            },
          },
          {
            type: "Lunch",
            name: "Chicken and Vegetable Soup",
            description: "Homemade soup with chicken, carrots, celery, onions, and herbs.",
            nutritionInfo: {
              calories: 320,
              carbs: 18,
              protein: 28,
              fat: 14,
            },
          },
          {
            type: "Dinner",
            name: "Baked Cod with Cauliflower Rice",
            description: "Herb-seasoned cod fillet with riced cauliflower sautéed with garlic and olive oil.",
            nutritionInfo: {
              calories: 380,
              carbs: 12,
              protein: 35,
              fat: 18,
            },
          },
          {
            type: "Snack",
            name: "Vegetable Sticks with Guacamole",
            description: "Carrot, celery, and cucumber sticks served with homemade guacamole.",
            nutritionInfo: {
              calories: 160,
              carbs: 14,
              protein: 3,
              fat: 12,
            },
          },
        ],
      },
      {
        day: "Thursday",
        meals: [
          {
            type: "Breakfast",
            name: "Paleo Breakfast Bowl",
            description: "Ground beef sautéed with sweet potatoes, kale, and topped with a fried egg.",
            nutritionInfo: {
              calories: 450,
              carbs: 22,
              protein: 32,
              fat: 26,
            },
          },
          {
            type: "Lunch",
            name: "Shrimp and Avocado Salad",
            description: "Mixed greens topped with grilled shrimp, avocado, cucumber, and lemon-olive oil dressing.",
            nutritionInfo: {
              calories: 360,
              carbs: 12,
              protein: 30,
              fat: 20,
            },
          },
          {
            type: "Dinner",
            name: "Roasted Chicken with Vegetables",
            description: "Herb-roasted chicken thighs with roasted zucchini, bell peppers, and onions.",
            nutritionInfo: {
              calories: 480,
              carbs: 15,
              protein: 40,
              fat: 28,
            },
          },
          {
            type: "Snack",
            name: "Trail Mix",
            description: "Homemade mix of nuts, seeds, and a small amount of dried fruit.",
            nutritionInfo: {
              calories: 210,
              carbs: 12,
              protein: 7,
              fat: 16,
            },
          },
        ],
      },
      {
        day: "Friday",
        meals: [
          {
            type: "Breakfast",
            name: "Paleo Breakfast Muffins",
            description: "Grain-free muffins made with almond flour, eggs, banana, and walnuts.",
            nutritionInfo: {
              calories: 380,
              carbs: 18,
              protein: 14,
              fat: 28,
            },
          },
          {
            type: "Lunch",
            name: "Turkey and Vegetable Lettuce Wraps",
            description: "Sliced turkey with avocado, tomato, and mixed vegetables wrapped in large lettuce leaves.",
            nutritionInfo: {
              calories: 350,
              carbs: 14,
              protein: 32,
              fat: 18,
            },
          },
          {
            type: "Dinner",
            name: "Grilled Pork Chops with Roasted Brussels Sprouts",
            description:
              "Grilled pork chops seasoned with herbs, served with roasted Brussels sprouts and a side of berries.",
            nutritionInfo: {
              calories: 490,
              carbs: 16,
              protein: 42,
              fat: 28,
            },
          },
          {
            type: "Snack",
            name: "Hard-Boiled Eggs",
            description: "Two hard-boiled eggs with a sprinkle of sea salt.",
            nutritionInfo: {
              calories: 140,
              carbs: 1,
              protein: 12,
              fat: 10,
            },
          },
        ],
      },
      {
        day: "Saturday",
        meals: [
          {
            type: "Breakfast",
            name: "Paleo Pancakes with Berries",
            description: "Grain-free pancakes made with almond flour and eggs, topped with fresh berries.",
            nutritionInfo: {
              calories: 420,
              carbs: 24,
              protein: 16,
              fat: 30,
            },
          },
          {
            type: "Lunch",
            name: "Beef and Vegetable Stir-Fry",
            description: "Grass-fed beef strips stir-fried with broccoli, carrots, and snap peas in coconut oil.",
            nutritionInfo: {
              calories: 430,
              carbs: 18,
              protein: 35,
              fat: 24,
            },
          },
          {
            type: "Dinner",
            name: "Baked Trout with Roasted Root Vegetables",
            description: "Herb-seasoned trout fillet with roasted sweet potatoes, parsnips, and carrots.",
            nutritionInfo: {
              calories: 460,
              carbs: 25,
              protein: 36,
              fat: 22,
            },
          },
          {
            type: "Snack",
            name: "Coconut Yogurt with Berries",
            description: "Unsweetened coconut yogurt topped with a small handful of mixed berries.",
            nutritionInfo: {
              calories: 170,
              carbs: 14,
              protein: 3,
              fat: 12,
            },
          },
        ],
      },
      {
        day: "Sunday",
        meals: [
          {
            type: "Breakfast",
            name: "Paleo Breakfast Casserole",
            description: "Casserole made with eggs, ground turkey, sweet potatoes, and vegetables.",
            nutritionInfo: {
              calories: 440,
              carbs: 20,
              protein: 32,
              fat: 26,
            },
          },
          {
            type: "Lunch",
            name: "Salmon Avocado Bowl",
            description: "Flaked salmon with avocado, cucumber, and mixed greens, dressed with lemon and olive oil.",
            nutritionInfo: {
              calories: 410,
              carbs: 12,
              protein: 30,
              fat: 26,
            },
          },
          {
            type: "Dinner",
            name: "Slow-Cooked Beef Stew",
            description: "Tender beef chunks slow-cooked with carrots, celery, onions, and herbs.",
            nutritionInfo: {
              calories: 480,
              carbs: 18,
              protein: 40,
              fat: 26,
            },
          },
          {
            type: "Snack",
            name: "Kale Chips",
            description: "Homemade kale chips baked with olive oil and sea salt.",
            nutritionInfo: {
              calories: 130,
              carbs: 8,
              protein: 3,
              fat: 10,
            },
          },
        ],
      },
    ],
    tips: [
      "Focus on quality protein sources like grass-fed meat and wild-caught fish",
      "Fill half your plate with non-starchy vegetables at each meal",
      "Monitor your fruit intake if you have diabetes - focus on lower-glycemic options",
      "Use herbs and spices liberally to add flavor without adding sugar or salt",
      "Plan and prepare meals in advance to avoid reaching for non-paleo convenience foods",
      "Read labels carefully - many packaged foods contain hidden non-paleo ingredients",
      "Stay hydrated with water, herbal teas, and bone broth",
      "Consider tracking your blood sugar to see how different paleo foods affect your levels",
    ],
    researchBacked:
      "A 2015 study published in the European Journal of Clinical Nutrition found that a Paleo diet improved glycemic control and several cardiovascular risk factors compared to a conventional diabetes diet. Another study in Cardiovascular Diabetology showed that a Paleolithic diet led to improved glucose tolerance, decreased insulin secretion, and increased insulin sensitivity compared to a Mediterranean-like diet in individuals with type 2 diabetes.",
  },
}

export default function DietPlanDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [plan, setPlan] = useState<DietPlan | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDay, setSelectedDay] = useState("Monday")

  useEffect(() => {
    // Get the plan ID from the URL parameters
    const id = params.id as string

    // Find the corresponding plan in our data
    const foundPlan = dietPlans[id]

    if (foundPlan) {
      setPlan(foundPlan)
    } else {
      // If plan not found, redirect to the diet page
      router.push("/diet")
    }
  }, [params, router])

  if (!plan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50 dark:from-teal-950 dark:via-blue-950 dark:to-indigo-950"></div>
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/diet")}
            className="mb-6 hover:bg-white/50 dark:hover:bg-gray-800/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Diet Plans
          </Button>

          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="w-full h-64 bg-gradient-to-br from-teal-400 to-blue-500 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full animate-blob"></div>
                <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-white/10 rounded-full animate-blob animation-delay-4000"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Utensils className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {plan.tags.map((tag) => (
                  <Badge key={tag} className="bg-teal-500 hover:bg-teal-600">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{plan.title}</h1>
              <p className="text-lg mt-2 text-gray-100">{plan.description}</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-1 bg-teal-100/50 dark:bg-teal-900/20 rounded-xl">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="meal-plan"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm"
              >
                Meal Plan
              </TabsTrigger>
              <TabsTrigger
                value="foods"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm"
              >
                Foods List
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 data-[state=active]:shadow-sm"
              >
                Tips & Research
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">About This Diet</h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{plan.longDescription}</p>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {plan.benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start p-4 bg-teal-50 dark:bg-teal-900/30 rounded-lg"
                          >
                            <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-400 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Printer className="h-4 w-4" />
                          <span className="hidden sm:inline">Print</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span className="hidden sm:inline">Download PDF</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Share2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Share</span>
                        </Button>
                      </div>
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1">
                        <BookmarkPlus className="h-4 w-4" />
                        <span>Save Plan</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meal-plan">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">7-Day Meal Plan</h2>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Full Calendar</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Printer className="h-4 w-4" />
                          <span>Print</span>
                        </Button>
                      </div>
                    </div>

                    <div className="flex overflow-x-auto pb-2 space-x-2">
                      {plan.mealPlan.map((day) => (
                        <Button
                          key={day.day}
                          variant={selectedDay === day.day ? "default" : "outline"}
                          className={`flex-shrink-0 ${
                            selectedDay === day.day
                              ? "bg-teal-600 hover:bg-teal-700 text-white"
                              : "hover:bg-teal-50 dark:hover:bg-teal-900/30"
                          }`}
                          onClick={() => setSelectedDay(day.day)}
                        >
                          {day.day}
                        </Button>
                      ))}
                    </div>

                    {plan.mealPlan
                      .find((day) => day.day === selectedDay)
                      ?.meals.map((meal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 rounded-full mb-2">
                                {meal.type}
                              </span>
                              <h3 className="text-lg font-semibold">{meal.name}</h3>
                            </div>
                            {meal.nutritionInfo && (
                              <div className="text-right">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Nutrition</span>
                                <div className="flex gap-2 text-xs">
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {meal.nutritionInfo.calories} cal
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {meal.nutritionInfo.carbs}g carbs
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {meal.nutritionInfo.protein}g protein
                                  </span>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {meal.nutritionInfo.fat}g fat
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mt-2">{meal.description}</p>
                          {meal.ingredients && (
                            <div className="mt-3">
                              <span className="text-sm font-medium">Ingredients:</span>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 pl-5 list-disc">
                                {meal.ingredients.map((ingredient, i) => (
                                  <li key={i}>{ingredient}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </motion.div>
                      ))}

                    <div className="flex justify-center mt-4">
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white">Generate Shopping List</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="foods">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-green-600 dark:text-green-400">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Foods to Eat
                      </h2>
                      <div className="space-y-3">
                        {plan.foodsToEat.map((food, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-start"
                          >
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 mr-3">
                              <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{food}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-red-600 dark:text-red-400">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        Foods to Avoid
                      </h2>
                      <div className="space-y-3">
                        {plan.foodsToAvoid.map((food, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-start"
                          >
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mt-0.5 mr-3">
                              <span className="text-red-600 dark:text-red-400 text-xs">✕</span>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{food}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Meal Timing Tips</h3>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">
                          For optimal blood sugar control, try to maintain consistent meal timing each day. Aim to eat
                          every 3-4 hours, and avoid skipping meals. This helps prevent blood sugar spikes and crashes.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Success Tips</h2>
                      <div className="grid grid-cols-1 gap-4">
                        {plan.tips.map((tip, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                          >
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mt-0.5 mr-3">
                              <span className="text-teal-600 dark:text-teal-400 text-xs font-bold">{index + 1}</span>
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                      <h2 className="text-2xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
                        Research-Backed Benefits
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{plan.researchBacked}</p>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3" />
                        <div>
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">Important Note</h3>
                          <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm">
                            This diet plan is provided for informational purposes only and is not intended as medical
                            advice. Always consult with your healthcare provider or a registered dietitian before
                            starting any new diet, especially if you have diabetes or other health conditions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
