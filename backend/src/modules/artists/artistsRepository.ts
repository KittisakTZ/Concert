import { artists } from "@prisma/client";
import { TypePayloadArtist } from "./artistsModel";
import prisma from "@src/db";

export const ArtistKeys = [
  "artist_Id",
  "artist_name",
  "description",
  "created_at",
  "updated_at",
];

export const artistRepository = {
  findAllAsync: async () => {
    return prisma.artists.findMany({
      select: {
        artist_Id: true,
        artist_name: true,
        description: true,
      },
    });
  },

  findByIdAsync: async <Key extends keyof artists>(
    artist_Id: string,
    keys = ArtistKeys as Key[]
  ) => {
    return prisma.artists.findUnique({
      where: { artist_Id },
      select: keys.reduce((obj, key) => ({ ...obj, [key]: true }), {}),
    }) as Promise<Pick<artists, Key> | null>;
  },

  createAsync: async (payload: TypePayloadArtist) => {
    return prisma.artists.create({
      data: payload,
    });
  },

  updateAsync: async (artist_Id: string, payload: TypePayloadArtist) => {
    return prisma.artists.update({
      where: { artist_Id },
      data: payload,
    });
  },

  deleteAsync: async (artist_Id: string) => {
    return prisma.artists.delete({
      where: { artist_Id },
    });
  },
};