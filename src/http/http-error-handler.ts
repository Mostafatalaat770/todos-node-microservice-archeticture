import axios, { AxiosError } from 'axios';
import { NextFunction, Request, Response } from 'express';

const isAxiosError = <T>(
    error: Error | AxiosError<T>
): error is AxiosError<T> => axios.isAxiosError(error);

export const handleHttpError = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (!isAxiosError(error)) {
        next(error);
        return;
    }

    request.log.error(
        {
            method: error.config ? error.config.method?.toUpperCase() : '',
            url: error.config ? error.config.url : '',
            headers: error.config ? error.config.headers : '',
            params: error.config ? error.config.params : '',
            message: error.message,
            response: {
                status: error.response?.status,
                data: error.response?.data,
            },
            stack: error.stack,
        },
        'Error Response'
    );

    response.status(500).json({
        message: `Failed request`,
        method: error.config ? error.config.method?.toUpperCase() : '',
        url: error.config ? error.config.url : '',
    });
};
