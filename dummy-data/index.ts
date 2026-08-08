import { User, Profile, Appointment, Organization, Notification, Membership } from '../types';
import { addDays, subDays, startOfDay, addHours } from 'date-fns';

const today = startOfDay(new Date());

export const dummyUsers: User[] = [
  { id: 'u1', name: 'Alice Smith', email: 'alice@example.com', role: 'ADMIN', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
  { id: 'u2', name: 'Bob Jones', email: 'bob@example.com', role: 'MANAGER', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
  { id: 'u3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'USER', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
  { id: 'u4', name: 'David Lee', email: 'david@example.com', role: 'USER', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
  { id: 'u5', name: 'Eve Davis', email: 'eve@example.com', role: 'USER', avatarUrl: 'https://i.pravatar.cc/150?u=5' },
  { id: 'u6', name: 'Frank Miller', email: 'frank@example.com', role: 'USER', avatarUrl: 'https://i.pravatar.cc/150?u=6' },
];

export const dummyProfiles: Record<string, Profile> = {
  'u1': { ...dummyUsers[0], phone: '123-456-7890', bio: 'Admin of the system.', timezone: 'America/New_York' },
  'u2': { ...dummyUsers[1], phone: '098-765-4321', bio: 'Manager at TechCorp.', timezone: 'America/Los_Angeles' },
  'u3': { ...dummyUsers[2], phone: '555-555-5555', bio: 'Just a regular user.', timezone: 'Europe/London' },
};

export const dummyOrganizations: Organization[] = [
  { id: 'org1', name: 'TechCorp', description: 'A technology company', ownerId: 'u2', createdAt: new Date().toISOString() },
  { id: 'org2', name: 'DesignHub', description: 'Creative design agency', ownerId: 'u1', createdAt: new Date().toISOString() },
  { id: 'org3', name: 'Engineering Faculty', description: 'Computer Science & Engineering Department', ownerId: 'u3', createdAt: subDays(today, 90).toISOString() },
];

export const dummyMemberships: Membership[] = [
  { id: 'm1', organizationId: 'org1', userId: 'u2', role: 'MANAGER', status: 'ACTIVE', joinedAt: new Date().toISOString() },
  { id: 'm2', organizationId: 'org1', userId: 'u3', role: 'MEMBER', status: 'ACTIVE', joinedAt: new Date().toISOString() },
  { id: 'm3', organizationId: 'org2', userId: 'u3', role: 'MEMBER', status: 'ACTIVE', joinedAt: subDays(today, 10).toISOString() },
  { id: 'm4', organizationId: 'org3', userId: 'u3', role: 'MANAGER', status: 'ACTIVE', joinedAt: subDays(today, 90).toISOString() },
];

export const dummyAppointments: Appointment[] = [
  { 
    id: 'a1', title: 'Project Kickoff', 
    startTime: addHours(today, 10).toISOString(), 
    endTime: addHours(today, 11).toISOString(), 
    status: 'APPROVED', organizerId: 'u2', participantId: 'u3',
    organizer: dummyUsers[1], participant: dummyUsers[2],
    organizationId: 'org1'
  },
  { 
    id: 'a2', title: 'Design Sync', 
    startTime: addHours(addDays(today, 1), 14).toISOString(), 
    endTime: addHours(addDays(today, 1), 15).toISOString(), 
    status: 'PENDING', organizerId: 'u3', participantId: 'u2',
    organizer: dummyUsers[2], participant: dummyUsers[1],
    organizationId: 'org1'
  },
  { 
    id: 'a3', title: 'Weekly Standup', 
    startTime: addHours(subDays(today, 1), 9).toISOString(), 
    endTime: addHours(subDays(today, 1), 9.5).toISOString(), 
    status: 'COMPLETED', organizerId: 'u2', participantId: 'u3',
    organizer: dummyUsers[1], participant: dummyUsers[2],
    organizationId: 'org1'
  },
];

export const dummyNotifications: Notification[] = [
  { id: 'n1', userId: 'u3', type: 'APPOINTMENT_REQUEST', title: 'New Request', message: 'Bob requested a Design Sync.', isRead: false, createdAt: new Date().toISOString() },
  { id: 'n2', userId: 'u2', type: 'ORG_INVITE', title: 'Organization Invite', message: 'You have been invited to DesignHub.', isRead: true, createdAt: subDays(new Date(), 1).toISOString() },
];

export const dummyInvitations = [
  {
    id: 'inv_1',
    organizationId: 'org1',
    email: 'charlie@example.com', // matches u3
    role: 'MEMBER' as const,
    status: 'PENDING' as const,
    invitedAt: new Date().toISOString(),
    organization: dummyOrganizations[0],
    invitedBy: dummyUsers[1]
  }
];
