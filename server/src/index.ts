import dotenv from "dotenv";
import fastify, { FastifyInstance } from "fastify";
import fastifyBlipp from "fastify-blipp";
import { IncomingMessage, Server, ServerResponse } from "http";
import "reflect-metadata";
import { WhetherRoutes, UserRoutes, FlightRoutes } from "./routes";
import fastifyStatic from "fastify-static";
import path from "path";
import fastifyCORS from "fastify-cors";
import socket from "socket.io";
import { LiveFlightController } from "@server/controllers/socket";

import { validateSocketConnection } from "@server/utills/validate.token";

// initialize .env
dotenv.config();

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: process.env.NODE_ENV === "development" });
const io = socket(server.server);

io.use(validateSocketConnection).on("connection", (client) => {
  client.on("statusUpdated", async (id: number, status: string) => {
    const updatedFlight = await LiveFlightController.statusUpdated(id, status);
    client.emit("statusUpdated", updatedFlight);
    client.broadcast.emit("statusUpdated", updatedFlight);
  });
});
// register static contents
server.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});
// accept cross-origin request
server.register(fastifyCORS, {});
// register routes logger
server.register(fastifyBlipp);
// register routes
server.register(FlightRoutes, {
  prefix: "/flights",
});
server.register(UserRoutes, { prefix: "/users" });
server.register(WhetherRoutes);
/**
 * Handle all uncaugth exceptions
 */
process.on("uncaughtException", (error) => {
  // this can be replaced with any kind of logger
  console.error(error);
});
/**
 * Handle all uncaugth rejection
 */
process.on("unhandledRejection", (error) => {
  // this can be replaced with any kind of logger
  console.error(error);
});

(async () => {
  try {
    const port: number = Number(process.env.PORT || "8000");
    await server.listen(port);
    server.blipp();
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
})();
