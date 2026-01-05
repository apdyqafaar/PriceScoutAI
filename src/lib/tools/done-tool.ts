import { createTool } from "@inngest/agent-kit";
import z from "zod";
import { closeDb, connectDB } from "../db/connection";
import productSearch from "@/models/productSearch";

export const doneTool=createTool({
    name:"completed",
    description:"Use this tool if everything is ok",
    parameters:z.object({
        note:z.string().describe("why you completed and make it done that every thing is ok"),
        completed:z.boolean()
    }),
    handler:async(input, {network, step})=>{
      const approved=input.completed
      network.state.data.approved=approved
      
        await step?.run("saving_to_db", async()=>{
          try {
               const runId=network.state?.data.runId as string
               if(runId){
                 await connectDB()
               await productSearch.findOneAndUpdate(
                 {runId},
                 {
                   $set:{
                     progress:100,
                     completedReason:input.note,
                     status:"completed"
                   }
                 }
               )
         
              //  await closeDb()
         
               }else{
                 console.error("No runId in Network")
                throw new Error("No runId in Network")
             }
               } catch (error) {
                 console.error("Error at completed: ", error)
                 throw error
               }
        })
    }
})