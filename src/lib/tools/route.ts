import { createTool } from "@inngest/agent-kit";
import z from "zod";

export const routeAgentTool=createTool({
    name:"route_to_agent",
    description:"Route to next agent ",
    parameters:z.object({
        agent_name:z.string().describe("The name of the agent to route"),
        reasoning:z.string().describe("The reason that you are routing")
    }),

    handler:({agent_name,reasoning}, {network})=>{
       if(!network)throw new Error("Network not found")

        console.log("reasoning: ", reasoning)


        const agent =network.agents.get(agent_name)
        if(!agent) throw new Error(`This current "${agent_name}" agent not found`)

        return agent.name
    }
})



export const doneTool=createTool({
    name:"done", 
    description:"Call to the that workflow is done",
    parameters:z.object({
         reasoning:z.string().describe("The reasoning fot the completing the workflow")
    }),

    handler:({reasoning})=>{
     console.log("Supervisor: workflow has done with reasoning of:", reasoning)
     return undefined
    }

})