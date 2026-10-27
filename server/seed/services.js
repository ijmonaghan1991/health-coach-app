
import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";

dotenv.config();

const services = [
  {
    title: "Personal Health Coaching",
    description:
      "One-on-one coaching to build healthy routines, set wellness goals, and create sustainable lifestyle changes.",
    category: "Personal Coaching",
    duration: 60,
    price: 95,
    active: true,
  },
  {
    title: "Nutrition & Healthy Eating",
    description:
      "Develop balanced eating habits, meal-planning skills, and sustainable nutrition routines.",
    category: "Nutrition",
    duration: 45,
    price: 75,
    active: true,
  },
  {
    title: "Fitness & Movement Coaching",
    description:
      "Build a personalized movement routine and develop consistent physical activity habits.",
    category: "Fitness",
    duration: 45,
    price: 75,
    active: true,
  },
  {
    title: "Stress Management & Mindfulness",
    description:
      "Learn practical techniques for managing everyday stress, relaxation, and mindfulness.",
    category: "Mental Wellness",
    duration: 45,
    price: 70,
    active: true,
  },
  {
    title: "Sleep & Recovery Coaching",
    description:
      "Improve your sleep schedule, nighttime routines, and healthy recovery habits.",
    category: "Sleep",
    duration: 30,
    price: 55,
    active: true,
  },
  {
    title: "Healthy Habits & Accountability",
    description:
      "Set realistic wellness goals, review your progress, and stay accountable.",
    category: "Accountability",
    duration: 30,
    price: 50,
    active: true,
  },
];

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB connected");

  // Update matching services or create new ones.
  // Existing bookings remain linked to their services.
  for (const service of services) {
    await Service.findOneAndUpdate(
      { title: service.title },
      { $set: service },
      { upsert: true, new: true, runValidators: true }
    );
  }

  console.log("Personal Health Coaching services added!");
} catch (error) {
  console.error("Failed to add services:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
