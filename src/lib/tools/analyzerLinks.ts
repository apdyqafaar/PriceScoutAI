import {createTool } from '@inngest/agent-kit';
import { z } from 'zod';
import {  connectDB } from '../db/connection';
import productSearch from '@/models/productSearch';
import RankedProduct from '@/models/priceAnalysis';
const RankedProductSchema = z.object({
  title: z.string(),
  link: z.string(),
  source: z.string(),
  position: z.number(),
  price: z.string(),
  imageUrl: z.string(),
  rating: z.number(),
  rankingReason: z.string(),
});


export const Analyzer = createTool({
  name: 'save_tool',
  description:
  "Save the finalized array of analyzed product objects to the database. This tool should be called only after all analysis is complete and the products are correctly ranked.",
parameters: z.object({
  products: z.array(RankedProductSchema),
}),

  handler: async (input, { network, agent, step }) => {
    let rankedProducts=input.products

    console.log("Ranked products: ", rankedProducts)

    // saving to db
    await step?.run("saving_to_db", async()=>{
      try {
      const runId=network.state?.data.runId as string
      if(runId){
        await connectDB()
      await RankedProduct.create({
        runId,  
        rankedProducts
      })

      // updating the progress
         await productSearch.findOneAndUpdate(
                       {runId},
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

