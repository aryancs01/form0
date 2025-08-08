import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/db";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword:{
        enabled:true
    },
    plugins:[emailOTP({
        async sendVerificationOTP({ email, otp}){
            await resend.emails.send({
                from: 'Aryan <noreply@aryansaxena.me>',
                to: [email],
                subject: 'form0 - Verify your email',
                html:`Your OTP is <strong>${otp}</strong>`
            });
        }
    })]
});