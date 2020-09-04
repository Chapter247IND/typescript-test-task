import dbConnection from "@server/utills/db.connection";
import { getRepository } from "typeorm";
import { Flight } from "@server/entities";

const statusUpdated = async (id: number, status: string): Promise<any> => {
  await dbConnection;
  const flighRepo = getRepository(Flight);
  const flighDetails = await flighRepo.findOne({
    id,
  });
  flighDetails.status = status;
  const newFlightDetails = await flighRepo.save(flighDetails);
  return newFlightDetails;
};

export default {
  statusUpdated,
};
