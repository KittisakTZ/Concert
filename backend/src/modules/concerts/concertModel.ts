import { z } from "zod";

export type TypePayloadConcert = {
  concert_name: string;
  date_time: Date;
  description: string;
  rounds: number;
  status: string;
  venue_id: string;   // เพิ่ม venue_id
  artist_id: string;  // เพิ่ม artist_id
};

export const CreateConcertSchema = z.object({
  body: z.object({
    concert_name: z.string().max(100),
    date_time: z.coerce.date(),
    description: z.string().max(500),
    rounds: z.number().min(1),
    status: z.enum(["1", "2", "3"]), // 1: Coming soon, 2: Finish, 3: Cancelled
    venue_id: z.string().uuid(),   // เพิ่ม venue_id
    artist_id: z.string().uuid(),  // เพิ่ม artist_id
  }),
});

export const UpdateConcertSchema = z.object({
  body: z.object({
    concert_Id: z.string().uuid(),
    concert_name: z.string().max(100),
    date_time: z.coerce.date(),
    description: z.string().max(500),
    rounds: z.number().min(1),
    status: z.enum(["1", "2", "3"]),
    venue_id: z.string().uuid(),   // เพิ่ม venue_id
    artist_id: z.string().uuid(),  // เพิ่ม artist_id
  }),
});

export const GetConcertSchema = z.object({
  params: z.object({
    concert_Id: z.string().uuid(),
  }),
});
