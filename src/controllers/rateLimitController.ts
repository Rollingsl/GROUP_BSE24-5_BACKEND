import { rateLimit } from "express-rate-limit";

let requestLimit: number;
let requestWindowMs: number;
// Variables to store request limit and time window for rate limiting
const isDevEnvironment: boolean = process.env.NODE_ENV === "developments";
const isProdEnvironment: boolean = process.env.NODE_ENV === "production";
const isTestEnvironment: boolean = process.env.NODE_ENV === "test";
// Check the current environment based on the NODE_ENV environment variable
if (isDevEnvironment || isProdEnvironment) {
  requestLimit = 75;
  requestWindowMs = 60 * 1000 * 5; // 5 min
} else if (isTestEnvironment) {
  requestLimit = 40;
  requestWindowMs = 60 * 1000; // 1 min
} else {
  requestLimit = 75;
  requestWindowMs = 60 * 1000 * 5; // 5 min
}

export const rateLimitController = rateLimit({
  windowMs: requestWindowMs,
  limit: requestLimit,
  message: "Too many requests, Try again later",
  legacyHeaders: true,
});
