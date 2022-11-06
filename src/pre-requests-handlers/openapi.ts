import { middleware } from 'express-openapi-validator';
import path from 'path';

const spec = path.join('assets', 'openapi.json');

export const validateInputs = middleware({
    apiSpec: spec,
    validateRequests: true,
    validateResponses: true,
});
