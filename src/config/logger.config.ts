import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp(),
    errors({ stack: true }), 
    logFormat
  ),
  transports: [
    new transports.File({ filename: "logs/error.log", level: "warn" }),
    new transports.File({ filename: "logs/combined.log", level: "info" }),
    ...(process.env.NODE_ENV !== "production"
      ? [new transports.Console({ format: combine(colorize(), logFormat) })]
      : []),
  ],
});


