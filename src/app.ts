// Import necessary modules and dependencies
import cors from "cors"; // For handling Cross-Origin Resource Sharing
import dotenv from "dotenv"; // For loading environment variables
import express, { Request, Response } from "express"; // Express framework for building web APIs
import http from "http"; // HTTP server creation
import { ExpressPeerServer } from "peer"; // For peer-to-peer WebRTC connections
import { Server } from "socket.io"; // For real-time bidirectional communication using WebSockets
import { errorController } from "./controllers/errorController"; // Custom error handling middleware
import {
  endRequestMonitoringTimer,
  startRequestMonitoringTimer,
} from "./controllers/monitoringController"; // Middleware for monitoring requests
import { rateLimitController } from "./controllers/rateLimitController"; // Middleware for rate limiting
import { videoConferencingController } from "./controllers/videoConferencingController"; // For video conferencing functionality
import logger from "./logger"; // Importing Winston logger for logging
import { videoConferenceRoutes } from "./routes/VideoConferencingRoutes"; // Route handling for video conferencing
import { appointmentRoutes } from "./routes/appointmentRoutes"; // Route handling for appointments
import { chatRoutes } from "./routes/chatRoutes"; // Route handling for chat functionality
import { deviceRoutes } from "./routes/deviceRoutes"; // Route handling for device-related operations
import { doctorsPatientsRoutes } from "./routes/doctorsPatientRoute"; // Route handling for doctor-patient interactions
import { keepActiveRoutes } from "./routes/keepActiveRoutes"; // Route handling to keep sessions active
import { medicalRecordRoutes } from "./routes/medicalRoutes"; // Route handling for medical records
import { mentalHealthRoutes } from "./routes/mentalHealthRoutes"; // Route handling for mental health-related operations
import { monitoringRoutes } from "./routes/monitoringRoutes"; // Route handling for system monitoring
import { notificationRoutes } from "./routes/notificationRoutes"; // Route handling for notifications
import { scheduleRoutes } from "./routes/scheduleRoutes"; // Route handling for scheduling
import { sessionDeviceRoutes } from "./routes/sessionDeviceRoutes"; // Route handling for session-device management
import { statusRoutes } from "./routes/statusRoutes"; // Route handling for status updates
import { twoFARoutes } from "./routes/twoFARoutes"; // Route handling for two-factor authentication
import { userRoutes } from "./routes/userRoutes"; // Route handling for user operations

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express app
const app = express();

let url: string;

// Define allowed origins for CORS
let allowOrigins = [
  "https://group-bse-24-5.vercel.app", 
  "group-bse-24-5-chi.vercel.app",
];

// Define CORS options to allow specific origins
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowOrigins.indexOf(origin) !== -1) {
      callback(null, true); // If origin is allowed, proceed with the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block requests from disallowed origins
    }
  },
};

// Apply different CORS configurations based on the environment
if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "*" })); // In production, allow requests from all origins
} else {
  app.use(cors()); // In non-production environments, apply local CORS rules
  allowOrigins = ["http://localhost:5173"]; // Allow local development origin
}

// Create an HTTP server instance from the Express app
const server = http.createServer(app);

// Initialize Socket.IO server for real-time communication
const io = new Server(server, {
  cors: {
    origin: allowOrigins, // Allow specific origins for WebSocket connections
    methods: ["GET", "POST"], // Allow only GET and POST methods
  },
  allowEIO3: true, // Enable compatibility with Engine.IO v3
});

// Initialize Peer.js server for WebRTC connections
const peerServer = ExpressPeerServer(server);

// Set up the Peer.js endpoint for WebRTC clients
app.use("/peerjs", peerServer);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom logging middleware using Winston logger
app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`); // Log incoming requests
  next(); // Proceed to the next middleware or route handler
});

// Apply rate limiting middleware to prevent abuse
app.use(rateLimitController);

// Start request monitoring timer
app.use(startRequestMonitoringTimer);

// Register various routes for different functionalities
app.use("/api/v1/users", userRoutes); // User-related routes
app.use("/api/v1/appointments", appointmentRoutes); // Appointment routes
app.use("/api/v1/schedules", scheduleRoutes); // Schedule routes
app.use("/api/v1/medical-records", medicalRecordRoutes); // Medical records routes
app.use("/api/v1/mental-health", mentalHealthRoutes); // Mental health routes
app.use("/api/v1/notifications", notificationRoutes); // Notification routes
app.use("/api/v1/devices", deviceRoutes); // Device management routes
app.use("/api/v1/status", statusRoutes); // Status routes
app.use("/api/v1/conferences", videoConferenceRoutes); // Video conferencing routes
app.use("/api/v1/chat", chatRoutes); // Chat routes
app.use("/api/v1/doctors-patient", doctorsPatientsRoutes); // Doctor-patient interaction routes
app.use("/api/v1/2fa", twoFARoutes); // Two-factor authentication routes
app.use("/api/v1/session-devices", sessionDeviceRoutes); // Session-device management routes

// Apply monitoring and session activity routes
app.use(monitoringRoutes);

// End request monitoring timer
app.use(endRequestMonitoringTimer);

// Initialize the video conferencing controller for handling real-time interactions
videoConferencingController(io);

// Register routes to keep sessions active
app.use(keepActiveRoutes);

// Custom error controller for handling errors in the application
app.use(errorController);

// Catch-all route for handling unknown routes with Winston logging
app.use("*", (req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`); // Log missing routes
  res.status(404).json({
    status: "fail", // Respond with a 404 status and failure message
    message: "Route not found!",
  });
});

// Define the port on which the server will listen
const PORT = 8000;

// Start the server and log the port it’s running on
server.listen(PORT, () => {
  logger.info(`Docease server running on port ${PORT}`); // Log server start
});
