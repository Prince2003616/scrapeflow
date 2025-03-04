import { BreadcrumbHeader } from "@/components/BreadcrumbHeader";
import DesktopSidebar from "@/components/Side-Bar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="flex gap-x-2 items-center">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        
        <Separator />

        {/* Content Area */}
        <div className="flex-1 h-full overflow-y-auto">
          <div className="container py-4 text-accent-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
