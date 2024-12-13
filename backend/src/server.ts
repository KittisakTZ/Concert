import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import { pino } from "pino";
import cookieParser from 'cookie-parser';

import { env } from "@common/utils/envConfig";
import errorHandler from "@common/middleware/errorHandler";
import { categoryRouter } from "@modules/categories/categoryRouter";
import { venueRouter } from "@modules/venue/venueRouter";
import { concertRouter } from "@modules/concerts/concertRouter";
import { artistRouter } from "@modules/artists/artistsRouter";
import { paymentRouter } from "@modules/payment/paymentRouter";
import { bookingsRouter } from "@modules/bookings/bookingsRouter";
import { seatRouter } from "@modules/seat/seatRouter";
import { userRouter } from "@modules/users/usersRouter";

const logger = pino({ name: "server start" });
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.use("/v1/category", categoryRouter);
app.use("/v1/venue",venueRouter);
app.use("/v1/concerts",concertRouter);
app.use("/v1/artist",artistRouter);
app.use("/v1/payment",paymentRouter);
app.use("/v1/booking",bookingsRouter);
app.use("/v1/seat",seatRouter);
app.use("/v1/user",userRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
