"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"
import { 
    Sidebar ,
    SidebarContent ,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger

} from "@/components/ui/sidebar"

import { Skeleton } from "@/components/ui/skeleton"
import { OrganizationSwitcher , UserButton, useClerk } from "@clerk/nextjs"
import Link from "next/link"
import{
    Home,
    LayoutGrid,
    AudioLines,
    Volume2,
    Settings,
    Headphones
} from "lucide-react"
 
interface MenuItem{
    title: string;
    url?: string;
    icon: any;
    onClick?: () => void;
}

interface NavSectionProps{
    label?: string;
    items: MenuItem[];
    pathname: string;
}
function NavSection({label, items, pathname}: NavSectionProps){
    return(
        <SidebarGroup>
            {label&& (
                <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">
                    {label}
                </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item)=>(
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                                asChild={!!item.url} 
                                isActive={
                                    item.url?
                                    item.url === "/"
                                    ?pathname === "/"
                                    :pathname.startsWith(item.url)
                                    :false
                                }
                                onClick={item.onClick}
                                tooltip={item.title}
                            >
                                {item.url?(
                                    <Link href={item.url}>
                                        <item.icon/>
                                        <span>{item.title}</span>
                                    </Link>):(
                                        <>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </>
                                    )}
                            </SidebarMenuButton>

                        </SidebarMenuItem>

                    ))}
                </SidebarMenu>
            </SidebarGroupContent>

        </SidebarGroup>
    )
}

export default function DashboardSidebar(){
    const pathname = usePathname();
    const clerk = useClerk();
    const mainMenuItems: MenuItem[]=[
       {
           title: "Dashboard",
           url: "/dashboard",
           icon: Home
       },
       {
            title:"Explore voices",
            url:"/voices",
            icon: LayoutGrid

       },
       {
            title:"Text to speech",
            url:"/text-to-speech",
            icon: AudioLines    
       },
       {
            title:"Voice Cloning",
            icon: Volume2,    
       }
    ];
    const otherMenuItems: MenuItem[]=[
        {
            title:"Settings",
            url:"/settings",
            icon: Settings
        },
        {
            title:"Help and Support",
            url:"mailto:mrishabh9198@gmail.com",
            icon: Headphones
        },
    ]
    return(
        <Sidebar collapsible="icon">
            <SidebarHeader className="flex flex-col gap-4 pt-4">
                <div className="group flex items-center gap-2 pl-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0 ">
                    <Image
                        src="/logo.svg"
                        alt="Resonance Logo"
                        width={24}
                        height={24}
                        className="rounded-sm"
                    />
                    <span className="text-lg tracking-tighter text-foreground font-semibold group-data-[collapsible=icon]:hidden">
                        Resonance
                    </span>
                    <SidebarTrigger className="ml-auto"/>
                </div>

            </SidebarHeader>
            <SidebarContent>
                <NavSection label="Main" items={mainMenuItems} pathname={pathname}/>
                <NavSection label="Other" items={otherMenuItems} pathname={pathname}/>
            </SidebarContent>
        </Sidebar>
    )
}