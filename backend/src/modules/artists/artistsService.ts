import { artists } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse";
import { artistRepository } from "./artistsRepository";
import { TypePayloadArtist } from "./artistsModel";

export const artistService = {
  findAll: async () => {
    const artists = await artistRepository.findAllAsync();
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get all artists success",
      artists,
      StatusCodes.OK
    );
  },

  findById: async (artist_Id: string) => {
    const artist = await artistRepository.findByIdAsync(artist_Id);
    if (!artist) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Artist not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get artist success",
      artist,
      StatusCodes.OK
    );
  },

  create: async (payload: TypePayloadArtist) => {
    const artist = await artistRepository.createAsync(payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Artist created successfully",
      artist,
      StatusCodes.CREATED
    );
  },

  update: async (artist_Id: string, payload: TypePayloadArtist) => {
    const artist = await artistRepository.updateAsync(artist_Id, payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Artist updated successfully",
      artist,
      StatusCodes.OK
    );
  },

  delete: async (artist_Id: string) => {
    await artistRepository.deleteAsync(artist_Id);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Artist deleted successfully",
      null,
      StatusCodes.OK
    );
  },
};
