import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import User from "../src/models/User.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

describe("Auth Routes", () => {

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let token;

  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test@example.com");
  });

  it("should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

});