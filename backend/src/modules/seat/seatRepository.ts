import { seat } from "@prisma/client";
import prisma from "@src/db";
import { TypePayloadSeat } from "./seatModel";

export const SeatKeys = [
  "seat_Id",
  "seat_number",
  "zone_name",
  "price",
  "capacity",
  "status",
  "created_at",
  "updated_at",
];

export const seatRepository = {
  findAllAsync: async () => {
    return prisma.seat.findMany({
      select: {
        seat_Id: true,
        seat_number: true,
        zone_name: true,
        price: true,
        capacity: true,
        status: true,
      },
    });
  },

  findByIdAsync: async <Key extends keyof seat>(
    seat_Id: string,
    keys = SeatKeys as Key[]
  ) => {
    return prisma.seat.findUnique({
      where: { seat_Id },
      select: keys.reduce((obj, key) => ({ ...obj, [key]: true }), {}),
    }) as Promise<Pick<seat, Key> | null>;
  },

  createAsync: async (payload: TypePayloadSeat) => {
    return prisma.seat.create({
      data: payload,
    });
  },

  updateAsync: async (seat_Id: string, payload: TypePayloadSeat) => {
    return prisma.seat.update({
      where: { seat_Id },
      data: payload,
    });
  },

  deleteAsync: async (seat_Id: string) => {
    return prisma.seat.delete({
      where: { seat_Id },
    });
  },
};
