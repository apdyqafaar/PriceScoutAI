"use client"

import { useState } from "react"
import FormComponent from "./form/formComponent"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import DataComponent from "./data-representing/data"
import { AgentIdleState } from "./idleState"

const MainDataComponent = () => {
    const [input, setInput]=useState<string>("")
    const [runId, setRunId]=useState<string>("")
    const [loading, setLoading]=useState(false)

   

    const {data:DataResult}=useQuery({
      queryKey:['Results', runId],
      queryFn:async()=>{
        const res=await axios.get(`/api/getResults/${runId}`)
        return res.data
      },
      enabled:!!runId,
      refetchInterval:(query)=>{
        let data=query.state.data
       if(data?.productSearchData
.status==="completed"|| data?.productSearchData
.status==="failed"){
        return false
       }

       return 2000
      }
    })

 const handleRun=async()=>{
     
      try {
         if(!input.trim() && DataResult.productSearchData.status==="running")return
        setLoading(true)
           
           const res=await axios.post("/api/runnAgent",{input})
       console.log("response: ", res.data)
       const id=res.data?.runId as string
       if(id){
        setRunId(id)
       }
      } catch (error) {
        console.error("Failed to run the agents: ", error)
      alert("Failed to get results")
      }finally{
        setLoading(false)
      }

       
    }
    console.log("DataResult: ", DataResult)
  return (
    <div className="px-4">
        <FormComponent input={input} onRun={handleRun} setInput={setInput} loading={loading}/>
        {
          !DataResult?(
  <AgentIdleState/>
          ):(
            <DataComponent data={DataResult}/>
          )
        }
      
    </div>
  )
}

export default MainDataComponent