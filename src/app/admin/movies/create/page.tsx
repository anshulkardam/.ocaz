"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Genre } from "@/generated/prisma/enums";
import { trpc } from "@/lib/trpc";
import { createMovieSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import z from "zod";
import { useState } from "react";

const CreateMovie = () => {
  const form = useForm<z.infer<typeof createMovieSchema>>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      title: "",
      director: "",
      genre: Genre.ACTION,
      duration: 120,
      releaseDate: new Date(),
      posterUrl: undefined,
    },
  });

  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const utils = trpc.useUtils();
  const createMovie = trpc.movies.create.useMutation();
  const router = useRouter();
  const handleSubmit = async (values: z.infer<typeof createMovieSchema>) => {
    createMovie.mutate(values, {
      onSuccess: async () => {
        await utils.movies.invalidate();
        router.push("/admin/movies");
      },
    });
  };

  return (
    <div className="h-full flex items-center">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle className="text-xl leading-none">Create a New Movie</CardTitle>
          <CardDescription>Add a new movie to your collection</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movie Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter movie title" {...field} disabled={false} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Director Field */}
              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter director name" {...field} disabled={false} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                {/* Genre Field */}
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(Genre).map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre.charAt(0) + genre.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration Field */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="120"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value ? Number.parseInt(e.target.value, 10) : ""
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Release Date Field */}
              <FormField
                control={form.control}
                name="releaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value ? field.value.toISOString().split("T")[0] : ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="posterUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Movie Poster</FormLabel>

                    <FormControl>
                      <div className="flex flex-col gap-3">
                        <CldUploadButton
                          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                          options={{
                            maxFiles: 1,
                            resourceType: "image",
                          }}
                          onSuccess={(result: any) => {
                            const url = result?.info?.secure_url;
                            if (!url) return;

                            field.onChange(url);
                            setPosterPreview(url);
                          }}
                        >
                          <div className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center transition hover:border-primary hover:bg-muted/50">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 16v-8m0 0-3 3m3-3 3 3M4 16.5v1.25A2.25 2.25 0 0 0 6.25 20h11.5A2.25 2.25 0 0 0 20 17.75V16.5"
                                />
                              </svg>

                              <p className="text-sm font-medium">Click to upload poster</p>
                              <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                            </div>
                          </div>
                        </CldUploadButton>

                        {posterPreview && (
                          <div className="mt-2 rounded-md overflow-hidden border">
                            <img
                              src={posterPreview}
                              alt="Poster preview"
                              className="w-full max-h-64 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                {false ? "Creating..." : "Create Movie"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMovie;
