import { FlightController } from "@server/controllers";
import { validateEndpoint } from "@server/utills/validate.token";

export default async (server, opts, next) => {
  server.get(
    "/",
    {
      preHandler: validateEndpoint,
    },
    FlightController.list
  );
  next();
};
