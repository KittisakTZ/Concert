import { z } from "zod";

export type TypePayloadArtist = {
  artist_name: string;
  description: string;
};

export const CreateArtistSchema = z.object({
  body: z.object({
    artist_name: z.string().trim().min(1, "Artist name is required").max(100),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(500),
  }),
});

export const UpdateArtistSchema = z.object({
  body: z.object({
    artist_Id: z.string().uuid(),
    artist_name: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(500),
  }),
});

export const GetArtistSchema = z.object({
  params: z.object({
    artist_Id: z.string().uuid(),
  }),
});