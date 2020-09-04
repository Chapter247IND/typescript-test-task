import { UserController } from "@server/controllers";

export default async (server, opts, next) => {
  server.post("/login", UserController.login);
  next();
};
