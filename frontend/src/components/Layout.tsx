import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Activity } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="hover:bg-muted" />
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Rubrics Manager</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  Healthcare LLM Evaluation Platform
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}