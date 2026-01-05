import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge";

const ProgressDataComponent = ({data}:{data:any}) => {
  return (
    <div>
        <Label htmlFor="email" className="mb-6 pl-2 text-muted-foreground ">Progress Info:</Label>

        {/* agents info */}
      {/* Project Status */}
<div className="space-y-4  mb-6rounded-xl border border-black/5 bg-white/70 backdrop-blur-md px-5 shadow-sm">
 

  {/* Current State */}
  <div className="flex items-center justify-between">
    <p className="text-sm text-slate-600">Current State</p>
      <Badge
  className={
    data?.productSearchData?.status=== "completed"
      ? "bg-green-600 text-white"
      : data?.productSearchData?.status=== "failed"
      ? "bg-red-600  text-red-700 border border-red-200"
      : "bg-yellow-100 text-yellow-700 border border-yellow-200"
  }
>
  {data?.productSearchData?.status|| "pending"}
</Badge>
  </div>

  {/* Products Found */}
  <div className="flex items-center justify-between">
    <p className="text-sm text-slate-600">Products Found</p>
    <Badge className="bg-slate-100 text-slate-700 border border-slate-200">
    {
        data?.productSearchData?.onganics.length>0?(
            <>{data?.productSearchData?.onganics.length}</>
        ):(
            <><Loader2 className="w-4 h-4 animate-spin"/></>
        )
    }
    </Badge>
  </div>

  {/* Ranking */}
  <div className="flex items-center justify-between">
    <p className="text-sm text-slate-600">Ranking</p>
    <Badge className="bg-blue-100 text-blue-700 border border-blue-200">
        {
        data?.rankedProducts?.length>0?(
            <>{data?.rankedProducts?.length}</>
        ):(
            <><Loader2 className="w-4 h-4 animate-spin"/></>
        )
    }
    </Badge>
  </div>

  {/* Moderator */}
  <div className="flex items-center justify-between mb-4">
    <p className="text-sm text-slate-600">Moderator Review</p>
    <Badge className="bg-green-100 text-green-700 border border-green-200">
        {
        data?.productSearchData?.completedReason?(
            "done "
        ):(
            <><Loader2 className="w-4 h-4 animate-spin"/></>
        )
    }
    </Badge>
  </div>

  {/* Final data */}
  {
     data?.productSearchData?.status ==="completed"&&(
       <div className="flex items-center justify-between border-t border-black/5 pt-3 mb-3">
    <p className="font-medium text-slate-900">Project Result</p>
    <Badge className="bg-green-200 text-green-800 border border-green-300">
      Project Completed
    </Badge>
  </div> 
     )
  }
  

</div>
</div>
  )
}

export default ProgressDataComponent