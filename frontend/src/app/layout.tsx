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
              <div className="w-64 flex-shrink-0">
                <SidebarWrapper/>
              </div>
              <div className="flex-grow overflow-y-auto">
                  {children}
              </div>
            </SidebarProvider>
            <Toaster/>
          </body>
        </html>
  );
}
