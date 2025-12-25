import { Genre, ProjectionType, SoundSystemType } from "@/generated/prisma/enums";
import z from "zod";

export const createMovieSchema = z.object({
  genre: z.enum(Genre),
  title: z.string("Movie Name is Required"),
  director: z.string("Director Name is Required").min(1, "Name cannot be less than 1 characters"),
  duration: z.number("Duration is Required").min(1, "Duration must be at least 1 minute"),
  releaseDate: z.date(),
  posterUrl: z.url().optional(),
});

export const createScreenSchema = z.object({
  projectionType: z.enum(ProjectionType),
  SoundSystemType: z.enum(SoundSystemType),
  rows: z.number(),
  columns: z.number(),
  price: z.number(),
});

export const createAddressSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
});

export const createCinemaSchema = z.object({
  managerId: z.string().min(1, "Manager ID is required"),
  cinemaName: z.string().min(1, "Cinema name is required"),
  address: createAddressSchema,
  screens: z.array(createScreenSchema),
});
