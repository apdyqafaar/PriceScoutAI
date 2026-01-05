"use client"

import { Loader2, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface FormComponentProps{
    input:string,
    setInput:(value:string)=> void,
    onRun:()=> void,
    loading:boolean
}
const FormComponent = ({input, setInput, loading, onRun}:FormComponentProps) => {
  return (
    <div className="py-10">
        <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
  Price Scout Agent
</h3>

<p className="[&:not(:first-child)]:mt-2 max-w-2xl text-sm text-muted-foreground">
  Price Scout Agent helps you find products at the lowest available price across
  trusted online stores. Simply search for a product, and the agent scans multiple
  sources, compares prices, and ranks results so you can quickly choose the best deal.
</p>
        </div>

        <form onSubmit={(e)=>{
          e.preventDefault()
          onRun()
        }} className="my-5 max-w-xl flex items-center gap-3 text-base">
            <Input value={input} onChange={(e)=> setInput(e.target.value)} placeholder="Search any product...."/>
            <Button type="submit" disabled={!input.trim() || loading} variant={"default"} className="cursor-pointer">{loading?<Loader2 className="w-4 h-4 animate-spin"/> :<Search className="w-4 h-4"/>}</Button>
        </form>
    </div>
  )
}

export default FormComponent