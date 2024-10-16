import { expect, test } from "vitest";

test("returns a 200 on successful signup", async () => {
  const mockUser = {
    username: "Simon king",
    gender: "male",
    email: "Simon@gmail.com",
    phoneNumber: "078xxxxxx",
    role: "superadmin",
    password: "password",
  };

  const mockSignUp = (
    username: string,
    gender: string,
    email: string,
    phoneNumber: string,
    role: string,
    password: string
  ) => {
    if (email && username && gender && phoneNumber && role && password) {
      return { statusCode: 200, message: "Account sign up successful" };
    }
    return { statusCode: 401, message: "Invalid credentials" };
  };

  const response = mockSignUp(
    mockUser.username,
    mockUser.gender,
    mockUser.email,
    mockUser.phoneNumber,
    mockUser.role,
    mockUser.password
  );

  expect(response.statusCode).toBe(200);
  expect(response.message).toBe("Account sign up successful");
});



test("returns a 401 on unsuccessful signup", async () => {
  const mockUser = {
    username: "Simon king",
    gender: "male",
    email: "Simon@gmail.com",
    phoneNumber: "078xxxxxx",
    role: "",
    password: "password",
  };

  const mockSignUp = (
    username: string,
    gender: string,
    email: string,
    phoneNumber: string,
    role: string,
    password: string
  ) => {
    if (email && username && gender && phoneNumber && role && password) {
      return { statusCode: 200, message: "Account sign up successful" };
    }
    return { statusCode: 401, message: "Invalid credentials" };
  };

  const response = mockSignUp(
    mockUser.username,
    mockUser.gender,
    mockUser.email,
    mockUser.phoneNumber,
    mockUser.role,
    mockUser.password
  );

  expect(response.statusCode).toBe(401);
  expect(response.message).toBe("Invalid credentials");
});
