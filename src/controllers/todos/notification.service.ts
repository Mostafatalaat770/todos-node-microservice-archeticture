import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../../configuration/config';

export const sendNotification = (
    workspaceId: string,
    message: string
): Promise<void> =>
    axios.post(
        `${config.http.servicesUrl}/notify/notifications`,
        {
            message,
        },
        {
            access: {
                type: 'workspace',
                workspaceId,
            },
        } as AxiosRequestConfig
    );
