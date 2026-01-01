// src/lib/mongoose.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env");
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error", error);
    throw error;
  }
}


export const closeDb=async()=>{
  try {
    if(mongoose.connection.readyState !==0){
      await mongoose.connection.close()
       console.log("🔌 MongoDB connection closed");
    }
  } catch (error) {
    console.error("❌ Error closing MongoDB connection", error);
  }
}
