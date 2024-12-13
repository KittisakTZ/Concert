import express, { Router } from "express";
import {
  CreateArtistSchema,
  UpdateArtistSchema,
  GetArtistSchema,
} from "./artistsModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";
import { artistService } from "./artistsService";

export const artistRouter = Router();

artistRouter.get("/get", async (req, res) => {
  const response = await artistService.findAll();
  handleServiceResponse(response, res);
});

artistRouter.get(
  "/get/:artist_Id",
  validateRequest(GetArtistSchema),
  async (req, res) => {
    const { artist_Id } = req.params;
    const response = await artistService.findById(artist_Id);
    handleServiceResponse(response, res);
  }
);

artistRouter.post(
  "/create",
  validateRequest(CreateArtistSchema),
  async (req, res) => {
    const payload = req.body;
    const response = await artistService.create(payload);
    handleServiceResponse(response, res);
  }
);

artistRouter.patch(
  "/update",
  validateRequest(UpdateArtistSchema),
  async (req, res) => {
    const { artist_Id, ...payload } = req.body;
    const response = await artistService.update(artist_Id, payload);
    handleServiceResponse(response, res);
  }
);

artistRouter.delete(
  "/delete/:artist_Id",
  validateRequest(GetArtistSchema),
  async (req, res) => {
    const { artist_Id } = req.params;
    const response = await artistService.delete(artist_Id);
    handleServiceResponse(response, res);
  }
);