import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/app-sidebar"
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Book Social Media",
  description: "For the foodies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html>
          <body className={"antialiased"}>
            <SidebarProvider>
              <AppSidebar/>
              <SidebarTrigger>
                {children}
              </SidebarTrigger>
            </SidebarProvider>
          </body>
        </html>
  );
}
