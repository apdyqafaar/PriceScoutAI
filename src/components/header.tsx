import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from 'lucide-react';

const Header = () => {
  return (
    <div className="h-17 border-b border-border px-5">
        <div className="flex h-full justify-between items-center">
            <h1 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-primary/60">PriceScoutAI</h1>

            <Avatar>
  <AvatarFallback className="bg-gray-200"><User className="w-4 h-4"/></AvatarFallback>
</Avatar>
        </div>
    </div>
  )
}

export default Header