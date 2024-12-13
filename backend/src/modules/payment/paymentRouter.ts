import express, { Router } from "express";

import { paymentService } from "./paymentService";
import { CreatePaymentSchema, UpdatePaymentSchema, GetPaymentSchema } from "./paymentModel";
import { validateRequest, handleServiceResponse } from "@common/utils/httpHandlers";

export const paymentRouter = Router();

paymentRouter.get("/get", async (req, res) => {
  const response = await paymentService.findAll();
  handleServiceResponse(response, res);
});

paymentRouter.get("/get/:payment_Id", validateRequest(GetPaymentSchema), async (req, res) => {
  const { payment_Id } = req.params;
  const response = await paymentService.findById(payment_Id);
  handleServiceResponse(response, res);
});

paymentRouter.post(
  "/create",
  validateRequest(CreatePaymentSchema),
  async (req, res) => {
    const payload = req.body;
    const response = await paymentService.create(payload);
    handleServiceResponse(response, res);
  }
);

paymentRouter.patch(
  "/update",
  validateRequest(UpdatePaymentSchema),
  async (req, res) => {
    const { payment_Id, ...payload } = req.body;
    const response = await paymentService.update(payment_Id, payload);
    handleServiceResponse(response, res);
  }
);

paymentRouter.delete(
  "/delete/:payment_Id",
  validateRequest(GetPaymentSchema),
  async (req, res) => {
    const { payment_Id } = req.params;
    const response = await paymentService.delete(payment_Id);
    handleServiceResponse(response, res);
  }
);