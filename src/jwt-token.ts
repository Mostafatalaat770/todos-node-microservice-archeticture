import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { WorkspaceId } from './workspace-id.type';

export type JwtTokenPayload = JwtPayload & WorkspaceId;

export const getToken = (response: Response): JwtTokenPayload =>
    response.locals.token;
