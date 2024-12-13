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
        concert: {
          select: {
            concert_Id: true,
            concert_name: true,
          },
        },
      },
    });
  },

  findByIdAsync: async (seat_Id: string) => {
    return prisma.seat.findUnique({
      where: { seat_Id },
      select: {
        seat_Id: true,
        seat_number: true,
        zone_name: true,
        price: true,
        capacity: true,
        status: true,
        concert: {
          select: {
            concert_Id: true,
            concert_name: true,
            date_time: true,
          },
        },
      },
    });
  },

  createAsync: async (payload: TypePayloadSeat) => {
    return prisma.seat.create({
      data: {
        seat_number: payload.seat_number,
        zone_name: payload.zone_name,
        price: payload.price,
        capacity: payload.capacity,
        status: payload.status,
        concert: { // สร้างความสัมพันธ์กับ concert
          connect: {
            concert_Id: payload.concert_id,
          },
        },
      },
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
