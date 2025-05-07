import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import {
    House, User, Settings, LogOut
} from "lucide-react"

const menu = [
    {
        title: "Home",
        url: "/",
        icon: House
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings
    },
    { 
        title: "Logout",
        url: "/logout",
        icon: LogOut
    }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Black Book</SidebarGroupLabel>
            <SidebarContent>
                <SidebarMenu>
                    {menu.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                <item.icon/>
                                <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        )
                    )}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}