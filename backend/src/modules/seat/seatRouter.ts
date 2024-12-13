import express, { Router } from "express";
import { seatService } from "./seatService";
import { CreateSeatSchema, UpdateSeatSchema, GetSeatSchema } from "./seatModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

export const seatRouter = Router();

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
