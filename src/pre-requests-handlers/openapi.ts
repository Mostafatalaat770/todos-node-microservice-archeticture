import { middleware } from 'express-openapi-validator';
import path from 'path';
import express from 'express';

const spec = path.join('assets', 'openapi.json');

export const serveOpenapiSpec = express.static(spec);

export const validateInputs = middleware({
    apiSpec: spec,
    validateRequests: true,
    validateResponses: true,
});
