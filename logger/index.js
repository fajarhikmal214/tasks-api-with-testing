const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    format.colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
