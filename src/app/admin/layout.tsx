import AdminGate from "@/components/admin/AdminGate";
import { AppSidebar } from "@/components/admin/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { HydrateClient, trpc } from "@/trpc/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ocaz - Admin Dashboard",
  description: "Movie Ticket Booking Admin Dashboard",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await trpc.admin.me.prefetch();
  } catch {}

  return (
    <HydrateClient>
      <AdminGate>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="flex flex-1 flex-col overflow-hidden">
              <div className="flex-1 mx-auto max-w-360 p-4 sm:p-6 lg:p-8  w-full">{children}</div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </AdminGate>
    </HydrateClient>
  );
}
