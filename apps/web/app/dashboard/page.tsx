import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { auth } from "@/lib/auth"
import { FolderInput, Plus } from "lucide-react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function DashboardPage(){
     const session = await auth.api.getSession({
            headers: await headers()
    })

    if(!session){
        return redirect("/")
    }

    return (
        <div className="w-[70%] flex flex-col justify-start mt-20">
           <div className="w-full h-20 flex justify-between items-center">
                <h2 className="font-bold text-3xl">Home</h2>
                <div className="flex gap-3">
                    <Button variant="secondary">
                        <FolderInput size={6}/>
                        New Workspace
                    </Button>
                   <Button variant="default">
                        <Plus size={6}/>
                        New form
                   </Button>
                </div>
           </div>
           <Separator/>
        </div>
    )
}