import { z } from "zod";

export type TypePayloadPayment = {
  payment_date: Date;
  amount: number;
  payment_method: string; // 1: Credit card, 2: Transfer
  status: string; // 1: Succeed, 2: Failed
  transaction_ref: string;
};

export const CreatePaymentSchema = z.object({
  body: z.object({
    payment_date: z.coerce.date(),
    amount: z.number().positive(),
    payment_method: z.enum(["1", "2"]), // 1: Credit card, 2: Transfer
    status: z.enum(["1", "2"]), // 1: Succeed, 2: Failed
    transaction_ref: z.string().max(100),
  }),
});

export const UpdatePaymentSchema = z.object({
  body: z.object({
    payment_Id: z.string().uuid(),
    payment_date: z.coerce.date(),
    amount: z.number().positive(),
    payment_method: z.enum(["1", "2"]),
    status: z.enum(["1", "2"]),
    transaction_ref: z.string().max(100),
  }),
});

export const GetPaymentSchema = z.object({
  params: z.object({
    payment_Id: z.string().uuid(),
  }),
});