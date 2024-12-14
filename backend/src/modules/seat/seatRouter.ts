import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { seatService } from "./seatService";
import { CreateSeatSchema, UpdateSeatSchema, GetSeatSchema } from "./seatModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

export const seatRouter = Router();

const prisma = new PrismaClient({});

seatRouter.get("/get", async (req, res) => {
  const response = await seatService.findAll();
  handleServiceResponse(response, res);
});

seatRouter.get("/get/:seat_Id", validateRequest(GetSeatSchema), async (req, res) => {
  const { seat_Id } = req.params;
  const response = await seatService.findById(seat_Id);
  handleServiceResponse(response, res);
});

seatRouter.post(
  "/create",
  validateRequest(CreateSeatSchema),
  async (req, res) => {
    const payload = req.body;
    const response = await seatService.create(payload);
    handleServiceResponse(response, res);
  }
);

seatRouter.patch(
  "/update",
  validateRequest(UpdateSeatSchema),
  async (req, res) => {
    const { seat_Id, ...payload } = req.body;
    const response = await seatService.update(seat_Id, payload);
    handleServiceResponse(response, res);
  }
);

seatRouter.delete(
  "/delete/:seat_Id",
  validateRequest(GetSeatSchema),
  async (req, res) => {
    const { seat_Id } = req.params;
    const response = await seatService.delete(seat_Id);
    handleServiceResponse(response, res);
  }
);

// Route ใหม่ที่ใช้คำสั่ง SQL แบบเต็ม
seatRouter.get("/get-details-sql", async (req, res) => {
  const query = `
    SELECT
      seat."seat_Id",
      seat.seat_number,
      seat.zone_name,
      seat.price,
      seat.capacity,
      seat.status AS seat_status,
      seat.created_at AS seat_created_at,
      seat.updated_at AS seat_updated_at,
      concerts.concert_name,
      concerts.date_time AS concert_date_time,
      bookings."bookings_Id" AS booking_id,
      bookings.amount AS booking_amount,
      bookings.total_amount AS booking_total_amount
    FROM seat
    LEFT JOIN concerts ON seat.concert_id = concerts."concert_Id"
    LEFT JOIN bookings ON seat."seat_Id" = bookings.seat_id;
  `;

  try {
    const results = await prisma.$queryRawUnsafe(query);
    res.status(200).json(results);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: errorMessage });
  }
});