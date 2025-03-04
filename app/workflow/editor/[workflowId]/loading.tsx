import { Loader2Icon } from "lucide-react"

function loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Loader2Icon size={30} className="animate-spin"/>
    </div>
  )
}

export default loading