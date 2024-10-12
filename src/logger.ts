import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', // Log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Timestamp format
    format.errors({ stack: true }), // Capture stack traces for errors
    format.splat(), // For string interpolation
    format.json() // Format as JSON
  ),
  transports: [
    new transports.Console({ // Log to console
      format: format.combine(
        format.colorize(), // Colorized logs for console output
        format.simple() // Simplified format for console
      )
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // File for error logs
    new transports.File({ filename: 'logs/combined.log' }) // File for combined logs
  ]
});

// Export the logger instance for use throughout the app
export default logger;
