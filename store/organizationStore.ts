import { create } from 'zustand';
import { Organization, Membership, Invitation, OrganizationActivity, OrganizationStatistics } from '../types';

interface OrganizationState {
  organizations: Organization[];
  memberships: Membership[];
  myOrganizations: Organization[];
  selectedOrganization: Organization | null;
  members: Membership[];
  pendingRequests: Membership[];
  invitations: Invitation[];
  activity: OrganizationActivity[];
  statistics: OrganizationStatistics | null;
  isLoading: boolean;
  searchQuery: string;
  
  setOrganizations: (organizations: Organization[]) => void;
  setMemberships: (memberships: Membership[]) => void;
  setMyOrganizations: (orgs: Organization[]) => void;
  setSelectedOrganization: (org: Organization | null) => void;
  setMembers: (members: Membership[]) => void;
  setPendingRequests: (requests: Membership[]) => void;
  setInvitations: (invitations: Invitation[]) => void;
  setActivity: (activity: OrganizationActivity[]) => void;
  setStatistics: (statistics: OrganizationStatistics | null) => void;
  setIsLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  organizations: [],
  memberships: [],
  myOrganizations: [],
  selectedOrganization: null,
  members: [],
  pendingRequests: [],
  invitations: [],
  activity: [],
  statistics: null,
  isLoading: false,
  searchQuery: '',

  setOrganizations: (organizations) => set({ organizations }),
  setMemberships: (memberships) => set({ memberships }),
  setMyOrganizations: (myOrganizations) => set({ myOrganizations }),
  setSelectedOrganization: (selectedOrganization) => set({ selectedOrganization }),
  setMembers: (members) => set({ members }),
  setPendingRequests: (pendingRequests) => set({ pendingRequests }),
  setInvitations: (invitations) => set({ invitations }),
  setActivity: (activity) => set({ activity }),
  setStatistics: (statistics) => set({ statistics }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));
