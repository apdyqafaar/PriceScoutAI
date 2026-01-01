// src/models/ProductSearch.ts
import { Schema, model, models } from "mongoose";

const ProductSearchSchema = new Schema(
  {
    query: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    completedReason:{type:String},
    progress:{type:Number, default:0},
    onganics: [
  {
    title: { type: String},
    link: { type: String},
    source: { type: String},
    imageUrl: { type: String},
    price: { type: String},
    position: { type: Number},
    rating: { type: Number},
  },
],
  runId:{type: String,
    required: true,
    unique: true,
    index: true,}
  },

  { timestamps: true }
);

export default models.ProductSearch ||
  model("ProductSearch", ProductSearchSchema);
