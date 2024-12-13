import { venues } from "@prisma/client";
import prisma from "@src/db";

import { TypePayloadVenue } from "./venueModel";

export const VenueKeys = [
  "venue_Id",
  "venue_name",
  "capacity",
  "address",
  "district",
  "province",
  "postal_code",
  "created_at",
  "updated_at",
];

export const venueRepository = {
  findAllAsync: async () => {
    return prisma.venues.findMany({
      select: {
        venue_Id: true,
        venue_name: true,
        capacity: true,
        address: true,
        district: true,
        province: true,
        postal_code: true,
      },
    });
  },

  findByIdAsync: async <Key extends keyof venues>(
    venue_Id: string,
    keys = VenueKeys as Key[]
  ) => {
    return prisma.venues.findUnique({
      where: { venue_Id },
      select: keys.reduce((obj, key) => ({ ...obj, [key]: true }), {}),
    }) as Promise<Pick<venues, Key> | null>;
  },

  createAsync: async (payload: TypePayloadVenue) => {
    return prisma.venues.create({
      data: payload,
    });
  },

  updateAsync: async (venue_Id: string, payload: TypePayloadVenue) => {
    return prisma.venues.update({
      where: { venue_Id },
      data: payload,
    });
  },

  deleteAsync: async (venue_Id: string) => {
    return prisma.venues.delete({
      where: { venue_Id },
    });
  },
};
