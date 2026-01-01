


type OrganicResult = {
  title: string;
  link: string;
  source?: string;
  position: number;
  price?:string,
  imageUrl?:string,
  rating?:number,
};
export const FormatResultToProductDetailes= async(data:any)=>{
  let productFound=data.shopping as OrganicResult[]
    let products:OrganicResult[]=[]
   
   
    if(productFound){
      productFound.map((pro: any)=>{
       products.push({
        title:pro.title ||"",
        link:pro.link || "",
        source:pro.source || "",
        imageUrl:pro.imageUrl || "",
        price:pro.price || "",
        position:pro.position || 0,
        rating:pro.rating || 0,
      
       })
      })
    }
    console.log("products: ", products)
    return products

     

}

