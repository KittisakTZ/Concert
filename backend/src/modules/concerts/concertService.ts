import { concerts } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse";
import { concertRepository } from "./concertRepository";
import { TypePayloadConcert } from "./concertModel";

export const concertService = {
  findAll: async () => {
    const concerts = await concertRepository.findAllAsync();
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get all concerts success",
      concerts,
      StatusCodes.OK
    );
  },

  findById: async (concert_Id: string) => {
    const concert = await concertRepository.findByIdAsync(concert_Id);
    if (!concert) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Concert not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get concert success",
      concert,
      StatusCodes.OK
    );
  },

  create: async (payload: TypePayloadConcert) => {
    const concert = await concertRepository.createAsync(payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Concert created successfully",
      concert,
      StatusCodes.CREATED
    );
  },

  update: async (concert_Id: string, payload: TypePayloadConcert) => {
    const concert = await concertRepository.updateAsync(concert_Id, payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Concert updated successfully",
      concert,
      StatusCodes.OK
    );
  },

  delete: async (concert_Id: string) => {
    await concertRepository.deleteAsync(concert_Id);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Concert deleted successfully",
      null,
      StatusCodes.OK
    );
  },
};