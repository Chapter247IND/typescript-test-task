import dotenv from "dotenv";
import fastify, { FastifyInstance } from "fastify";
import fastifyBlipp from "fastify-blipp";
import { IncomingMessage, Server, ServerResponse } from "http";
import "module-alias/register";
import "reflect-metadata";
import { WhetherRoutes } from "./routes";
import fastifyStatic from "fastify-static";
import path from "path";
// initialize .env
dotenv.config();

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({ logger: true });
// register static contents
server.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});
// register routes logger
server.register(fastifyBlipp);
// register routes
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
