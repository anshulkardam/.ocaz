"use client";

import { PageHeader } from "@/components/admin/page-header";
import { StatsCard } from "@/components/admin/stats-card";
import { Card } from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import { UserButton } from "@clerk/nextjs";
import { ArrowUpRight, BellIcon, Building2, Film, Users } from "lucide-react";

export default function AdminPage() {
  const { data, error, isLoading } = trpc.admin.me.useQuery();

  if (isLoading) return <div>Loading admin data...</div>;

  if (error) {
    return <div className="p-6 text-red-600">{error.message}</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-600">Admin not found.</div>;
  }

  const stats = [
    {
      title: "Total Revenue",
      value: "$125,430",
      change: "+12.5% from last month",
      icon: ArrowUpRight,
      positive: true,
    },
    {
      title: "Active Cinemas",
      value: "1,204",
      change: "+3.2% from last month",
      icon: Building2,
      positive: true,
    },
    {
      title: "Total Users",
      value: "48,392",
      change: "+8.1% from last month",
      icon: Users,
      positive: true,
    },
    {
      title: "Movies Listed",
      value: "5,120",
      change: "+2.4% from last month",
      icon: Film,
      positive: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-start justify-between">
        <PageHeader
          title={`Hi, ${data.User.name}`}
          description="Here's what's happening with your cinema network."
        />

        <UserButton />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            positive={stat.positive}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-effect p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors gap-2"
              >
                <div>
                  <p className="text-sm font-medium">The Matrix Reloaded</p>
                  <p className="text-xs text-muted-foreground">Cinema {i} - 12 tickets</p>
                </div>
                <span className="text-sm font-semibold text-accent shrink-0">
                  ${(i * 120).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-effect p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Today&apos;s Revenue</p>
              <p className="text-xl font-bold">$8,420</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Pending Orders</p>
              <p className="text-xl font-bold">24</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Active Sessions</p>
              <p className="text-xl font-bold">1,230</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
