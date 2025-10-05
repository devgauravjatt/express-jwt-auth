import request from "supertest";
import app from "../src/app.js";

describe("User API", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456"
    });
    token = res.body.data.accessToken;
  });

  it("Debe obtener lista de usuarios (ADMIN)", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });
});
