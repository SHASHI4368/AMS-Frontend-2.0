import { delay } from '../utils/mockUtils';
import { dummyOrganizations, dummyMemberships, dummyUsers } from '../dummy-data';
import { Organization, Membership, User, OrganizationActivity, OrganizationStatistics, Invitation } from '../types';

export const organizationService = {
  getOrganizations: async (): Promise<Organization[]> => {
    await delay(500);
    return [...dummyOrganizations];
  },

  getMyOrganizations: async (userId: string): Promise<Organization[]> => {
    await delay(400);
    const myOrgIds = dummyMemberships.filter(m => m.userId === userId && m.status === 'ACTIVE').map(m => m.organizationId);
    return dummyOrganizations.filter(o => myOrgIds.includes(o.id));
  },

  getOrganizationMembers: async (orgId: string): Promise<Membership[]> => {
    await delay(600);
    return dummyMemberships
      .filter(m => m.organizationId === orgId && m.status === 'ACTIVE')
      .map(m => ({
        ...m,
        user: dummyUsers.find(u => u.id === m.userId)
      }));
  },

  getPendingRequests: async (orgId: string): Promise<Membership[]> => {
    await delay(500);
    // Fake some pending requests
    return [
      {
        id: 'req_1',
        organizationId: orgId,
        userId: 'u1',
        role: 'MEMBER',
        status: 'PENDING',
        reason: 'I want to join the Engineering team.',
        department: 'Engineering',
        user: dummyUsers[0]
      }
    ];
  },

  getInvitations: async (orgId: string): Promise<Invitation[]> => {
    await delay(400);
    // Fake some invitations
    return [
      {
        id: 'inv_1',
        organizationId: orgId,
        email: 'newhire@example.com',
        role: 'MEMBER',
        status: 'PENDING',
        invitedAt: new Date().toISOString()
      }
    ];
  },

  getOrganizationById: async (orgId: string): Promise<Organization | undefined> => {
    await delay(300);
    return dummyOrganizations.find(o => o.id === orgId);
  },

  getMyInvitations: async (email: string): Promise<any[]> => {
    await delay(400);
    // Fake matching incoming invitations
    return [
      {
        id: 'inv_101',
        organizationId: 'org1',
        email: email,
        role: 'MEMBER',
        status: 'PENDING',
        invitedAt: new Date().toISOString(),
        organization: dummyOrganizations[0]
      }
    ];
  },

  acceptInvitation: async (invId: string): Promise<void> => {
    await delay(600);
  },

  declineInvitation: async (invId: string): Promise<void> => {
    await delay(400);
  },

  requestToJoin: async (orgId: string): Promise<void> => {
    await delay(500);
  },

  getOrganizationActivity: async (orgId: string): Promise<OrganizationActivity[]> => {
    await delay(300);
    return [
      { id: 'act_1', organizationId: orgId, type: 'JOINED', description: 'Bob Jones joined the organization.', createdAt: new Date().toISOString() },
      { id: 'act_2', organizationId: orgId, type: 'INVITED', description: 'Invitation sent to newhire@example.com.', createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: 'act_3', organizationId: orgId, type: 'UPDATED', description: 'Organization settings updated by Admin.', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    ];
  },

  getOrganizationStatistics: async (orgId: string): Promise<OrganizationStatistics> => {
    await delay(300);
    return {
      totalMembers: 42,
      totalManagers: 3,
      pendingRequests: 1,
      pendingInvitations: 1,
      appointmentsThisMonth: 128,
      upcomingMeetings: 12
    };
  },

  searchUsers: async (query: string): Promise<User[]> => {
    await delay(300);
    if (!query) return [];
    const lower = query.toLowerCase();
    return dummyUsers.filter(u => u.name.toLowerCase().includes(lower) || u.email.toLowerCase().includes(lower));
  },

  inviteUser: async (orgId: string, email: string): Promise<void> => {
    await delay(600);
    const org = dummyOrganizations.find(o => o.id === orgId);
    dummyInvitations.push({
      id: 'inv_' + Date.now(),
      organizationId: orgId,
      email: email,
      role: 'MEMBER' as const,
      status: 'PENDING' as const,
      invitedAt: new Date().toISOString(),
      organization: org,
      invitedBy: dummyUsers[0]
    });
  },

  cancelInvitation: async (invId: string): Promise<void> => {
    await delay(400);
  },

  approveJoinRequest: async (reqId: string): Promise<void> => {
    await delay(500);
  },

  rejectJoinRequest: async (reqId: string, reason?: string): Promise<void> => {
    await delay(500);
  },

  removeMember: async (membershipId: string): Promise<void> => {
    await delay(600);
  },

  leaveOrganization: async (orgId: string): Promise<void> => {
    await delay(800);
  },

  promoteMember: async (membershipId: string): Promise<void> => {
    await delay(400);
  },

  demoteManager: async (membershipId: string): Promise<void> => {
    await delay(400);
  },

  updateOrganization: async (orgId: string, data: Partial<Organization>): Promise<Organization> => {
    await delay(800);
    const org = dummyOrganizations.find(o => o.id === orgId);
    if (!org) throw new Error("Org not found");
    return { ...org, ...data };
  },

  createOrganization: async (name: string, description: string | undefined, userId: string): Promise<Organization> => {
    await delay(900);
    const newOrg: Organization = {
      id: 'org_' + Date.now(),
      name,
      description,
      ownerId: userId,
      createdAt: new Date().toISOString()
    };

    dummyOrganizations.push(newOrg);
    dummyMemberships.push({
      id: 'm_' + Date.now(),
      organizationId: newOrg.id,
      userId: userId,
      role: 'MANAGER',
      status: 'ACTIVE',
      joinedAt: new Date().toISOString()
    });

    return newOrg;
  }
};
