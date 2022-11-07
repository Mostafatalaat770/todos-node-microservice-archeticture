import expressPino from 'express-pino-logger';

export const logRequest = (isEnabled = true) =>
    expressPino({
        level: 'info',
        enabled: isEnabled,
    });
