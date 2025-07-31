import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  TestTube,
  Brain,
  BarChart,
  Settings,
  ChevronDown,
  ChevronRight,
  Activity
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    submenu: null,
  },
  {
    title: "Rubrics",
    url: "/rubrics",
    icon: BookOpen,
    submenu: [
      { title: "Browse All Rubrics", url: "/rubrics/browse" },
      { title: "My Rubrics", url: "/rubrics/my" },
      { title: "Create New", url: "/rubrics/create" },
      { title: "Review Submission", url: "/rubrics/review" },
      { title: "Archived", url: "/rubrics/archived" },
    ],
  },
  {
    title: "Benchmark Cases",
    url: "/benchmark-cases",
    icon: Brain,
    submenu: [
      { title: "Browse All Cases", url: "/benchmark-cases/view" },
      { title: "Versioning & Audits", url: "/benchmark-cases/audits" },
    ],
  },
  {
    title: "Test Cases",
    url: "/test-cases",
    icon: TestTube,
    submenu: [
      { title: "Run LLM Evaluation", url: "/test-cases/run" },
      { title: "Upload Case Data", url: "/test-cases/upload" },
      { title: "Manage Test Sets", url: "/test-cases/manage" },
    ],
  },
  
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart,
    submenu: [
      { title: "Performance Trends", url: "/analytics/trends" },
      { title: "Agreement Metrics", url: "/analytics/metrics" },
      { title: "Reviewer Stats", url: "/analytics/stats" },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    submenu: [
      { title: "User Preferences", url: "/settings/preferences" },
      { title: "Export/Import", url: "/settings/export" },
      { title: "System Logs", url: "/settings/logs" },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (item: any) => {
    if (isActive(item.url)) return true;
    if (item.submenu) {
      return item.submenu.some((sub: any) => isActive(sub.url));
    }
    return false;
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const getNavCls = (active: boolean) =>
    active
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium"
      : "hover:bg-muted/70 text-muted-foreground hover:text-foreground";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent className="bg-card border-r border-border">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-sm text-foreground">
                  Rubrics Manager
                </h2>
                <p className="text-xs text-muted-foreground">
                  Healthcare LLM Evaluation
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => {
                  const isExpanded = expandedItems.includes(item.title);
                  const hasSubmenu = item.submenu && item.submenu.length > 0;
                  const groupActive = isGroupActive(item);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild={!hasSubmenu}
                        className={getNavCls(groupActive)}
                      >
                        {hasSubmenu ? (
                          <button
                            onClick={() => toggleExpanded(item.title)}
                            className="w-full flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <item.icon className="h-4 w-4" />
                              {!collapsed && <span>{item.title}</span>}
                            </div>
                            {!collapsed && hasSubmenu && (
                              <span className="ml-auto">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </span>
                            )}
                          </button>
                        ) : (
                          <NavLink to={item.url} className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {!collapsed && <span>{item.title}</span>}
                          </NavLink>
                        )}
                      </SidebarMenuButton>

                      {hasSubmenu && isExpanded && !collapsed && (
                        <SidebarMenuSub>
                          {item.submenu?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={getNavCls(isActive(subItem.url))}
                              >
                                <NavLink to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </NavLink>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}