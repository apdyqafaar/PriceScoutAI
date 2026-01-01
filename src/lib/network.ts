import { createNetwork, createRoutingAgent, openai } from "@inngest/agent-kit";
import { routeAgentTool } from "./tools/route";
import { doneTool } from "./tools/done-tool";
import { linksAnalyzer, moderatorAgent, productSearcher } from "./agents";


export const supervisor=createRoutingAgent({
    name:"supervisor",
    description:"Ai supervisor that orchestrates the product prices always get lower by lower price",
  system: ({ network }) => {
  const products = network?.state?.data?.products || [];
  const rankedProducts = network?.state?.data?.rankedProducts || [];
  const approved = network?.state?.data?.approved;


  let agents=Array.from(network?.agents.values()||[])

  return `You are the SUPERVISOR agent.

Your role is to orchestrate the product price analysis workflow
and ensure rankings always prioritize LOWER prices.

────────────────────────────────
**Your Job:**
1. Analyze the current workflow state.
2. Decide which agent should run next to progress the workflow.
3. Use the route_to_agent tool to select EXACTLY ONE agent.
4. Use the completed tool ONLY when all steps are completed and content is approved.
────────────────────────────────

**Available Agents:**
- product-searcher: Finds product listing links.
- links-analyzer: Analyzes products and ranks them by lowest price.
- moderator: Validates ranked results and approves or rejects them.

────────────────────────────────
**Current State:**

1. products (raw product links):
${JSON.stringify(products, null, 2)}

2. rankedProducts (ranked output):
${JSON.stringify(rankedProducts, null, 2)}

3. approved (moderator decision):
${JSON.stringify(approved, null, 2)}

────────────────────────────────
**Workflow Logic (route to EXACTLY ONE agent):**

1. If NO products exist:
   → route to product-searcher

2. If products exist AND NO rankedProducts exist:
   → route to links-analyzer

3. If rankedProducts exist AND approved is NOT true:
   → route to moderator

4. If approved === true:
   → end workflow and call completed tool

────────────────────────────────
**Rules:**
- Do NOT modify product data.
- Do NOT change ranking positions.
- Do NOT reorder rankedProducts.
- Do NOT fabricate or infer prices.
- Do NOT call tools other than route_to_agent or completed.
- This agent ONLY coordinates execution order.

────────────────────────────────
**Success Criteria:**
- All products are processed.
- Rankings prioritize lowest price.
- Moderator approval is required.
- Workflow ends ONLY after approval.
`
    },
   model:openai({model:"gpt-5-mini"}),
   tool_choice:"auto",
   tools:[
   routeAgentTool,
   doneTool
   ],
    lifecycle:{
     onRoute:({result})=>{
        if(!result.toolCalls || result.toolCalls.length===0) return undefined
        const tool=result.toolCalls[0]

        if(tool.tool.name==="completed"){
            return undefined
        }

        if(tool.tool.name==="route_to_agent"){
            const agentName=(tool.content as any)?.data || (tool.content as string)
            console.log("agent name: ", agentName)
            return [agentName]
        }

        return undefined
     }
    }
})



export const agentNetwork=createNetwork({
  name:"Price_scoter",
  description:"Multi-agent system for getting lowest price of product links that user search on the internet",
  agents:[
    productSearcher,
    linksAnalyzer,
    moderatorAgent
  ],
  router:supervisor,
  maxIter:20
})