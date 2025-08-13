"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { SidebarMenuButton } from "./ui/sidebar"
import { ChevronDown, LogOut } from "lucide-react"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"

interface UserMenuTypes {
    name: string;
    image: string | null;
}

export function UserMenu({name, image}:UserMenuTypes){
    const router = useRouter();

    async function logoutFn(){
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                router.push("/signin");
                },
            },
        });
    }

    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <Avatar>
                        <AvatarImage src={image as string} />
                        <AvatarFallback>{name.slice(0,1)}</AvatarFallback>
                    </Avatar>
                    {name}
                    <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem>
                    <Link href="/dashboard">
                        Home
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full text-right">
                    <button onClick={logoutFn} className="w-full flex gap-x-3 items-center">
                        <LogOut className="size-4"/>
                        Logout
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}