import { auth } from "@/lib/auth";
import { Signup } from "../_components/Signin";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignupPage(){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session){
        return redirect("/")
    }

    return (
        <div className="">
            <Signup/>
        </div>
    )
}