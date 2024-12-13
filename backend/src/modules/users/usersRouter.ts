import express, { Router } from "express";
import { userService } from "./usersService";
import { CreateUserSchema, UpdateUserSchema, GetUserSchema } from "./usersModel";
import { validateRequest } from "@common/utils/httpHandlers";

export const userRouter = Router();

userRouter.get("/get", async (req, res) => {
  const response = await userService.findAll();
  res.status(response.status).json(response);
});

userRouter.get("/get/:user_Id", validateRequest(GetUserSchema), async (req, res) => {
  const { user_Id } = req.params;
  const response = await userService.findById(user_Id);
  res.status(response.status).json(response);
});

userRouter.post("/create", validateRequest(CreateUserSchema), async (req, res) => {
  const response = await userService.create(req.body);
  res.status(response.status).json(response);
});

userRouter.patch("/update", validateRequest(UpdateUserSchema), async (req, res) => {
  const { user_Id, ...payload } = req.body;
  const response = await userService.update(user_Id, payload);
  res.status(response.status).json(response);
});

userRouter.delete("/delete/:user_Id", validateRequest(GetUserSchema), async (req, res) => {
  const { user_Id } = req.params;
  const response = await userService.delete(user_Id);
  res.status(response.status).json(response);
});
