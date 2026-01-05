// src/models/ProductSearch.ts
import { Schema, model, models } from "mongoose";

const ProductSearchSchema = new Schema(
  {
    query: { type: String, default: "" },
    UserQuery: { type: String, default: "",},
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    completedReason:{type:String, default: "",},
    progress:{type:Number, default:0},
    onganics:{type: [
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
default:[]
},
  runId:{type: String,
    required: true,
    unique: true,
    index: true,}
  },

  { timestamps: true }
);

export default models.ProductSearch ||
  model("ProductSearch", ProductSearchSchema);
