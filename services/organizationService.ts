/* eslint-disable @typescript-eslint/no-explicit-any */
import { delay } from '../utils/mockUtils';
import { dummyOrganizations, dummyMemberships } from '../dummy-data';
import { Organization, Membership, User, OrganizationActivity, OrganizationStatistics, Invitation, PaginatedResponse } from '../types';
import { api } from '@/lib/axios';

export const organizationService = {
  getOrganizations: async (page = 0, size = 10, name = ''): Promise<PaginatedResponse<Organization>> => {
    try {
      const { data } = await api.get('/organizations/all', {
        params: { page, size, name }
      });
      const body = data.body || data;
      return {
        ...body,
        content: (body.content || []).map((org: any) => ({
          ...org,
          id: String(org.id)
        }))
      };
    } catch (error) {
      console.error("Failed to fetch organizations", error);
      throw error;
    }
  },

  getMyOrganizations: async () => {
    try {
      const { data } = await api.get('/organizations/my');
      console.log("My orgs raw response:", data);
      
      let orgs = [];
      if (Array.isArray(data.body)) orgs = data.body;
      else if (data?.data && Array.isArray(data.data)) orgs = data.data;
      else if (data?.content && Array.isArray(data.content)) orgs = data.content;
      else if (data?._embedded) {
        const keys = Object.keys(data._embedded);
        if (keys.length > 0) orgs = data._embedded[keys[0]];
      }

      return orgs.map((org: any) => ({
        ...org,
        id: String(org.id)
      }));
    } catch (error) {
      console.error("Failed to fetch my organizations", error);
      throw error; // Let React Query handle the error state so it doesn't mask backend failures
    }
  },

  getOrganizationMembers: async (orgId: string, page = 0, size = 10, search = ''): Promise<PaginatedResponse<Membership>> => {
    try {
      const { data } = await api.get(`/organizations/${orgId}/members`, {
        params: { page, size, search }
      });
      const body = data.body || data;
      return {
        ...body,
        content: (body.content || []).map((m: any) => ({
          id: String(m.id),
          organizationId: orgId,
          userId: '',
          role: m.role,
          status: 'ACTIVE',
          joinedAt: m.joinedAt,
          user: {
            id: '',
            email: m.email,
            firstName: m.firstName || '',
            lastName: m.lastName || '',
            name: `${m.firstName} ${m.lastName}`.trim(),
            role: 'USER',
            avatarUrl: m.avatarUrl,
            phoneNumber: m.phoneNumber
          }
        }))
      };
    } catch (error) {
      console.error(`Failed to fetch members for org ${orgId}`, error);
      throw error;
    }
  },

  getPendingRequests: async (orgId: string): Promise<Membership[]> => {
    try {
      const { data } = await api.get(`/memberships/${orgId}/pending-requests`);
      const requests = data.body || data.data || data || [];
      return requests.map((req: any) => ({
        id: String(req.id),
        organizationId: orgId,
        userId: '', 
        role: 'MEMBER',
        status: 'PENDING',
        reason: req.note || req.reason || '',
        joinedAt: req.requestedAt,
        user: {
          id: '',
          email: req.email,
          firstName: req.name?.split(' ')[0] || '',
          lastName: req.name?.split(' ').slice(1).join(' ') || '',
          name: req.name,
          role: 'USER',
          avatarUrl: req.avatarUrl
        }
      }));
    } catch (error) {
      console.error(`Failed to fetch pending requests for org ${orgId}`, error);
      return [];
    }
  },

  getInvitations: async (orgId: string): Promise<Invitation[]> => {
    try {
      const { data } = await api.get(`/memberships/${orgId}/pending-invitations`);
      const body = data.body || [];
      return body.map((inv: any) => ({
        id: String(inv.id),
        organizationId: orgId,
        email: inv.email,
        name: inv.name,
        avatarUrl: inv.avatarUrl,
        role: "MEMBER", // Defaulting since backend might not provide it yet
        status: "PENDING",
        invitedAt: inv.invitedAt || new Date().toISOString(),
      }));
    } catch (error) {
      console.error(`Failed to fetch pending invitations for org ${orgId}`, error);
      return [];
    }
  },

  getOrganizationById: async (orgId: string) => {
    try {
      const { data } = await api.get(`/organizations/${orgId}`);
      console.log(data);
      const orgData = data?.body
      if (!orgData) return null;
      return {
        ...orgData,
        id: String(orgData.id)
      };
    } catch (error) {
      console.error(`Failed to fetch organization ${orgId}`, error);
    }
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

  requestToJoin: async (orgId: string, message?: string): Promise<void> => {
    try {
      await api.post(`/memberships/${orgId}/join`, { note: message || '' });
    } catch (error) {
      console.error(`Failed to request to join organization ${orgId}`, error);
      throw error;
    }
  },

  getOrganizationActivity: async (orgId: string, page = 0, size = 10): Promise<PaginatedResponse<OrganizationActivity>> => {
    try {
      const { data } = await api.get(`/organization-activities/${orgId}`, {
        params: { page, size }
      });
      return data.body || data;
    } catch (error) {
      console.error(`Failed to fetch activities for org ${orgId}`, error);
      throw error;
    }
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

  searchUsers: async (orgId: string, search: string, page = 0, size = 10): Promise<PaginatedResponse<User>> => {
    try {
      const { data } = await api.get(`/users/${orgId}/available`, {
        params: { search, page, size }
      });
      const body = data.body || data;
      return {
        ...body,
        content: (body.content || []).map((u: any) => ({
          ...u,
          id: String(u.id),
          name: `${u.firstName || ''} ${u.lastName || ''}`.trim()
        }))
      };
    } catch (error) {
      console.error("Failed to search users", error);
      throw error;
    }
  },

  inviteUser: async (orgId: string, userId: string, note?: string): Promise<void> => {
    try {
      const response = await api.post(`/memberships/${orgId}/invite/${userId}`, { note: note || '' });
      if (response.data && response.data.success === false) {
        throw new Error(response.data.message || 'Failed to send invitation');
      }
    } catch (error: any) {
      console.log(`Failed to invite user ${userId} to org ${orgId}`, error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error instanceof Error ? error : new Error('Failed to send invitation');
    }
  },

  cancelInvitation: async (invId: string): Promise<void> => {
    await delay(400);
  },

  approveJoinRequest: async (reqId: string): Promise<void> => {
    try {
      await api.post(`/memberships/${reqId}/accept`);
    } catch (error) {
      console.error(`Failed to approve request ${reqId}`, error);
      throw error;
    }
  },

  rejectJoinRequest: async (reqId: string, reason?: string): Promise<void> => {
    try {
      // If the backend accepts a reason, we can pass it in the body. The user didn't mention it, 
      // but we will send it just in case, or leave it empty. Let's pass {} for now.
      await api.post(`/memberships/${reqId}/reject`, reason ? { reason } : {});
    } catch (error) {
      console.error(`Failed to reject request ${reqId}`, error);
      throw error;
    }
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

  updateOrganization: async (orgId: string, payload: Partial<Organization>): Promise<Organization> => {
    try {
      const { data } = await api.put(`/organizations/${orgId}`, {
        name: payload.name,
        description: payload.description,
        logoUrl: payload.logoUrl || ""
      });
      const orgData = data?.body || data?.data || data;
      return {
        ...orgData,
        id: String(orgData.id)
      };
    } catch (error) {
      console.error(`Failed to update organization ${orgId}`, error);
      throw error;
    }
  },

  createOrganization: async (name: string, description: string | undefined, userId: string): Promise<Organization> => {
    // 1. Call real backend API
    const { data } = await api.post('/organizations/create', { 
      name, 
      description, 
      logoUrl: null 
    });

    const orgData = data.data || data;

    // 2. Map response to frontend model
    const newOrg: Organization = {
      ...orgData,
      id: String(orgData.id), // Backend returns Long id, frontend expects string
      ownerId: userId, // Ensure ownerId exists for local UI handling until fully integrated
    };

    return newOrg;
  }
};
