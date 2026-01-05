import { Card } from "@/components/ui/card";
import {  Search, Sparkles } from "lucide-react";

export function AgentIdleState() {
  return (
    <Card className="relative flex flex-col items-center justify-center gap-4 rounded-xl border border-black/5 bg-white/70 backdrop-blur-md p-10 shadow-sm">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-100/60 to-indigo-100/60 blur-2xl" />

      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        {/* Icon */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Search className="h-7 w-7" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-900">
          Ready to Find the Best Price
        </h3>

        {/* Description */}
        <p className="max-w-sm text-sm text-slate-600">
          Our AI agents are standing by.  
          Start by searching for a product and we’ll scan trusted stores to find
          the lowest available price.
        </p>

        {/* Running indicator */}
         <div className="mt-4 flex flex-col items-center gap-4">
  {/* Spark message */}
  <div className="flex items-center gap-2 rounded-full bg-pink-100/10 px-4 py-2 text-sm text-pink-600">
    <Sparkles className="h-4 w-4" />
    Ready to find the best deal
  </div>
</div>
      </div>
    </Card>
  );
}
