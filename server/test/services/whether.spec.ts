import dotenv from "dotenv";
import { WhetherService } from "./../../src/services";
dotenv.config();

describe("Test WhetherService", () => {
  it("Should return success with indore as city by passing directly in method", async () => {
    const whetherService = new WhetherService();
    const { status } = await whetherService.getWhetherByCity("indore");
    expect(status).toBe(200);
  });
  it("Should return success with indore as city by passing in constructor", async () => {
    const whetherService = new WhetherService({
      city: "indore",
    });
    const { status } = await whetherService.getWhetherByCity();
    expect(status).toBe(200);
  });
  it("Should return success with indore as city and in as country by directly in method", async () => {
    const whetherService = new WhetherService();
    const { status } = await whetherService.getWhetherByCity("indore", "in");
    expect(status).toBe(200);
  });
  it("Should return success with indore as city and in as country by passing in constructor", async () => {
    const whetherService = new WhetherService({
      city: "indore",
      country: "in",
    });
    const { status } = await whetherService.getWhetherByCity();
    expect(status).toBe(200);
  });
  it("Should return 404 status with unkown as city", async () => {
    let status = 200;
    try {
      const whetherService = new WhetherService({
        city: "unkown",
      });
      await whetherService.getWhetherByCity();
    } catch (error) {
      status = error.response.status;
    }
    expect(status).toBe(404);
  });
  it("Should work as inline", async () => {
    let isFailed = false;
    try {
      await new WhetherService({
        city: "indore",
      }).getWhetherByCity();
    } catch (error) {
      isFailed = true;
    }
    expect(isFailed).toBeFalsy();
  });
});
