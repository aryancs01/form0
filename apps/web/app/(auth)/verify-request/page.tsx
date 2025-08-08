"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";

export default function VeriflyRequestRoute(){
    return (
        <Suspense>
            <VerifyRequest/>
        </Suspense>
    )
}

function VerifyRequest(){
    const [otp,setOTP] = useState("")
    const [emailPending,startEmailTransition] = useTransition();
    const redirect = useRouter();
    const params = useSearchParams();
    const email = params.get('email') as string
    const  isOtpCOmpleted = otp.length === 6;

    function verifyOTP(){
        startEmailTransition(async()=>{
            await authClient.signIn.emailOtp({
                email:email,
                otp:otp,
                fetchOptions:{
                    onSuccess:()=>{
                        toast.success("Email Verified")
                        redirect.push("/")
                    },
                    onError:()=>{
                        toast.error("OTP is incorrect!")
                    }
                }
            })
        })
    }
    return (
        <Card className="w-full mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Please check your email</CardTitle>
                <CardDescription>We have sent a verification email code to your email address. Please open the email and paste the code below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP value={otp}
                    onChange={(value)=>setOTP(value)}
                    maxLength={6} className="gap-2">
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3}/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6 digit code sent to your email</p>
                </div>

                <Button
                onClick={verifyOTP}
                disabled={emailPending || !isOtpCOmpleted}
                className="w-full">
                    {emailPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin"/>
                            <span>Loading...</span>
                        </>
                    ):(
                        <>
                            Verify Account
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}