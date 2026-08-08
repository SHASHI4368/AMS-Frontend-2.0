import * as React from "react"
import { cn } from "@/lib/utils"

export function Switch({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input 
      type="checkbox" 
      className={cn(
        "h-5 w-9 appearance-none rounded-full bg-input checked:bg-primary transition-colors cursor-pointer relative",
        "after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-transform after:shadow-sm",
        "checked:after:translate-x-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )} 
      {...props} 
    />
  )
}
