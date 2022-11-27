import axios from 'axios';
import { createHttpAgent, createHttpsAgent } from './create-http-agents';

export const configureHttp = () => {
    axios.defaults.httpAgent = createHttpAgent();
    axios.defaults.httpsAgent = createHttpsAgent();
};
