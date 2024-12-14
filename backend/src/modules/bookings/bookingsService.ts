import { bookingsRepository } from "./bookingsRepository";
import { TypePayloadBookings } from "./bookingsModel";
import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

export const bookingsService = {
  findAll: async () => {
    const bookings = await bookingsRepository.findAllAsync();
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get all bookings success",
      bookings,
      StatusCodes.OK
    );
  },

  findById: async (bookings_Id: string) => {
    const booking = await bookingsRepository.findByIdAsync(bookings_Id);
    if (!booking) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Booking not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get booking success",
      booking,
      StatusCodes.OK
    );
  },

  create: async (payload: TypePayloadBookings) => {
    const booking = await bookingsRepository.createAsync(payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Booking created successfully",
      booking,
      StatusCodes.CREATED
    );
  },

  update: async (bookings_Id: string, payload: Partial<TypePayloadBookings>) => {
    const booking = await bookingsRepository.updateAsync(bookings_Id, payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Booking updated successfully",
      booking,
      StatusCodes.OK
    );
  },

  delete: async (bookings_Id: string) => {
    await bookingsRepository.deleteAsync(bookings_Id);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Booking deleted successfully",
      null,
      StatusCodes.OK
    );
  },
};