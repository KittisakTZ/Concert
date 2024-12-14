import { concerts } from "@prisma/client";
import prisma from "@src/db";

import { TypePayloadConcert } from "./concertModel";

export const ConcertKeys = [
  "concert_Id",
  "concert_name",
  "date_time",
  "description",
  "rounds",
  "status",
  "created_at",
  "updated_at",
];

export const concertRepository = {
  findAllAsync: async () => {
    return prisma.concerts.findMany({
      select: {
        concert_Id: true,
        concert_name: true,
        date_time: true,
        description: true,
        rounds: true,
        status: true,
        venue_id: true,
        artist_id: true,
      },
    });
  },

  findByIdAsync: async <Key extends keyof concerts>(
    concert_Id: string,
    keys = ConcertKeys as Key[]
  ) => {
    return prisma.concerts.findUnique({
      where: { concert_Id },
      select: {
        ...keys.reduce((obj, key) => ({ ...obj, [key]: true }), {}),
        venue_id: true,   // แสดง venue_id
        artist_id: true,  // แสดง artist_id
      },
    }) as Promise<Pick<concerts, Key> | null>;
  },

  createAsync: async (payload: TypePayloadConcert) => {
    return prisma.concerts.create({
      data: {
        concert_name: payload.concert_name,
        date_time: payload.date_time,
        description: payload.description,
        rounds: payload.rounds,
        status: payload.status,
        venue: {
          connect: { venue_Id: payload.venue_id },  // เชื่อมโยงกับ venue
        },
        artist: {
          connect: { artist_Id: payload.artist_id }, // เชื่อมโยงกับ artist
        },
      },
    });
  },

  updateAsync: async (concert_Id: string, payload: TypePayloadConcert) => {
    return prisma.concerts.update({
      where: { concert_Id },
      data: {
        concert_name: payload.concert_name,
        date_time: payload.date_time,
        description: payload.description,
        rounds: payload.rounds,
        status: payload.status,
        venue: {
          connect: { venue_Id: payload.venue_id },  // เชื่อมโยงกับ venue
        },
        artist: {
          connect: { artist_Id: payload.artist_id }, // เชื่อมโยงกับ artist
        },
      },
    });
  },

  deleteAsync: async (concert_Id: string) => {
    return prisma.concerts.delete({
      where: { concert_Id },
    });
  },
};