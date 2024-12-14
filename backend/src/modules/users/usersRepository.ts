import { users } from "@prisma/client";
import prisma from "@src/db";

export const userRepository = {
  findAllAsync: async () => {
    return prisma.users.findMany({
      select: {
        user_Id: true,
        title: true,
        fname: true,
        lname: true,
        phone: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    });
  },

  findByIdAsync: async (user_Id: string) => {
    return prisma.users.findUnique({
      where: { user_Id },
    });
  },

  createAsync: async (payload: Omit<users, "user_Id" | "created_at" | "updated_at">) => {
    return prisma.users.create({
      data: payload,
    });
  },

  updateAsync: async (user_Id: string, payload: Partial<users>) => {
    return prisma.users.update({
      where: { user_Id },
      data: payload,
    });
  },

  deleteAsync: async (user_Id: string) => {
    return prisma.users.delete({
      where: { user_Id },
    });
  },
};
