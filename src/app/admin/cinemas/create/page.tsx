"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCinemaSchema } from "@/types/schemas";
import z from "zod";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import { ProjectionType, SoundSystemType } from "@/generated/prisma/enums";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Search, Film, MapPin, Building2, Loader2 } from "lucide-react";
import ScreenPreview from "@/components/cinemas/screen-preview";

type FormValues = z.infer<typeof createCinemaSchema>;

export default function CinemaCreate() {
  const form = useForm<FormValues>({
    resolver: zodResolver(createCinemaSchema),
    defaultValues: {
      managerId: "",
      cinemaName: "",
      address: { address: "", lat: 0, lng: 0 },
      screens: [
        {
          projectionType: "STANDARD",
          soundSystemType: "DOLBY_ATMOS",
          rows: 8,
          columns: 10,
          price: 200,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({ 
    control: form.control, 
    name: "screens" 
  });

  const createMutation = trpc.cinemas.create.useMutation();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      await createMutation.mutateAsync(data);
      router.push("/admin/cinemas");
    } catch (err) {
      console.error(err);
    }
  };

  const [mgrQuery, setMgrQuery] = useState("");

  const debouncedSetQuery = React.useMemo(
    () => debounce((v: string) => setMgrQuery(v), 300),
    []
  );

  React.useEffect(() => {
    return () => debouncedSetQuery.cancel();
  }, [debouncedSetQuery]);

  const { data: mgrOptions = [], isFetching } = trpc.user.search.useQuery(
    { q: mgrQuery },
    { enabled: mgrQuery.length > 0 }
  );

  const selectedManagerId = form.watch("managerId");
  const selectedManager = mgrOptions.find((m) => m.id === selectedManagerId);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
            Create New Cinema
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up a new cinema location with screens and seating configuration
          </p>
        </div>

        <div className="space-y-6">
          {/* Manager Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Select Manager
              </CardTitle>
              <CardDescription>
                Search and assign a manager to this cinema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manager-search">Manager Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="manager-search"
                    placeholder="Search by name or email..."
                    className="pl-10"
                    onChange={(e) => debouncedSetQuery(e.target.value)}
                  />
                  {isFetching && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                  )}
                </div>
              </div>

              {mgrQuery && mgrOptions.length > 0 && (
                <div className="space-y-2">
                  {mgrOptions.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {m.user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {m.user.email}
                        </p>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => form.setValue("managerId", m.id)}
                      >
                        Select
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {selectedManager && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                    Selected Manager
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300">
                    {selectedManager.user.name} ({selectedManager.user.email})
                  </p>
                </div>
              )}
              {form.formState.errors.managerId && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {form.formState.errors.managerId.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Cinema Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Cinema Details
              </CardTitle>
              <CardDescription>
                Enter the basic information about the cinema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cinema-name">Cinema Name</Label>
                <Input
                  id="cinema-name"
                  placeholder="Enter cinema name..."
                  {...form.register("cinemaName")}
                />
                {form.formState.errors.cinemaName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {form.formState.errors.cinemaName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input 
                  placeholder="Street address..." 
                  {...form.register("address.address")}
                />
                {form.formState.errors.address?.address && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {form.formState.errors.address.address.message}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input 
                      type="number" 
                      step="any" 
                      placeholder="Latitude" 
                      {...form.register("address.lat", { valueAsNumber: true })}
                    />
                    {form.formState.errors.address?.lat && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {form.formState.errors.address.lat.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input 
                      type="number" 
                      step="any" 
                      placeholder="Longitude" 
                      {...form.register("address.lng", { valueAsNumber: true })}
                    />
                    {form.formState.errors.address?.lng && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {form.formState.errors.address.lng.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Screens */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Film className="w-6 h-6" />
                Screens Configuration
              </h2>
              <Button
                type="button"
                onClick={() =>
                  append({
                    projectionType: "STANDARD",
                    soundSystemType: "DOLBY_ATMOS",
                    rows: 8,
                    columns: 10,
                    price: 200,
                  })
                }
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Screen
              </Button>
            </div>

            {fields.map((field, idx) => (
              <Card key={field.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Screen {idx + 1}</CardTitle>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(idx)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <CardDescription>
                    Configure seating layout and specifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Projection Type</Label>
                      <Select
                        value={form.watch(`screens.${idx}.projectionType`)}
                        onValueChange={(val) =>
                          form.setValue(`screens.${idx}.projectionType`, val as any)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(ProjectionType).map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Sound System</Label>
                      <Select
                        value={form.watch(`screens.${idx}.soundSystemType`)}
                        onValueChange={(val) =>
                          form.setValue(`screens.${idx}.soundSystemType`, val as any)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(SoundSystemType).map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input
                        type="number"
                        {...form.register(`screens.${idx}.price`, { valueAsNumber: true })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Rows</Label>
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        {...form.register(`screens.${idx}.rows`, { valueAsNumber: true })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Columns</Label>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        {...form.register(`screens.${idx}.columns`, { valueAsNumber: true })}
                      />
                    </div>
                  </div>

                  {/* Screen Preview */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                      Seating Preview
                    </h4>
                    <ScreenPreview
                      rows={form.watch(`screens.${idx}.rows`)}
                      columns={form.watch(`screens.${idx}.columns`)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              size="lg"
              onClick={() => router.push("/admin/cinemas")}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              size="lg"
              className="gap-2"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4" />
                  Create Cinema
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}