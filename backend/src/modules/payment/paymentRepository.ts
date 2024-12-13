import { payment } from "@prisma/client";
import prisma from "@src/db";

import { TypePayloadPayment } from "./paymentModel";

export const PaymentKeys = [
  "payment_Id",
  "payment_date",
  "amount",
  "payment_method",
  "status",
  "transaction_ref",
  "created_at",
  "updated_at",
];

export const paymentRepository = {
  findAllAsync: async () => {
    return prisma.payment.findMany({
      select: {
        payment_Id: true,
        payment_date: true,
        amount: true,
        payment_method: true,
        status: true,
        transaction_ref: true,
      },
    });
  },

  findByIdAsync: async <Key extends keyof payment>(
    payment_Id: string,
    keys = PaymentKeys as Key[]
  ) => {
    return prisma.payment.findUnique({
      where: { payment_Id },
      select: keys.reduce((obj, key) => ({ ...obj, [key]: true }), {}),
    }) as Promise<Pick<payment, Key> | null>;
  },

  createAsync: async (payload: TypePayloadPayment) => {
    return prisma.payment.create({
      data: payload,
    });
  },

  updateAsync: async (payment_Id: string, payload: TypePayloadPayment) => {
    return prisma.payment.update({
      where: { payment_Id },
      data: payload,
    });
  },

  deleteAsync: async (payment_Id: string) => {
    return prisma.payment.delete({
      where: { payment_Id },
    });
  },
};