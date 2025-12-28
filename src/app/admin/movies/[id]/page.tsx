"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Trash2, Edit, Clock, User, Calendar, Film } from "lucide-react";

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;

  // Fetch movie details
  const { data: movie, isLoading } = trpc.movies.getById.useQuery({ id: movieId });
  const deleteMovie = trpc.movies.delete.useMutation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Movie Not Found</CardTitle>
            <CardDescription>The movie you're looking for doesn't exist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/movies">
              <Button className="w-full bg-transparent" variant="outline">
                Back to Movies
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleDelete = () => {
    deleteMovie.mutate(
      { id: movieId },
      {
        onSuccess: () => {
          router.push("/admin/movies");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/admin/movies"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Movies
          </Link>
          <div className="flex items-center gap-2">
            <Link href={`/admin/movies/${movieId}/edit`}>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="gap-2">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Movie</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{movie.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-2 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          {/* Poster */}
          <div>
            <div className="aspect-2/3 rounded-lg overflow-hidden bg-muted shadow-lg">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                  <div className="text-center">
                    <Film className="w-16 h-16 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No poster</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{movie.title}</h1>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Directed by {movie.director}
              </p>
            </div>

            {/* Meta Information Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Genre</p>
                  <Badge className="text-sm">
                    {movie.genre.charAt(0) + movie.genre.slice(1).toLowerCase()}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Duration
                  </p>
                  <p className="text-lg font-semibold text-foreground">{movie.duration}m</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Release Date
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Movie ID */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Movie Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Movie ID</p>
                  <p className="font-mono text-sm text-foreground break-all">{movie.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Created</p>
                  <p className="text-sm text-foreground">
                    {new Date(movie.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="text-sm text-foreground">
                    {new Date(movie.updatedAt).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/admin/movies" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Movies
                </Button>
              </Link>
              <Link href={`/admin/movies/${movieId}/edit`} className="flex-1">
                <Button className="w-full">Edit Movie</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
