import { z } from "zod";

export type TypePayloadArtist = {
  artist_name: string;
  description: string;
};

export const CreateArtistSchema = z.object({
  body: z.object({
    artist_name: z.string().max(100),
    description: z.string().max(500),
  }),
});

export const UpdateArtistSchema = z.object({
  body: z.object({
    artist_Id: z.string().uuid(),
    artist_name: z.string().max(100),
    description: z.string().max(500),
  }),
});

export const GetArtistSchema = z.object({
  params: z.object({
    artist_Id: z.string().uuid(),
  }),
});