import { z } from "zod";

export type TypePayloadBookings = {
  bookings_date: Date;
  amount: number;
  unit_price: number;
  total_amount: number;
  status: string;
  user_id: string;
  payment_id: string;
  seat_id: string;
  concert_id: string;
};

export const CreateBookingsSchema = z.object({
  body: z.object({
    bookings_date: z.coerce.date(),
    amount: z.number().min(1),
    unit_price: z.number().positive(),
    total_amount: z.number().positive(),
    status: z.enum(["1", "2", "3"]), // 1: Waiting, 2: Paid, 3: Cancelled
    user_id: z.string().uuid(),     // เพิ่ม user_id
    payment_id: z.string().uuid(),  // เพิ่ม payment_id
    seat_id: z.string().uuid(),     // เพิ่ม seat_id
    concert_id: z.string().uuid(),  // เพิ่ม concert_id
  }),
});

export const UpdateBookingsSchema = z.object({
  body: z.object({
    bookings_Id: z.string().uuid(),
    amount: z.number().min(1).optional(),
    unit_price: z.number().positive().optional(),
    total_amount: z.number().positive().optional(),
    status: z.enum(["1", "2", "3"]).optional(),
    user_id: z.string().uuid().optional(),
    payment_id: z.string().uuid().optional(),
    seat_id: z.string().uuid().optional(),
    concert_id: z.string().uuid().optional(),
  }),
});

export const GetBookingsSchema = z.object({
  params: z.object({
    bookings_Id: z.string().uuid(),
  }),
});