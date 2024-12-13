import express, { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { bookingsService } from "./bookingsService";
import { CreateBookingsSchema, UpdateBookingsSchema, GetBookingsSchema } from "./bookingsModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export const bookingsRouter = Router();

bookingsRouter.get("/get", async (req, res) => {
  const response = await bookingsService.findAll();
  handleServiceResponse(response, res);
});

bookingsRouter.get("/get/:bookings_Id", validateRequest(GetBookingsSchema), async (req, res) => {
  const { bookings_Id } = req.params;
  const response = await bookingsService.findById(bookings_Id);
  handleServiceResponse(response, res);
});

bookingsRouter.post("/create", validateRequest(CreateBookingsSchema), async (req, res) => {
  const payload = req.body;
  const response = await bookingsService.create(payload);
  handleServiceResponse(response, res);
});

bookingsRouter.patch("/update", validateRequest(UpdateBookingsSchema), async (req, res) => {
  const { bookings_Id, ...payload } = req.body;
  const response = await bookingsService.update(bookings_Id, payload);
  handleServiceResponse(response, res);
});

bookingsRouter.delete("/delete/:bookings_Id", validateRequest(GetBookingsSchema), async (req, res) => {
  const { bookings_Id } = req.params;
  const response = await bookingsService.delete(bookings_Id);
  handleServiceResponse(response, res);
});

// Route ใหม่ที่ใช้คำสั่ง SQL แบบเต็ม
bookingsRouter.get("/get-details-sql", async (req, res) => {
  const query = `
    SELECT
    bookings."bookings_Id",
    bookings.bookings_date,
    bookings.amount,
    bookings.unit_price,
    bookings.total_amount,
    bookings.status,
    users."user_fname" AS user_fname,
    users."user_lname" AS user_lname,
    concerts.concert_name,
    concerts.date_time AS concert_date_time,
    payment.payment_method,
    payment.status AS payment_status,
    seat.seat_number,
    seat.zone_name
  FROM bookings
  LEFT JOIN users ON bookings.user_id = users."user_Id"
  LEFT JOIN concerts ON bookings.concert_id = concerts."concert_Id"
  LEFT JOIN payment ON bookings.payment_id = payment."payment_Id"
  LEFT JOIN seat ON bookings.seat_id = seat."seat_Id";
  `;

  try {
    const results = await prisma.$queryRawUnsafe(query);
    res.status(200).json(results);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    res.status(500).json({ error: errorMessage });
  }
});
