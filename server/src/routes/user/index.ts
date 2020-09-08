import { UserController } from "@server/controllers";
import { validateEndpoint } from "@server/utills/validate.token";

export default async (server, opts, next) => {
  server.post("/login", UserController.login);
  server.get(
    "/refresh-token",
    {
      preHandler: validateEndpoint,
    },
    UserController.refreshToken
  );
  next();
};
