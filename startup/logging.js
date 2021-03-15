const winston = require('winston');

//this module is for logging data on the server

 module.exports = function() {
   
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
          new winston.transports.File({ filename: 'logfile.log', level: 'error' }),
          new winston.transports.Console({ colorize: true, prettyPrint: true})
        ],
        rejectionHandlers: [
            new transports.File({ filename: 'rejections.log' })
        ],
        exceptionHandlers: [
            new transports.File({ filename: 'exceptions.log' })
        ]
      });
      //
      // If not in production then log to the `console` with the format:
      // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
      //
      if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
          format: winston.format.simple(),
        }));
      }
      winston.add(logger);
 }