import { createAgent, createTool, openai } from '@inngest/agent-kit';
import axios from 'axios';
import { z } from 'zod';

const listChargesTool = createTool({
  name: 'list_charges',
  description:
    "Search the web for relevant product listing pages on trusted e-commerce platforms, prioritizing reliable sources and competitive pricing signals. ",
  parameters: z.object({
      query: z.string().describe("Search query - any topic the user wants news about")
}),
  handler: async (input, { network, agent, step }) => {


       //  configuring thr axios api
    let data = JSON.stringify({
      q: input.query,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://google.serper.dev/search",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
      data: data,
    };

   
     const response=await step?.run("Searching-product", async()=>{
    // running the step
    const response=await step?.run("serper_api-call-on-internet", async()=>{
         const res = await axios.request(config);
        if(!res) throw new Error(`serper api error ${res}`)

          const data=res.data

          return data
    })

     })
  },
});

