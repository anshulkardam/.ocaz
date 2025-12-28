"use client";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Plus, Search, Loader2, AlertCircle } from "lucide-react";
import CinemaCard from "@/components/cinemas/cinema-card";

export default function CinemasManagement() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cinemas = [], isLoading } = trpc.cinemas.list.useQuery();

  return (
    <div className=" p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Cinema Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage all cinema locations and screens
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/cinemas/create")}
            size="lg"
            className="gap-2 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Add Cinema
          </Button>
        </div>

        {/* Search */}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by cinema name, location, or manager..."
            className="pl-10 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Cinemas List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : cinemas.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center space-y-3">
                <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  No cinemas found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Get started by adding your first cinema"}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => router.push("/admin/cinemas/create")}
                    className="mt-4 gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Cinema
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cinemas.map((cinema) => (
              <CinemaCard
                key={cinema.id}
                cinema={cinema}
                onView={(id) => router.push(`/admin/cinemas/${id}`)}
                onEdit={(id) => router.push(`/admin/cinemas/${id}/edit`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
