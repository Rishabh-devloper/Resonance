import { OrganizationSwitcher , UserButton } from "@clerk/nextjs";

export default function Home(){
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <h1 className="text-2xl font-semibold text-amber-500">
                Welcome To Resonance
            </h1>
            <div className=" flex items-center gap-4">
                <OrganizationSwitcher/>
                <UserButton/>
            </div>
        </div>
    )
}