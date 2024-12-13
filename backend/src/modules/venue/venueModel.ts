import { z } from "zod";

export type TypePayloadVenue = {
  venue_name: string;
  capacity: number;
  address: string;
  district: string;
  province: string;
  postal_code: string;
};

export const CreateVenueSchema = z.object({
  body: z.object({
    venue_name: z.string().max(100),
    capacity: z.number().min(1),
    address: z.string().max(255),
    district: z.string().max(100),
    province: z.string().max(100),
    postal_code: z.string().max(10),
  }),
});

export const UpdateVenueSchema = z.object({
  body: z.object({
    venue_Id: z.string().uuid(),
    venue_name: z.string().max(100),
    capacity: z.number().min(1),
    address: z.string().max(255),
    district: z.string().max(100),
    province: z.string().max(100),
    postal_code: z.string().max(10),
  }),
});

export const GetVenueSchema = z.object({
  params: z.object({
    venue_Id: z.string().uuid(),
  }),
});
