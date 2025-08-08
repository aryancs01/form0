"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Signup(){
    const [email, setEmail] = useState("");
    const [githubPending, setGithubTransition] = useTransition();
    const [googlePending, setGoogleTransition] = useTransition();
    const [emailPending, startEmailTransition] = useTransition();
    const router = useRouter()

    function signInGithub(){
        setGithubTransition(async()=>{
            await authClient.signIn.social({
                provider: "github",
                callbackURL:"/dashboard",
                fetchOptions:{
                    onSuccess:()=>{
                        toast.success('Signed in with Github, you will be redirected...')
                    },
                    onError:()=>{
                        toast.error("Internal Server Error")
                    }
                }
            })
        })
    }

    function signInWithEmail(){
        startEmailTransition(async()=>{
            await authClient.emailOtp.sendVerificationOtp({
                email:email,
                type:"sign-in",
                fetchOptions:{
                    onSuccess:()=>{
                        toast.success('Email sent')
                        router.push(`/verify-request?email=${email}`)
                    },
                    onError:()=>{
                        toast.error('Error Sending Email')
                    }
                }
            })
        })
    }

    function signInGoogle(){
        setGoogleTransition(async()=>{
            await authClient.signIn.social({
                provider: "google",
                callbackURL:"/dashboard",
                fetchOptions:{
                    onSuccess:()=>{
                        toast.success('Signed in with Google, you will be redirected...')
                    },
                    onError:()=>{
                        toast.error("Internal Server Error")
                    }
                }
            })
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>use your email to create an account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-3">
                <Input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="email@gmail.com"/>
                <Button onClick={signInWithEmail} disabled={emailPending}>
                    {emailPending ? <><Loader className="animate-spin size-4"/>Loading</> : "Continue"}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>

                <Button disabled={googlePending} variant="secondary" onClick={signInGoogle} className="cursor-pointer">
                    <FcGoogle/>
                    Google
                </Button>
                
                <Button disabled={githubPending} className="cursor-pointer" onClick={signInGithub} variant="secondary">
                    <FaGithub/>
                    Github
                </Button>
            </CardContent>
        </Card>
    )
}