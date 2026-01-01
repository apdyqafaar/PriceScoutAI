import { agentNetwork } from "@/lib/network";
import { inngest } from "./inngest";

export const priceScoter=inngest.createFunction(
    {id:"price-scoter"},
    {event:"ai.agents/run"},
    async({event})=>{
        const runId=event.data.runId
        const input=event.data.input
    //    console.log("Input user: ", input)
        try {
            const result=await agentNetwork.run(input, {
                state:{
                    data:{
                       runId  
                    }
                }
            })

            return{
                success:true,
                result:result.state.data
            }
        } catch (error) {
            console.error("Error at the inngest functions: ", error)
        }
    }
)