import productSearch from "@/models/productSearch";
import RankedProduct from "@/models/priceAnalysis"
import { NextRequest, NextResponse } from "next/server";

export const GET=async(req:NextRequest, {params}:{params:Promise<{runId:string}>})=>{
  
    try {
        const {runId}=await params
        if(!runId){
         return NextResponse.json({message:"runId is required"},{status:400})
        }

        
        const productSearchData=await productSearch.findOne({runId})
        const rankedProductData=await RankedProduct.findOne({runId})
        const productsData={
             productSearchData,
             rankedProducts:rankedProductData?.rankedProducts || []
        }

        return NextResponse.json(productsData, {status:200})
        
    } catch (error) {
          console.log("Internal server error at get results: ", error)
         return NextResponse.json({message:"Internal server error"},{status:501})
    }
}