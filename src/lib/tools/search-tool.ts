import { createAgent, createTool, openai } from '@inngest/agent-kit';
import axios from 'axios';
import { z } from 'zod';
import { FormatResultToProductDetailes } from '../formating/formatResults';
import {  connectDB } from '../db/connection';
import productSearch from '@/models/productSearch';

export const searchTool = createTool({
  name: 'search_tool',
  description:
    "Search the web for relevant product listing pages on trusted e-commerce platforms, prioritizing reliable sources and competitive pricing signals. ",
  parameters: z.object({
      query: z.string().describe("Search query - any topic the user wants news about")
}),
  handler: async (input, { network, agent, step }) => {


       //  configuring thr axios api
    let data = JSON.stringify({
      "q": input.query,
      "num":20
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://google.serper.dev/shopping",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

  
    // running the step
    const response=await step?.run("serper_api-call-on-internet", async()=>{
         const res = await axios.request(config);
        if(!res) throw new Error(`serper api error ${res}`)

          const data=res.data

          return data
    })
  

    const products= await FormatResultToProductDetailes(response)
     const dataDb={
      query:input.query,
      proprogress:25,
      onganics:[...products]
     }

    


    // saving to db
    await step?.run("saving_to_db", async()=>{
      try {
      const runId=network.state?.data.runId as string
      if(runId){
        await connectDB()
      await productSearch.findOneAndUpdate(
        {runId},
        {
          $set:{
            ...dataDb
          }
        },
        {
          upsert:true,
          new:true,
          setDefaultsOnInsert:true
        }
      )

      // await closeDb()

      }else{
        console.error("No runId in Network")
       throw new Error("No runId in Network")
    }
      } catch (error) {
        console.error("Error at saving products were found: ", error)
        throw error
      }
   
    })

    
    network.state.data.product=products
    // console.log("Products formated:", products)

  },
});

