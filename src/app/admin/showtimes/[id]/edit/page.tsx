"use client";
import React, { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useRouter, useParams } from "next/navigation";
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
  Clock,
  Building2,
  Monitor,
  Film,
  Calendar as CalIcon,
  Save,
  AlertCircle,
  Loader2,
  ArrowLeft,
  CheckCircle,
  XCircle,
  PauseCircle,
  ChevronLeft,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EditShowtimePage() {
  const router = useRouter();
  const params = useParams();
  const showtimeId = params.id as string;

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ACTIVE");

  // Queries
  const { data: showtime, isLoading } = trpc.showtimes.getById.useQuery(
    { id: showtimeId },
    { enabled: !!showtimeId }
  );

  // Mutations
  const updateMutation = trpc.showtimes.update.useMutation({
    onSuccess: () => {
      toast.success("Showtime updated successfully!");
      router.push("/admin/showtimes");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update showtime");
    },
  });

  // Initialize form with existing data
  useEffect(() => {
    if (showtime) {
      const startTime = new Date(showtime.startTime);
      setSelectedDate(startTime);
      setSelectedTime(format(startTime, "HH:mm"));
      setSelectedStatus(showtime.status);
    }
  }, [showtime]);

  const handleUpdate = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please fill all required fields");
      return;
    }

    const [hours, minutes] = selectedTime.split(":");
    const startTime = new Date(selectedDate);
    startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    await updateMutation.mutateAsync({
      id: showtimeId,
      startTime,
      status: selectedStatus as "ACTIVE" | "POSTPONED" | "CANCELLED",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6 text-center">
            <XCircle className="w-12 h-12 mx-auto text-red-500 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Showtime Not Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The showtime you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push("/admin/showtimes")}>Back to Showtimes</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const hasBookings = showtime._count.Bookings > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/admin/showtimes")}>
            <ChevronLeft size={40} className="size-7" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Edit Showtime
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Update showtime details or change status
            </p>
          </div>
        </div>

        {/* Warning Alert for Bookings */}
        {hasBookings && (
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Warning:</strong> This showtime has {showtime._count.Bookings} existing
              booking(s). Changes may affect customers. Consider postponing instead of rescheduling.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Details Card */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="w-5 h-5 text-blue-600" />
              Current Showtime Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Movie</p>
                <p className="font-semibold">{showtime.Movie.title}</p>
                <p className="text-sm text-gray-600">
                  {showtime.Movie.duration} min • {showtime.Movie.genre}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Cinema & Screen</p>
                <p className="font-semibold">{showtime.Screen.Cinema.name}</p>
                <p className="text-sm text-gray-600">
                  Screen {showtime.Screen.number} • {showtime.Screen.projectionType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Badge variant="outline" className="gap-1">
                <CheckCircle className="w-3 h-3" />
                {showtime._count.Bookings} Booking(s)
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Film className="w-3 h-3" />
                {showtime._count.tickets} Ticket(s)
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Update Showtime</CardTitle>
            <CardDescription>Modify the showtime schedule or status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-base font-semibold">
                Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className="w-full h-12 justify-start text-left font-normal"
                  >
                    <CalIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-base font-semibold">
                Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Status Selection */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-base font-semibold">
                Status <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="status" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Active</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="POSTPONED">
                    <div className="flex items-center gap-2">
                      <PauseCircle className="w-4 h-4 text-yellow-600" />
                      <span>Postponed</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="CANCELLED">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span>Cancelled</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {selectedStatus === "ACTIVE" && "Showtime is available for booking"}
                {selectedStatus === "POSTPONED" && "Showtime is temporarily unavailable"}
                {selectedStatus === "CANCELLED" && "Showtime is cancelled, refunds may be issued"}
              </p>
            </div>

            {/* Preview */}
            {selectedDate && selectedTime && (
              <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-blue-900 dark:text-blue-100">
                    Updated Showtime Preview
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                        New Schedule
                      </p>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    {selectedStatus === "ACTIVE" && (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    )}
                    {selectedStatus === "POSTPONED" && (
                      <PauseCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    )}
                    {selectedStatus === "CANCELLED" && (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs text-blue-700 dark:text-blue-400 font-medium">
                        New Status
                      </p>
                      <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                        {selectedStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/admin/showtimes")}
            disabled={updateMutation.isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleUpdate}
            disabled={!selectedDate || !selectedTime || updateMutation.isPending}
            className="gap-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Showtime
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
