import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { FastifyRequest, FastifyReply } from "fastify";
import { NextCallback } from "fastify-plugin";
/**
 *
 * @param socket
 * @param next
 */
export const validateSocketConnection = (
  socket: Socket,
  next: (err?: any) => any
) => {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET,
      (err: any, decoded: any) => {
        if (err)
          return next(
            new Error("You are not authorized to connect to the server")
          );
        (socket as any).decoded = decoded;
        next();
      }
    );
  } else {
    next(new Error("You are not authorized to connect to the server"));
  }
};
/**
 *
 * @param req
 * @param res
 * @param next
 */
export const validateEndpoint = (
  req: FastifyRequest,
  res: FastifyReply,
  next: NextCallback
) => {
  jwt.verify(
    req.headers.authorization.replace("Bearer ", ""),
    process.env.JWT_SECRET,
    (err: any, decoded: any) => {
      if (err)
        return next(
          new Error("You are not authorized to connect to the server")
        );
      (req as any).decoded = decoded;
      next();
    }
  );
  next();
};
