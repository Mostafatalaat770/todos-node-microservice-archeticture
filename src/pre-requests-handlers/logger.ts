import expressPino from 'express-pino-logger';
import { config } from '../configuration/config';

export const logRequest = (isEnabled = true) =>
    expressPino({
        level: config.logLevel,
        enabled: isEnabled,
        serializers: {
            req: (req) => ({
                method: req.method,
                url: req.url,
            }),
        },
    });
