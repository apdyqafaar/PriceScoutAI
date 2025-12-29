// src/models/ScrapedProduct.ts
import { Schema, model, models } from "mongoose";

const ScrapedProductSchema = new Schema(
  {
    searchId: {
      type: Schema.Types.ObjectId,
      ref: "ProductSearch",
    },
    url: { type: String, required: true },
    title: String,
    price: Number,
    currency: String,
    availability: String,
    rawText: String,
    scrapedAt: Date,
  },
  { timestamps: true }
);

export default models.ScrapedProduct ||
  model("ScrapedProduct", ScrapedProductSchema);
