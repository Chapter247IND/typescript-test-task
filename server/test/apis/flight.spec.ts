import Axios from "axios";
import { API_ENDPOINT } from "./config";

describe("Test /flights rotue", () => {
  it("Should success with get method", async () => {
    const { status } = await Axios.get(`${API_ENDPOINT}/flights`);
    expect(status).toBe(200);
  });
  it("Should return 404 with post method", async () => {
    let status = 200;
    try {
      await Axios.post(`${API_ENDPOINT}/flights`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      status = error.response.status;
    }
    expect(status).toBe(404);
  });
});
