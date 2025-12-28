"use client";
import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Film,
  Plus,
  Calendar as CalIcon,
  Clock,
  Building2,
  Monitor,
  Search,
  Edit,
  Trash2,
  AlertCircle,
  Loader2,
  CheckCircle,
  PauseCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function ShowtimesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCinema, setFilterCinema] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState<Date>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showtimeToDelete, setShowtimeToDelete] = useState<string | null>(null);

  // Queries
  const { data: cinemas, isLoading: cinemasLoading } = trpc.cinemas.list.useQuery();
  const { data: stats, isLoading: statsLoading } = trpc.showtimes.getStats.useQuery();
  const {
    data: showtimes,
    isLoading: showtimesLoading,
    refetch,
  } = trpc.showtimes.list.useQuery({
    cinemaId: filterCinema !== "all" ? filterCinema : undefined,
    status: filterStatus !== "all" ? (filterStatus as any) : undefined,
    date: filterDate ? format(filterDate, "yyyy-MM-dd") : undefined,
    searchQuery: searchQuery || undefined,
  });

  // Mutations
  const deleteMutation = trpc.showtimes.delete.useMutation({
    onSuccess: () => {
      toast.success("Showtime deleted successfully");
      refetch();
      setDeleteDialogOpen(false);
      setShowtimeToDelete(null);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete showtime");
    },
  });

  const getStatusBadge = (status: string) => {
    const config = {
      ACTIVE: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      POSTPONED: { variant: "secondary" as const, icon: PauseCircle, color: "text-yellow-600" },
      CANCELLED: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    };

    const { variant, icon: Icon, color } = config[status as keyof typeof config] || config.ACTIVE;

    return (
      <Badge variant={variant} className="gap-1">
        <Icon className={`w-3 h-3 ${color}`} />
        {status}
      </Badge>
    );
  };

  const handleDelete = async () => {
    if (!showtimeToDelete) return;
    await deleteMutation.mutateAsync({ id: showtimeToDelete });
  };

  if (cinemasLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Showtime Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Schedule and manage movie showtimes
            </p>
          </div>
          <Button
            onClick={() => router.push("/admin/showtimes/create")}
            size="lg"
            className="gap-2 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5" />
            Add Showtime
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by movie or cinema..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="space-y-2">
            <Label>Cinema</Label>
            <Select value={filterCinema} onValueChange={setFilterCinema}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cinemas</SelectItem>
                {cinemas?.map((cinema) => (
                  <SelectItem key={cinema.id} value={cinema.id}>
                    {cinema.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="POSTPONED">Postponed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalIcon className="mr-2 h-4 w-4" />
                  {filterDate ? format(filterDate, "PPP") : "All Dates"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filterDate}
                  onSelect={setFilterDate}
                  initialFocus
                />
                <div className="p-3 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setFilterDate(undefined)}
                  >
                    Clear Date Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Showtimes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Showtimes</CardTitle>
            <CardDescription>{showtimes?.length || 0} showtime(s) found</CardDescription>
          </CardHeader>
          <CardContent>
            {showtimesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              </div>
            ) : !showtimes || showtimes.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  No showtimes found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters or create a new showtime
                </p>
                <Button
                  onClick={() => router.push("/admin/showtimes/create")}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  <Plus className="w-4 h-4" />
                  Create First Showtime
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Movie</TableHead>
                      <TableHead>Cinema</TableHead>
                      <TableHead>Screen</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {showtimes.map((showtime) => (
                      <TableRow
                        key={showtime.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Film className="w-4 h-4 text-purple-600" />
                            <div>
                              <p>{showtime.Movie.title}</p>
                              <p className="text-xs text-gray-500">
                                {showtime.Movie.duration} min • {showtime.Movie.genre}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            {showtime.Screen.Cinema.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4 text-blue-600" />
                            Screen {showtime.Screen.number}
                            <Badge variant="outline" className="text-xs">
                              {showtime.Screen.projectionType}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <div>
                              <p>{format(new Date(showtime.startTime), "PPP")}</p>
                              <p className="text-xs text-gray-500">
                                {format(new Date(showtime.startTime), "p")}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(showtime.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/showtimes/${showtime.id}/edit`)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setShowtimeToDelete(showtime.id);
                                setDeleteDialogOpen(true);
                              }}
                              disabled={deleteMutation.isPending}
                            >
                              {deleteMutation.isPending && showtimeToDelete === showtime.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Showtime?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this showtime. This action cannot be undone. Note:
              Showtimes with existing bookings cannot be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowtimeToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
