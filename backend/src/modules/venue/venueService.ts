import { venues } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse";
import { venueRepository } from "./venueRepository";
import { TypePayloadVenue } from "./venueModel";

export const venueService = {
  findAll: async () => {
    const venues = await venueRepository.findAllAsync();
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get all venues success",
      venues,
      StatusCodes.OK
    );
  },

  findById: async (venue_Id: string) => {
    const venue = await venueRepository.findByIdAsync(venue_Id);
    if (!venue) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Venue not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get venue success",
      venue,
      StatusCodes.OK
    );
  },

  create: async (payload: TypePayloadVenue) => {
    const venue = await venueRepository.createAsync(payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Venue created successfully",
      venue,
      StatusCodes.CREATED
    );
  },

  update: async (venue_Id: string, payload: TypePayloadVenue) => {
    const venue = await venueRepository.updateAsync(venue_Id, payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Venue updated successfully",
      venue,
      StatusCodes.OK
    );
  },

  delete: async (venue_Id: string) => {
    await venueRepository.deleteAsync(venue_Id);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Venue deleted successfully",
      null,
      StatusCodes.OK
    );
  },
};
