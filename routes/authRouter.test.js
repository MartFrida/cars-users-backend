import mongoose from "mongoose";
import app from '../app.js';
import request from 'supertest';
import User from "../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe('test /api/auth/signup', () => {
  let server = null
  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST)
    server = app.listen(PORT)
  })

  afterAll(async () => {
    await mongoose.connection.close()
    server.close()
  })

  beforeEach(() => { })

  afterEach(async () => await User.deleteMany({}))

  test("test with correct data", async () => {
    const signupData = {
      username: "Asdf",
      email: "asdf@rewq.com",
      password: "asdf@rewq.com"
    }
    const { statusCode, body } = await request(app).post("/api/auth/signup").send(signupData)
    expect(statusCode).toBe(201)
    expect(body.username).toBe(signupData.username)
    expect(body.email).toBe(signupData.email)

    const user = await User.findOne({ email: signupData.email })
    expect(user).not.toBeNull()
    expect(user.username).toBe(signupData.username)
  })

});
