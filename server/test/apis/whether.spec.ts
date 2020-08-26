import Axios from "axios";
import { API_ENDPOINT } from "./config";

describe("Test /:cityname rotue", () => {
  it("Should success with indore as cityname", async () => {
    const { status } = await Axios.get(`${API_ENDPOINT}/indore`);
    expect(status).toBe(200);
  });
  it("Should fail with unkowncity as cityname", async () => {
    let status = 200;
    try {
      await Axios.get(`${API_ENDPOINT}/unkowncity`);
    } catch (error) {
      status = error.response.status;
    }
    expect(status).toBe(500);
  });
});
