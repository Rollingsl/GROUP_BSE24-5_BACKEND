import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import { ExpressPeerServer } from "peer";
import { Server } from "socket.io";
import { errorController } from "./controllers/errorController";
import {
  endRequestMonitoringTimer,
  startRequestMonitoringTimer,
} from "./controllers/monitoringController";
import { rateLimitController } from "./controllers/rateLimitController";
import { videoConferencingController } from "./controllers/videoConferencingController";
import logger from "./logger"; // Import Winston logger
import { videoConferenceRoutes } from "./routes/VideoConferencingRoutes";
import { appointmentRoutes } from "./routes/appointmentRoutes";
import { chatRoutes } from "./routes/chatRoutes";
import { deviceRoutes } from "./routes/deviceRoutes";
import { doctorsPatientsRoutes } from "./routes/doctorsPatientRoute";
import { keepActiveRoutes } from "./routes/keepActiveRoutes";
import { medicalRecordRoutes } from "./routes/medicalRoutes";
import { mentalHealthRoutes } from "./routes/mentalHealthRoutes";
import { monitoringRoutes } from "./routes/monitoringRoutes";
import { notificationRoutes } from "./routes/notificationRoutes";
import { scheduleRoutes } from "./routes/scheduleRoutes";
import { sessionDeviceRoutes } from "./routes/sessionDeviceRoutes";
import { statusRoutes } from "./routes/statusRoutes";
import { twoFARoutes } from "./routes/twoFARoutes";
import { userRoutes } from "./routes/userRoutes";

dotenv.config();

const app = express();

let url: string;
let allowOrigins = [
  "https://group-bse-24-5.vercel.app", 
  "group-bse-24-5-chi.vercel.app",
];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (allowOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: "*" }));
} else {
  app.use(cors());
  allowOrigins = ["http://localhost:5173"];
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowOrigins,
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

const peerServer = ExpressPeerServer(server);

app.use("/peerjs", peerServer);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Winston logger instead of Morgan
app.use((req: Request, res: Response, next) => {
  logger.info(`${req.method} ${req.url} - ${req.ip}`);
  next();
});

app.use(rateLimitController);
app.use(startRequestMonitoringTimer);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/schedules", scheduleRoutes);
app.use("/api/v1/medical-records", medicalRecordRoutes);
app.use("/api/v1/mental-health", mentalHealthRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/devices", deviceRoutes);
app.use("/api/v1/status", statusRoutes);
app.use("/api/v1/conferences", videoConferenceRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/doctors-patient", doctorsPatientsRoutes);
app.use("/api/v1/2fa", twoFARoutes);
app.use("/api/v1/session-devices", sessionDeviceRoutes);

app.use(monitoringRoutes);
app.use(endRequestMonitoringTimer);

videoConferencingController(io);
app.use(keepActiveRoutes);
app.use(errorController);

// Route not found handler with Winston logging
app.use("*", (req: Request, res: Response) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

const PORT = 8000;

server.listen(PORT, () => {
  logger.info(`Docease server running on port ${PORT}`);
});
