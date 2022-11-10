import jwt from 'jsonwebtoken';
import { mockControllerInputs } from '../tests/helpers';
import { authenticate } from './authenticate';

jest.mock('../configuration/config', () => ({
    config: {
        authentication: {
            enabled: true,
            jwksUrl: 'https://example.com',
        },
    },
}));

jest.mock('jwks-rsa', () => () => ({
    getSigningKey: () =>
        Promise.resolve({
            getPublicKey: () => `-----BEGIN RSA PUBLIC KEY-----
            abc
            -----END RSA PUBLIC KEY-----`,
        }),
}));

const stubJwt: jwt.Jwt = {
    header: {
        kid: 'kid',
        alg: 'RS256',
    },
    payload: {
        id: '770',
        name: 'Mostafa Talaat',
        email: 'mostafatalaat770@gmail.com',
    },
    signature: '',
};

describe('authenticate', () => {
    it('should return 401 if no authorization header is provided', async () => {
        const { request, response, next } = mockControllerInputs({
            headers: {},
        });
        await authenticate(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if the token is invalid', async () => {
        const { request, response, next } = mockControllerInputs({
            headers: {
                authorization: 'Bearer sadsa',
            },
        });
        await authenticate(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 403 if the token is not verified', async () => {
        const { request, response, next } = mockControllerInputs({
            headers: {
                authorization: 'Bearer invalid-token',
            },
        });
        jest.spyOn(jwt, 'decode').mockReturnValue(stubJwt);
        await authenticate(request, response, next);

        expect(response.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if the token is verified', async () => {
        const { request, response, next } = mockControllerInputs({
            headers: {
                authorization: 'Bearer valid-token',
            },
        });
        jest.spyOn(jwt, 'decode').mockReturnValue(stubJwt);
        jest.spyOn(jwt, 'verify').mockReturnValue();
        await authenticate(request, response, next);
        expect(response.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});
