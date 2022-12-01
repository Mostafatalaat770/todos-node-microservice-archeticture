import { WorkspaceId } from '../workspace-id.type';

export type ServiceAccess = AdminAccess | WorkspaceAccess;

export interface AdminAccess {
    type: 'admin';
}

export type WorkspaceAccess = {
    type: 'workspace';
    workspaceId: WorkspaceId;
};

export const workspaceAccess = (workspaceId: WorkspaceId): WorkspaceAccess => ({
    type: 'workspace',
    workspaceId,
});

export const adminAccess: AdminAccess = {
    type: 'admin',
};
