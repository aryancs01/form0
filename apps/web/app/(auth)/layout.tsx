import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({children}:{children:React.ReactNode}){
    return (
        <div className="relative min-h-svh flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4">
                <Link className={buttonVariants({
                    variant:"outline"
                })} href={"/"}> <ArrowLeft/> Back</Link>
            </div>
            <div className="w-full max-w-sm flex flex-col gap-6">
                <Link 
                className="flex items-center gap-2 self-center font-medium"
                href="/">
                <Image
                    width={32}
                    height={32}
                    quality={100}
                    src="/logo.svg"
                    alt="Logo"
                    className="rounded-md"
                />
                    Form0
                </Link>
                {children}
                <div className="text-balance text-center text-muted-foreground text-xs">
                    By clicking continue, you agree to our <Link className="hover:text-blue-500 hover:underline" href="/">Terms of services</Link> and <Link className="hover:text-blue-500 hover:underline" href="/">Privacy Policy</Link>
                </div>
            </div>
        </div>
    )
}