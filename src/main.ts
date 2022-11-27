import * as http from 'http';
import app from './app';
import { configureHttp } from './http/configure-http';
import { logger } from './logger';

const main = async () => {
    const PORT = process.env.PORT || 3000;
    configureHttp();
    const server = http.createServer(app);
    server.listen(PORT, () => {
        logger.info(`Server is listening on port ${PORT}!`);
    });
};

main().catch((error) => {
    logger.error(error);
});
