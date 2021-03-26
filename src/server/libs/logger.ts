import { createLogger, format, transports } from 'winston';

const { combine, errors, colorize, timestamp, splat, printf, json } = format;

const simple = () => printf((info) => {
    let message = `[${info.timestamp}] ${info.level}: ${info.message}`;

    if (info.stack) {
        message += `\n ${info.stack}`;
    }

    return message;
});

const logger = createLogger({
    format: combine(
        splat(),
        colorize(),
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json(),
        simple()
    ),
    transports: [
        new transports.Console({ handleExceptions: true })
    ]
});

export default logger;
