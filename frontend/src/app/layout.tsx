import type { Metadata } from "next";
import { SidebarWrapper } from "../components/layout/sidebar-wrapper"
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Book Social Media",
  description: "For the foodies.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html>
          <body className={"antialiased"}>
            <SidebarProvider>
              <SidebarWrapper/>
                  {children}
            </SidebarProvider>
            <Toaster/>
          </body>
        </html>
  );
}
