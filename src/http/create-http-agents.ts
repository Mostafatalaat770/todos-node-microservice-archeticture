import Agent from 'agentkeepalive';

export const createHttpAgent = () =>
    new Agent({
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 60000,
        freeSocketTimeout: 30000,
    });

export const createHttpsAgent = () =>
    new Agent.HttpsAgent({
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 60000,
        freeSocketTimeout: 30000,
    });
