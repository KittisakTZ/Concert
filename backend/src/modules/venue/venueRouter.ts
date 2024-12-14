import express, { Router } from "express";

import { venueService } from "./venueService";
import { CreateVenueSchema, UpdateVenueSchema, GetVenueSchema } from "./venueModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

export const venueRouter = Router();

venueRouter.get("/get", async (req, res) => {
  const response = await venueService.findAll();
  handleServiceResponse(response, res);
});

venueRouter.get("/get/:venue_Id", validateRequest(GetVenueSchema), async (req, res) => {
  const { venue_Id } = req.params;
  const response = await venueService.findById(venue_Id);
  handleServiceResponse(response, res);
});

venueRouter.post(
  "/create",
  validateRequest(CreateVenueSchema),
  async (req, res) => {
    const payload = req.body;
    const response = await venueService.create(payload);
    handleServiceResponse(response, res);
  }
);

venueRouter.patch(
  "/update",
  validateRequest(UpdateVenueSchema),
  async (req, res) => {
    const { venue_Id, ...payload } = req.body;
    const response = await venueService.update(venue_Id, payload);
    handleServiceResponse(response, res);
  }
);

venueRouter.delete(
  "/delete/:venue_Id",
  validateRequest(GetVenueSchema),
  async (req, res) => {
    const { venue_Id } = req.params;
    const response = await venueService.delete(venue_Id);
    handleServiceResponse(response, res);
  }
);
