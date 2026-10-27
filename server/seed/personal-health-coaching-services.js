
import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";

dotenv.config();

const services = [
  {
    title: "Personal Health Coaching",
    description: "One-on-one coaching for healthy routines, wellness goals, and sustainable lifestyle changes.",
    category: "Personal Coaching",
    duration: 60,
    price: 95,
    active: true,
  },
  {
    title: "Nutrition & Healthy Eating",
    description: "Build balanced eating habits and practical meal-planning routines.",
    category: "Nutrition",
    duration: 45,
    price: 75,
    active: true,
  },
  {
    title: "Fitness & Movement Coaching",
    description: "Create a personalized movement routine and develop consistent activity habits.",
    category: "Fitness",
    duration: 45,
    price: 75,
    active: true,
  },
  {
    title: "Stress Management & Mindfulness",
    description: "Learn techniques for everyday stress management, relaxation, and mindfulness.",
    category: "Mental Wellness",
    duration: 45,
    price: 70,
    active: true,
  },
  {
    title: "Sleep & Recovery Coaching",
    description: "Improve sleep routines, rest habits, and healthy recovery practices.",
    category: "Sleep",
    duration: 30,
    price: 55,
    active: true,
  },
  {
    title: "Healthy Habits & Accountability",
    description: "Set achievable wellness goals, track progress, and stay accountable.",
    category: "Accountability",
    duration: 30,
    price: 50,
    active: true,
  },
];

try {
  await mongoose.connect(process.env.MONGO_URI);

  for (const service of services) {
    await Service.findOneAndUpdate(
      { title: service.title },
      { $set: service },
      { upsert: true, runValidators: true }
    );
  }

  console.log("Personal Health Coaching services added!");
} catch (error) {
  console.error("Error:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
