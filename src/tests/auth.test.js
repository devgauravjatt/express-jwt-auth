import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {
  it("Debe registrar un nuevo usuario", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "test@example.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(201);
  });

  it("Debe iniciar sesión correctamente", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456"
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("accessToken");
  });
});
