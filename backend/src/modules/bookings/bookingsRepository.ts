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
    return prisma.bookings.create({
      data: {
        bookings_date: payload.bookings_date,
        amount: payload.amount,
        unit_price: payload.unit_price,
        total_amount: payload.total_amount,
        status: payload.status,
        user: { connect: { user_Id: payload.user_id } }, // เชื่อมโยงกับ user
        payment: { connect: { payment_Id: payload.payment_id } }, // เชื่อมโยงกับ payment
        seat: { connect: { seat_Id: payload.seat_id } }, // เชื่อมโยงกับ seat
        concert: { connect: { concert_Id: payload.concert_id } }, // เชื่อมโยงกับ concert
      },
    });
  },

  updateAsync: async (bookings_Id: string, payload: Partial<TypePayloadBookings>) => {
    return prisma.bookings.update({
      where: { bookings_Id },
      data: {
        amount: payload.amount,
        unit_price: payload.unit_price,
        total_amount: payload.total_amount,
        status: payload.status,
        user: payload.user_id ? { connect: { user_Id: payload.user_id } } : undefined, // อัปเดต user
        payment: payload.payment_id ? { connect: { payment_Id: payload.payment_id } } : undefined, // อัปเดต payment
        seat: payload.seat_id ? { connect: { seat_Id: payload.seat_id } } : undefined, // อัปเดต seat
        concert: payload.concert_id ? { connect: { concert_Id: payload.concert_id } } : undefined, // อัปเดต concert
      },
    });
  },

  deleteAsync: async (bookings_Id: string) => {
    return prisma.bookings.delete({ where: { bookings_Id } });
  },
};