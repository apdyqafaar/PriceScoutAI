import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LinksComponent = ({data}:{data:any}) => {
    const links=data?.rankedProducts.length>0?data?.rankedProducts:data?.productSearchData?.onganics 

  return (
   <div className="space-y-4 h-[600px] overflow-y-auto">
  <h4 className="text-lg font-semibold text-slate-900">
    Products Found
  </h4>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
    {links.map((product: any, index:number) => (
      <Card
        key={index}
        className="border border-black/5 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition"
      >
        <CardHeader className="flex flex-row gap-4 items-start">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-16 w-16 rounded-md object-contain border"
            />
          ) : (
            <div className="h-16 w-16 rounded-md bg-slate-100" />
          )}

          <div className="flex-1 space-y-1">
            <CardTitle className="text-base leading-snug">
              {product.title}
            </CardTitle>

            <p className="text-sm text-slate-500">
              {product.source}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Price</span>
            <Badge className="bg-green-100 text-green-700 border border-green-200">
              {product.price ?? "N/A"}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Rating</span>
            <span className="text-sm font-medium text-slate-800">
              {product.rating ? `⭐ ${product.rating}` : "—"}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <Badge variant="outline">
            Rank #{product.position}
          </Badge>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View Product →
          </a>
        </CardFooter>
      </Card>
    ))}
  </div>
</div>
  )
}

export default LinksComponent