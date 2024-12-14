import { payment } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

import { ServiceResponse, ResponseStatus } from "@common/models/serviceResponse";
import { paymentRepository } from "./paymentRepository";
import { TypePayloadPayment } from "./paymentModel";

export const paymentService = {
  findAll: async () => {
    const payments = await paymentRepository.findAllAsync();
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get all payments success",
      payments,
      StatusCodes.OK
    );
  },

  findById: async (payment_Id: string) => {
    const payment = await paymentRepository.findByIdAsync(payment_Id);
    if (!payment) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        "Payment not found",
        null,
        StatusCodes.NOT_FOUND
      );
    }
    return new ServiceResponse(
      ResponseStatus.Success,
      "Get payment success",
      payment,
      StatusCodes.OK
    );
  },

  create: async (payload: TypePayloadPayment) => {
    const payment = await paymentRepository.createAsync(payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Payment created successfully",
      payment,
      StatusCodes.CREATED
    );
  },

  update: async (payment_Id: string, payload: TypePayloadPayment) => {
    const payment = await paymentRepository.updateAsync(payment_Id, payload);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Payment updated successfully",
      payment,
      StatusCodes.OK
    );
  },

  delete: async (payment_Id: string) => {
    await paymentRepository.deleteAsync(payment_Id);
    return new ServiceResponse(
      ResponseStatus.Success,
      "Payment deleted successfully",
      null,
      StatusCodes.OK
    );
  },
};
