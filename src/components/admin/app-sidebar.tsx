"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Building2,
  Film,
  Users,
  UserCheck,
  Clapperboard,
  ChevronDown,
  ReceiptCent,
  ReceiptIndianRupee,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Image from "next/image";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Cinemas",
      icon: Building2,
      items: [
        {
          title: "Manage Cinemas",
          url: "/admin/cinemas",
        },
        {
          title: "Create Cinema",
          url: "/admin/cinemas/create",
        },
      ],
    },
    {
      title: "Movies",
      icon: Film,
      items: [
        {
          title: "Manage Movies",
          url: "/admin/movies",
        },
        {
          title: "Create Movie",
          url: "/admin/movies/create",
        },
      ],
    },
    {
      title: "Showtimes",
      icon: Film,
      items: [
        {
          title: "Manage Shows",
          url: "/admin/showtimes",
        },
        {
          title: "Create Shows",
          url: "/admin/showtimes/create",
        },
      ],
    },
    {
      title: "Manage Bookings",
      url: "/admin/bookings",
      icon: ReceiptIndianRupee,
    },
    {
      title: "Manage Admins",
      url: "/admin/admins",
      icon: Users,
    },
    {
      title: "Manage Managers",
      url: "/admin/managers",
      icon: UserCheck,
    },
  ];

  return (
    <Sidebar className="border-r border-white/10 glass-effect">
      <SidebarHeader className="border-b border-white/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 gap-2 pl-3" asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <Image
                  src={"/logo.svg"}
                  alt="logo"
                  height={100}
                  width={100}
                  className="object-center"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black/60">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.items) {
                  // Collapsible menu item
                  const isOpen = item.items.some((subItem) => pathname === subItem.url);
                  return (
                    <Collapsible
                      key={item.title}
                      defaultOpen={isOpen}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                  className={
                                    pathname === subItem.url ? "bg-primary/20 text-primary" : ""
                                  }
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                // Regular menu item
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className={pathname === item.url ? "bg-primary/20 text-primary" : ""}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
