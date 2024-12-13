import express, { Router } from "express";
import { bookingsService } from "./bookingsService";
import { CreateBookingsSchema, UpdateBookingsSchema, GetBookingsSchema } from "./bookingsModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

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