import { AxiosResponse } from 'axios';
import { logger } from '../logger';

export const logResponse = (response: AxiosResponse): AxiosResponse => {
    logger.info(
        {
            status: response.status,
            method: response.config?.method?.toUpperCase(),
            url: response.config?.url,
        },
        'Response'
    );
    logger.debug(
        {
            status: response.status,
            method: response.config?.method?.toUpperCase(),
            url: response.config?.url,
            body: response.data,
        },
        'Response Details'
    );
    return response;
};
