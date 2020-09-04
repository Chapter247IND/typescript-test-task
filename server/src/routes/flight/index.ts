import { FlightController } from "@server/controllers";

export default async (server, opts, next) => {
  server.get("/", FlightController.list);
  next();
};
