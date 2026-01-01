import {createTool } from '@inngest/agent-kit';
import { z } from 'zod';
import {  connectDB } from '../db/connection';
import productSearch from '@/models/productSearch';
import RankedProduct from '@/models/priceAnalysis';

export const Analyzer = createTool({
  name: 'save_tool',
  description:
  "Save the finalized array of analyzed product objects to the database. This tool should be called only after all analysis is complete and the products are correctly ranked.",
parameters: z.object({
  products: z
    .array(
      z.object({
        title: z.string(),
        link: z.string().url(),
        source: z.string().optional(),
        position: z.number(),
        price: z.string().optional(),
        imageUrl: z.string().optional(),
        rating: z.number().optional(),
        rankingReason: z.string().describe("why you ranked this position"),
      })
    )
    .describe(
      "Final ranked array of product objects ready to be persisted. Each object must reflect the analysis result without modification."
    ),
}),

  handler: async (input, { network, agent, step }) => {
    let rankedProducts=input.products

    // saving to db
    await step?.run("saving_to_db", async()=>{
      try {
      const runId=network.state?.data.runId as string
      if(runId){
        await connectDB()
      await RankedProduct.create({
        productId:runId,  
        rankedProducts
      })

      // updating the progress
         await productSearch.findByIdAndUpdate(
                       runId,
                       {
                         $set:{
                           progress:80
                         }
                       }
      )

    

      }else{
        console.error("No runId in Network")
       throw new Error("No runId in Network")
    }
      } catch (error) {
        console.error("Error at saving products were found: ", error)
        throw error
      }
   
    })

    
    network.state.data.rankedProducts=rankedProducts
    console.log("rankedProducts :", rankedProducts)

    return rankedProducts

  },
});

