import { FastifyRequest, FastifyReply } from "fastify";
import { WhetherService } from "@server/services";
import { getRepository } from "typeorm";
import { WhetherHistory } from "@server/entities";
import dbConnection from "@server/utills/db.connection";

/**
 * get whether by city
 * @param req
 * @param res
 * @return FastifyReply<OpenWhetherMapResponse>
 */
const getWhetherByCity = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const params: any = req.params;
    const { data } = await new WhetherService({
      city: (params as any).cityname,
    }).getWhetherByCity();
    await dbConnection;
    const repository = getRepository(WhetherHistory);
    const history = repository.create();
    history.details = JSON.stringify(data);
    history.city = params.cityname;
    await repository.save(history);

    return res.send({ data });
  } catch (error) {
    // prepare error message
    let message = "An error occure while completing your request.";
    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
    return res.status(500).send({ message });
  }
};

export default { getWhetherByCity };
