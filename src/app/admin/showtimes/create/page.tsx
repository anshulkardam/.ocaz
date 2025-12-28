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
  Clock,
  Building2,
  Monitor,
  Film,
  Calendar as CalIcon,
  Plus,
  AlertCircle,
  Loader2,
  ArrowLeft,
  CheckCircle,
  ChevronLeft,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function CreateShowtimePage() {
  const router = useRouter();
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  // Queries
  const { data: cinemas, isLoading: cinemasLoading } = trpc.cinemas.list.useQuery();
  const { data: movies, isLoading: moviesLoading } = trpc.movies.list.useQuery();

  // Mutations
  const createMutation = trpc.showtimes.create.useMutation({
    onSuccess: () => {
      toast.success("Showtime created successfully!");
      router.push("/admin/showtimes");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create showtime");
    },
  });

  const availableScreens = selectedCinema
    ? cinemas?.find((c) => c.id === selectedCinema)?.Screens || []
    : [];

  const selectedMovieData = movies?.find((m) => m.id === selectedMovie);
  const selectedScreenData = availableScreens.find((s) => s.id === selectedScreen);
  const selectedCinemaData = cinemas?.find((c) => c.id === selectedCinema);

  const handleCreate = async () => {
    if (!selectedMovie || !selectedScreen || !selectedDate || !selectedTime) {
      toast.error("Please fill all required fields");
      return;
    }

    const [hours, minutes] = selectedTime.split(":");
    const startTime = new Date(selectedDate);
    startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    await createMutation.mutateAsync({
      movieId: selectedMovie,
      screenId: selectedScreen,
      startTime,
    });
  };

  const isFormValid =
    selectedCinema && selectedScreen && selectedMovie && selectedDate && selectedTime;

  if (cinemasLoading || moviesLoading) {
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/showtimes")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="size-7" />
          </Button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Schedule New Showtime
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Select cinema, screen, movie and time to create a showtime
            </p>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            The system will automatically check for scheduling conflicts and ensure proper buffer
            time between shows (30 minutes for cleanup).
          </AlertDescription>
        </Alert>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Showtime Details</CardTitle>
            <CardDescription>Fill in all the required information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cinema Selection */}
            <div className="space-y-2">
              <Label htmlFor="cinema" className="text-base font-semibold">
                Select Cinema <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedCinema} onValueChange={setSelectedCinema}>
                <SelectTrigger id="cinema" className="h-12">
                  <SelectValue placeholder="Choose a cinema..." />
                </SelectTrigger>
                <SelectContent>
                  {cinemas?.map((cinema) => (
                    <SelectItem key={cinema.id} value={cinema.id}>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-600" />
                        <span className="font-medium">{cinema.name}</span>
                        <Badge variant="outline" className="ml-2">
                          {cinema.Screens.length} screens
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Screen Selection */}
            <div className="space-y-2">
              <Label htmlFor="screen" className="text-base font-semibold">
                Select Screen <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedScreen}
                onValueChange={setSelectedScreen}
                disabled={!selectedCinema}
              >
                <SelectTrigger id="screen" className="h-12">
                  <SelectValue
                    placeholder={selectedCinema ? "Choose a screen..." : "Select cinema first"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableScreens.map((screen) => (
                    <SelectItem key={screen.id} value={screen.id}>
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Screen {screen.number}</span>
                        <Badge variant="secondary">{screen.projectionType}</Badge>
                        <Badge variant="outline">{screen.soundSystemType}</Badge>
                        <span className="text-xs text-gray-500 ml-2">₹{screen.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedCinema && availableScreens.length === 0 && (
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  No screens available for this cinema
                </p>
              )}
            </div>

            {/* Movie Selection */}
            <div className="space-y-2">
              <Label htmlFor="movie" className="text-base font-semibold">
                Select Movie <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedMovie} onValueChange={setSelectedMovie}>
                <SelectTrigger id="movie" className="h-12">
                  <SelectValue placeholder="Choose a movie..." />
                </SelectTrigger>
                <SelectContent>
                  {movies?.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      <div className="flex items-center justify-between w-full gap-4">
                        <div className="flex items-center gap-2">
                          <Film className="w-4 h-4 text-purple-600" />
                          <span className="font-medium">{movie.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{movie.genre}</Badge>
                          <span className="text-xs text-gray-500">{movie.duration} min</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-base font-semibold">
                Select Date <span className="text-red-500">*</span>
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
                Select Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Preview Card */}
            {isFormValid && (
              <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-100">
                    Showtime Preview
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Cinema
                      </p>
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                        {selectedCinemaData?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Monitor className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Screen
                      </p>
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                        Screen {selectedScreenData?.number} • {selectedScreenData?.projectionType}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Film className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Movie
                      </p>
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                        {selectedMovieData?.title} ({selectedMovieData?.duration} min)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Date & Time
                      </p>
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                        {format(selectedDate, "EEEE, MMMM d, yyyy")} at {selectedTime}
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
            disabled={createMutation.isPending}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleCreate}
            disabled={!isFormValid || createMutation.isPending}
            className="gap-2 w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Create Showtime
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
