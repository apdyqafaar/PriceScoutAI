// src/models/PriceAnalysis.ts
import { Schema, model, models } from "mongoose";

const PriceAnalysisSchema = new Schema(
  {
    searchId: {
      type: Schema.Types.ObjectId,
      ref: "ProductSearch",
    },
    cheapestUrl: String,
    lowestPrice: Number,
    currency: String,
    confidenceScore: Number,
    notes: String,
  },
  { timestamps: true }
);

export default models.PriceAnalysis ||
  model("PriceAnalysis", PriceAnalysisSchema);
