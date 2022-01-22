const { transports, createLogger, format } = require("winston");

const { simple } = format;

const loggerConfig = {
  format: simple(),
  transports: [
    new transports.Console({
      level: "info",
    }),
  ],
};

const logger = createLogger(loggerConfig);

module.exports = logger;
