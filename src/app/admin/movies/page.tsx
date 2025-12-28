"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Genre } from "@/generated/prisma/enums";
import { trpc } from "@/lib/trpc";
import { Search, Plus, Clock } from "lucide-react";

export default function MoviesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(
    searchParams.get("genre") || "all"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

  // Fetch movies from tRPC
  const { data: movies = [] } = trpc.movies.list.useQuery();

  const updateFilters = (newSearch?: string, newGenre?: string | null, newSort?: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newGenre && newGenre !== "all") params.set("genre", newGenre);
    if (newSort && newSort !== "newest") params.set("sort", newSort);

    const query = params.toString();
    router.push(`/admin/movies${query ? `?${query}` : ""}`);
  };

  // Filter and sort movies
  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (searchQuery) {
      result = result.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== "all") {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // Sort movies
    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
    } else if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [movies, searchQuery, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Movies</h1>
              <p className="text-muted-foreground mt-1">Manage all movies in your system</p>
            </div>
            <Link href="/admin/movies/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Movie
              </Button>
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-3">
            <div className="flex-1">
              <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or director..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    updateFilters(e.target.value, selectedGenre, sortBy);
                  }}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium text-foreground mb-2 block">Genre</label>
              <Select
                value={selectedGenre || "all"}
                onValueChange={(value) => {
                  setSelectedGenre(value);
                  updateFilters(searchQuery, value, sortBy);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {Object.values(Genre).map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre.charAt(0) + genre.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
              <Select
                value={sortBy}
                onValueChange={(value) => {
                  setSortBy(value);
                  updateFilters(searchQuery, selectedGenre, value);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title">Title (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="mx-auto px-4 py-12">
        {filteredMovies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {movies.length === 0
                ? "No movies found. Create your first movie!"
                : "No movies match your filters."}
            </p>
            {movies.length === 0 && (
              <Link href="/admin/movies/create">
                <Button className="mt-4">Create Movie</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <Link key={movie.id} href={`/admin/movies/${movie.id}`}>
                <Card className="p-0 overflow-hidden hover:shadow-lg transition-shadow gap-0 h-full cursor-pointer">
                  <CardHeader className="p-0">
                    <div className="aspect-square bg-muted overflow-hidden relative">
                      {movie.posterUrl ? (
                        <img
                          src={movie.posterUrl || "/placeholder.svg"}
                          alt={movie.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎬</div>
                            <p className="text-xs text-muted-foreground">No poster</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 pt-1 px-3">
                    <h3 className="font-semibold text-foreground text-lg line-clamp-2 mb-1">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                      {movie.director}
                    </p>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {movie.genre.charAt(0) + movie.genre.slice(1).toLowerCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs gap-1">
                        <Clock className="w-3 h-3" />
                        {movie.duration}m
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {new Date(movie.releaseDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Results count */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Showing {filteredMovies.length} of {movies.length} movies
        </div>
      </div>
    </div>
  );
}
