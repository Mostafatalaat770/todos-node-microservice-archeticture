import { AxiosRequestConfig } from 'axios';
import { attachAuthorizationHeader } from './authorization-header.interceptor';
import { adminAccess, workspaceAccess } from './service-access.type';

jest.mock('./get-jwt');

describe('the authorization header interceptor', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should attach an admin token if access type is admin', async () => {
        const { getJWT } = require('./get-jwt');
        getJWT.mockResolvedValue('my_admin_token');
        const request = await attachAuthorizationHeader({
            access: adminAccess,
        } as AxiosRequestConfig);
        expect(getJWT).toHaveBeenCalledWith(undefined);
        expect(request.headers).toHaveProperty(
            'Authorization',
            'Bearer my_admin_token'
        );
    });

    it('should attach a workspace token if target access is requested', async () => {
        const { getJWT } = require('./get-jwt');
        getJWT.mockResolvedValue('my_token');
        const request = await attachAuthorizationHeader({
            access: workspaceAccess('1234'),
        } as AxiosRequestConfig);
        expect(getJWT).toHaveBeenCalledWith('workspaceId=1234');
        expect(request.headers).toHaveProperty(
            'Authorization',
            'Bearer my_token'
        );
    });

    it('should fail if a JWT can not be retrieved', async () => {
        const { getJWT } = require('./get-jwt');
        getJWT.mockRejectedValue('Failure');
        await expect(
            attachAuthorizationHeader({
                access: workspaceAccess('1234'),
            } as AxiosRequestConfig)
        ).rejects.toEqual('Failure');
    });
});
