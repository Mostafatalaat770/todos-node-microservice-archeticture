import { NextFunction, Request, Response } from 'express';
import JwksRsa from 'jwks-rsa';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../configuration/config';
import { JwtTokenPayload } from '../jwt-token';

const jwksClient = JwksRsa({
    jwksUri: config.authentication.jwksUrl,
});

const isValidPayload = (
    payload: string | JwtPayload
): payload is JwtTokenPayload =>
    typeof payload !== 'string' && 'workspaceId' in payload;

export const authenticate = async (
    request: Request,
    response: Response,
    next: NextFunction
    // eslint-disable-next-line consistent-return
): Promise<unknown> => {
    try {
        const encodedToken =
            request.headers.authorization?.replace('Bearer ', '') || '';
        if (!encodedToken) {
            return response.status(401).end();
        }
        const decodedToken = jwt.decode(encodedToken, { complete: true });
        if (!decodedToken) {
            return response.status(403).end();
        }
        if (config.authentication.enabled) {
            try {
                const signingKey = await jwksClient.getSigningKey(
                    decodedToken.header.kid
                );
                jwt.verify(encodedToken, signingKey.getPublicKey(), {
                    algorithms: ['RS256'],
                });
            } catch (error) {
                return response.status(403).end();
            }
        }

        if (!isValidPayload(decodedToken.payload)) {
            throw new Error('Unexpected structure of JWT payload');
        }

        response.locals.token = decodedToken.payload;

        next();
    } catch (error) {
        next(error);
    }
};
