import { SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation";
import axios from "axios";

export default async function SidebarLogoutButton() {
    const router = useRouter();
    async function logout() {
        try {
            await axios.get("http://localhost:4000/api/logout");
            router.push("/login")
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <SidebarMenuItem key={"logout"}>
            <SidebarMenuButton onClick={() => logout()} asChild>
                <LogOut/>
                <span>Log out</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}