import axios from 'axios';
import { config } from '../../configuration/config';

export const sendNotification = (message: string): Promise<void> =>
    axios.post(`${config.http.servicesUrl}/notify/notifications`, {
        message,
    });
