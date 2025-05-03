"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "../app-sidebar";
import { SidebarTrigger } from "../ui/sidebar";

// update this as you add more 
const sidebarPaths = ["/home", "/profile", "/settings"];

export function SidebarWrapper() {
  const pathname = usePathname();

  const shouldShowSidebar = sidebarPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (!shouldShowSidebar) return null;

  return (
    <>
      <AppSidebar />
      <SidebarTrigger />
    </>
  );
}
