import { StatusCodes } from "http-status-codes";
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse";
import { seatRepository } from "./seatRepository";
import { TypePayloadSeat } from "./seatModel";

export const seatService = {
  findAll: async () => {
    const seats = await seatRepository.findAllAsync();
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get all seats success",
      seats,
      StatusCodes.OK
    );
  },

  findById: async (seat_Id: string) => {
    const seat = await seatRepository.findByIdAsync(seat_Id);
    if (!seat) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Seat not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get seat success",
      seat,
      StatusCodes.OK
    );
  },

  create: async (payload: TypePayloadSeat) => {
    const seat = await seatRepository.createAsync(payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Seat created successfully",
      seat,
      StatusCodes.CREATED
    );
  },

  update: async (seat_Id: string, payload: TypePayloadSeat) => {
    const seat = await seatRepository.updateAsync(seat_Id, payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Seat updated successfully",
      seat,
      StatusCodes.OK
    );
  },

  delete: async (seat_Id: string) => {
    await seatRepository.deleteAsync(seat_Id);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Seat deleted successfully",
      null,
      StatusCodes.OK
    );
  },
};
