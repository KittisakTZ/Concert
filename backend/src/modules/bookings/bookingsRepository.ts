import { bookings } from "@prisma/client";
import { TypePayloadBookings } from "./bookingsModel";
import prisma from "@src/db";

export const bookingsRepository = {
  findAllAsync: async () => {
    return prisma.bookings.findMany();
  },

  findByIdAsync: async (bookings_Id: string) => {
    return prisma.bookings.findUnique({ where: { bookings_Id } });
  },

  createAsync: async (payload: TypePayloadBookings) => {
    return prisma.bookings.create({ data: payload });
  },

  updateAsync: async (bookings_Id: string, payload: Partial<TypePayloadBookings>) => {
    return prisma.bookings.update({
      where: { bookings_Id },
      data: payload,
    });
  },

  deleteAsync: async (bookings_Id: string) => {
    return prisma.bookings.delete({ where: { bookings_Id } });
  },
};