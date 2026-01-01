// src/models/RankedProduct.ts
import { Schema, model, models } from "mongoose";

const RankedProductSchema = new Schema(
  {
    productId:{
       type: String,
      required: true
    },

    rankedProducts:[
      {
         title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    source: {
      type: String,
    },

    position: {
      type: Number,
      required: true,
    },

    price: {
      type: String,
    },

    imageUrl: {
      type: String,
    },

    rating: {
      type: Number,
    },

    rankingReason: {
      type: String,
      required: true,
    },
      }
    ]
   
  },
  {
    timestamps: true,
  }
);

export default models.RankedProduct ||
  model("RankedProduct", RankedProductSchema);
