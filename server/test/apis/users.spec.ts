import Axios from "axios";
import { API_ENDPOINT } from "./config";

describe("Test /users/login route", () => {
  it("Should success with right credentials", async () => {
    const { status } = await Axios.post(`${API_ENDPOINT}/users/login`, {
      username: "testuser123",
      password: "123456",
    });
    expect(status).toBe(200);
  });
  it("Should fail without credentials", async () => {
    let status = 200;
    try {
      await Axios.post(`${API_ENDPOINT}/users/login`, {});
    } catch (error) {
      status = error.response.status;
    }
    expect(status).toBe(401);
  });
  it("Should fail with wrong credentials", async () => {
    let status = 200;
    try {
      await Axios.post(`${API_ENDPOINT}/users/login`, {
        username: "testuser123",
        password: "abc123456",
      });
    } catch (error) {
      status = error.response.status;
    }
    expect(status).toBe(401);
  });
});
