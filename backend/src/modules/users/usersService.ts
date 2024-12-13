import { StatusCodes } from "http-status-codes";
import { userRepository } from "./usersRepository";
import { users } from "@prisma/client";

export const userService = {
  findAll: async () => {
    const users = await userRepository.findAllAsync();
    return {
      status: StatusCodes.OK,
      message: "Users fetched successfully",
      data: users,
    };
  },

  findById: async (user_Id: string) => {
    const user = await userRepository.findByIdAsync(user_Id);
    if (!user) {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "User not found",
      };
    }
    return {
      status: StatusCodes.OK,
      message: "User fetched successfully",
      data: user,
    };
  },

  create: async (payload: Omit<users, "user_Id" | "created_at" | "updated_at">) => {
    const newUser = await userRepository.createAsync(payload);
    return {
      status: StatusCodes.CREATED,
      message: "User created successfully",
      data: newUser,
    };
  },

  update: async (user_Id: string, payload: Partial<users>) => {
    const updatedUser = await userRepository.updateAsync(user_Id, payload);
    return {
      status: StatusCodes.OK,
      message: "User updated successfully",
      data: updatedUser,
    };
  },

  delete: async (user_Id: string) => {
    await userRepository.deleteAsync(user_Id);
    return {
      status: StatusCodes.OK,
      message: "User deleted successfully",
    };
  },
};
