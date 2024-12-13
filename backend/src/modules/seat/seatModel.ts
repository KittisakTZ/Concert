import { z } from "zod";

// Type definition for Seat Payload
export type TypePayloadSeat = {
  seat_number: string;
  zone_name: string;
  price: number;
  capacity: number;
  status: string; // 1: Available, 2: Booked
};

// Schema for creating a seat
export const CreateSeatSchema = z.object({
  body: z.object({
    seat_number: z.string().max(10),
    zone_name: z.string().max(50),
    price: z.number().min(0),
    capacity: z.number().min(1),
    status: z.enum(["1", "2"]), // 1: Available, 2: Booked
  }),
});

// Schema for updating a seat
export const UpdateSeatSchema = z.object({
  body: z.object({
    seat_Id: z.string().uuid(),
    seat_number: z.string().max(10),
    zone_name: z.string().max(50),
    price: z.number().min(0),
    capacity: z.number().min(1),
    status: z.enum(["1", "2"]),
  }),
});

// Schema for getting a seat by ID
export const GetSeatSchema = z.object({
  params: z.object({
    seat_Id: z.string().uuid(),
  }),
});
