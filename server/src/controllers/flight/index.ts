import { FastifyRequest, FastifyReply } from "fastify";
import dbConnection from "@server/utills/db.connection";
import { getRepository } from "typeorm";
import { Flight } from "@server/entities";

const list = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await dbConnection;

    const flightReposiroty = getRepository(Flight);
    const flights = await flightReposiroty.find();

    return res.status(200).send({ data: flights });
  } catch (error) {
    console.log(error);
    // prepare error message
    let message = "An error occure while completing your request.";
    if (error.message) {
      message = error.message;
    }
    return res.status(500).send({ message });
  }
};

export default {
  list,
};
