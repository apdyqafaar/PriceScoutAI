import { inngest } from "@/inngest/inngest";
import { connectDB } from "@/lib/db/connection";
import productSearch from "@/models/productSearch";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{
   try {
    
      const body=await req.json()
      const {input}=body
      if(!input){
          console.error("Input is required")
         return NextResponse.json({message:"Input is required"},{status:401}) 
      }

      // generating runId
      const runId=nanoid()
      try {
         await connectDB()
         await productSearch.create({
            runId,
            UserQuery:input
            
         })
      } catch (dbError) {
          console.log("Error at creating the result collection")
          throw dbError
      }


      // running inngets functions
      await inngest.send({
         name:"ai.agents/run",
          data:{
            input,
            runId
          }
      })


      // user cant wait so we can return response to tell the agent was run!
       return NextResponse.json({
         status:"running",
         input,
         runId,
         message:"Agents are running in background"
      },{status:201})


   } catch (error) {
    console.log("Internal server error: ", error)
    return NextResponse.json({message:"Internal server error"},{status:501})
   }
}