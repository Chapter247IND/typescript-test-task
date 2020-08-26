import fp from "fastify-plugin";
import { WhetherController } from "@server/controllers";

export default fp(async (server, opts, next) => {
  server.route({
    url: "/history",
    logLevel: "warn",
    method: ["GET", "HEAD"],
    handler: WhetherController.getWhetherHistory,
  });
  server.route({
    url: "/:cityname",
    logLevel: "warn",
    method: ["GET", "HEAD"],
    handler: WhetherController.getWhetherByCity,
  });
  next();
});
