// src/models/ProductSearch.ts
import { Schema, model, models } from "mongoose";

const ProductSearchSchema = new Schema(
  {
    query: { type: String, required: true },
    source: { type: String }, // google, serper, etc
    urls: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    progress:{type:Number, default:0},
    productDetails: [
  {
    title: { type: String},
    url: { type: String},
    Snippet: { type: String},
    siteLinks:[
      {
         title:{type:String},
         links:{type:String}
      }
    ]
  },
],

  },

  { timestamps: true }
);

export default models.ProductSearch ||
  model("ProductSearch", ProductSearchSchema);
