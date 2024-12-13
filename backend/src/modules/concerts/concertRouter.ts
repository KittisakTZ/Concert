import express, { Router } from "express";

import { concertService } from "./concertService";
import { CreateConcertSchema, UpdateConcertSchema, GetConcertSchema } from "./concertModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

export const concertRouter = Router();

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