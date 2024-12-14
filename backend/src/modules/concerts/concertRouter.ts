import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { concertService } from "./concertService";
import { CreateConcertSchema, UpdateConcertSchema, GetConcertSchema } from "./concertModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

export const concertRouter = Router();

const prisma = new PrismaClient({});

concertRouter.get("/get", async (req, res) => {
  const response = await concertService.findAll();
  handleServiceResponse(response, res);
});

concertRouter.get("/get/:concert_Id", validateRequest(GetConcertSchema), async (req, res) => {
  const { concert_Id } = req.params;
  const response = await concertService.findById(concert_Id);
  handleServiceResponse(response, res);
});

concertRouter.post(
  "/create",
  validateRequest(CreateConcertSchema),
  async (req, res) => {
    const payload = req.body;
    const response = await concertService.create(payload);
    handleServiceResponse(response, res);
  }
);

concertRouter.patch(
  "/update",
  validateRequest(UpdateConcertSchema),
  async (req, res) => {
    const { concert_Id, ...payload } = req.body;
    const response = await concertService.update(concert_Id, payload);
    handleServiceResponse(response, res);
  }
);

concertRouter.delete(
  "/delete/:concert_Id",
  validateRequest(GetConcertSchema),
  async (req, res) => {
    const { concert_Id } = req.params;
    const response = await concertService.delete(concert_Id);
    handleServiceResponse(response, res);
  }
);

// Route ใหม่ที่ใช้คำสั่ง SQL แบบเต็ม
concertRouter.get("/get-details-sql", async (req, res) => {
  const query = `
    SELECT
      concerts."concert_Id",
      concerts.concert_name,
      concerts.date_time,
      concerts.description,
      concerts.rounds,
      concerts.status AS concert_status,
      concerts.created_at AS concert_created_at,
      concerts.updated_at AS concert_updated_at,
      venues.venue_name,
      venues.capacity AS venue_capacity,
      venues.address AS venue_address,
      venues.district AS venue_district,
      venues.province AS venue_province,
      venues.postal_code AS venue_postal_code,
      artists.artist_name,
      artists.description AS artist_description,
      COUNT(seat."seat_Id") AS total_seats
    FROM concerts
    LEFT JOIN venues ON concerts.venue_id = venues."venue_Id"
    LEFT JOIN artists ON concerts.artist_id = artists."artist_Id"
    LEFT JOIN seat ON concerts."concert_Id" = seat.concert_id
    GROUP BY
      concerts."concert_Id",
      concerts.concert_name,
      concerts.date_time,
      concerts.description,
      concerts.rounds,
      concerts.status,
      concerts.created_at,
      concerts.updated_at,
      venues.venue_name,
      venues.capacity,
      venues.address,
      venues.district,
      venues.province,
      venues.postal_code,
      artists.artist_name,
      artists.description;
  `;

  try {
    // ระบุชนิดของผลลัพธ์
    type ConcertDetails = {
      concert_Id: string;
      concert_name: string;
      date_time: Date;
      description: string;
      rounds: number;
      concert_status: string;
      concert_created_at: Date;
      concert_updated_at: Date;
      venue_name: string;
      venue_capacity: number;
      venue_address: string;
      venue_district: string;
      venue_province: string;
      venue_postal_code: string;
      artist_name: string;
      artist_description: string;
      total_seats: bigint; // ใช้ BigInt ชัดเจน
    };

    const results = await prisma.$queryRawUnsafe<ConcertDetails[]>(query);

    // แปลง BigInt เป็น String
    const serializedResults = results.map((result) =>
      Object.fromEntries(
        Object.entries(result).map(([key, value]) => {
          if (typeof value === "bigint") {
            return [key, (value as BigInt).toString()]; // ใช้ Type Assertion
          }
          return [key, value];
        })
      )
    );

    res.status(200).json(serializedResults);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

concertRouter.get("/get-details-sql/:concert_Id", async (req, res) => {
  const { concert_Id } = req.params;

  // Query แบบแก้ไขเพื่อแปลงประเภทข้อมูล
  const query = `
    SELECT
      concerts."concert_Id",
      concerts.concert_name,
      concerts.date_time,
      concerts.description,
      concerts.rounds,
      concerts.status AS concert_status,
      concerts.created_at AS concert_created_at,
      concerts.updated_at AS concert_updated_at,
      venues.venue_name,
      venues.capacity AS venue_capacity,
      venues.address AS venue_address,
      venues.district AS venue_district,
      venues.province AS venue_province,
      venues.postal_code AS venue_postal_code,
      artists.artist_name,
      artists.description AS artist_description,
      COUNT(seat."seat_Id") AS total_seats
    FROM concerts
    LEFT JOIN venues ON concerts.venue_id = venues."venue_Id"
    LEFT JOIN artists ON concerts.artist_id = artists."artist_Id"
    LEFT JOIN seat ON concerts."concert_Id" = seat.concert_id
    WHERE concerts."concert_Id" = CAST($1 AS UUID) -- แปลง $1 เป็น UUID
    GROUP BY
      concerts."concert_Id",
      concerts.concert_name,
      concerts.date_time,
      concerts.description,
      concerts.rounds,
      concerts.status,
      concerts.created_at,
      concerts.updated_at,
      venues.venue_name,
      venues.capacity,
      venues.address,
      venues.district,
      venues.province,
      venues.postal_code,
      artists.artist_name,
      artists.description;
  `;

  try {
    type ConcertDetails = {
      concert_Id: string;
      concert_name: string;
      date_time: Date;
      description: string;
      rounds: number;
      concert_status: string;
      concert_created_at: Date;
      concert_updated_at: Date;
      venue_name: string;
      venue_capacity: number;
      venue_address: string;
      venue_district: string;
      venue_province: string;
      venue_postal_code: string;
      artist_name: string;
      artist_description: string;
      total_seats: bigint;
    };

    const results = await prisma.$queryRawUnsafe<ConcertDetails[]>(query, concert_Id);

    const serializedResults = results.map((result) =>
      Object.fromEntries(
        Object.entries(result).map(([key, value]) => {
          if (typeof value === "bigint") {
            return [key, (value as BigInt).toString()];
          }
          return [key, value];
        })
      )
    );

    res.status(200).json(serializedResults);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: errorMessage });
  }
});