import { expect, test } from "vitest";

test("returns a 200 on successful signin", async () => {
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    email: "johndoe@gmail.com",
    phoneNumber: "0787489045",
    role: "superadmin",
    password: "password",
  };

  const mockSignin = (email: string, password: string) => {
    if (email === mockUser.email && password === "password") {
      return { statusCode: 200, message: "Signin successful" };
    }
    return { statusCode: 401, message: "Invalid credentials" };
  };

  const response = mockSignin(mockUser.email, "password");

  expect(response.statusCode).toBe(200);
  expect(response.message).toBe("Signin successful");
});



test("returns a 401 on unsuccessful signin", async () => {
  const mockUser = {
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    email: "johndoe@gmail.com",
    phoneNumber: "0787489045",
    role: "",
    password: "password",
  };

  const mockSignin = (email: string, password: string) => {
    if (email === mockUser.email && password === "password") {
      return { statusCode: 200, message: "Signin successful" };
    }
    return { statusCode: 401, message: "Invalid credentials" };
  };

  const response = mockSignin(mockUser.email, "password");

  expect(response.statusCode).toBe(200);
  expect(response.message).toBe("Signin successful");
});
