export type UserRole = 'USER' | 'ADMIN' | 'MANAGER';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  name?: string; // For backwards compatibility with UI components
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Profile extends User {
  phone?: string;
  bio?: string;
  workingHours?: {
    start: string; // e.g., "09:00"
    end: string;   // e.g., "17:00"
  };
  slotDuration?: number; // in minutes
  language?: string;
}

export type AppointmentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'BLOCKED';

export interface Appointment {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: AppointmentStatus;
  organizerId: string;
  participantId?: string;
  organizer?: User;
  participant?: User;
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  ownerId: string;
  createdAt: string;
}

export type MembershipStatus = 'PENDING' | 'ACTIVE' | 'REJECTED';

export interface Membership {
  id: string;
  organizationId: string;
  userId: string;
  role: 'MEMBER' | 'MANAGER';
  status: MembershipStatus;
  joinedAt?: string;
  user?: User;
  reason?: string;
  department?: string;
}

export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role: 'MEMBER' | 'MANAGER';
  status: 'PENDING' | 'ACCEPTED' | 'EXPIRED';
  invitedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'APPOINTMENT_REQUEST' | 'APPOINTMENT_APPROVAL' | 'APPOINTMENT_REJECTION' | 'TIME_CHANGE' | 'ORG_INVITE' | 'ORG_APPROVAL' | 'MEMBER_REMOVED';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
  type: 'APPOINTMENT' | 'BLOCKED_SLOT' | 'REQUEST';
  status?: AppointmentStatus;
  data?: Appointment | BlockedSlot | MeetingRequest;
}

export interface MeetingRequest {
  id: string;
  title: string;
  reason: string;
  description?: string;
  duration: number; // in minutes
  startTime: string;
  endTime: string;
  requesterId: string;
  targetUserId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface BlockedSlot {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  reason?: string;
}

export interface OrganizationActivity {
  id: string;
  organizationId: string;
  userId?: string;
  type: 'JOINED' | 'REQUESTED' | 'INVITED' | 'REMOVED' | 'PROMOTED' | 'DEMOTED' | 'UPDATED' | 'APPROVED' | 'REJECTED';
  description: string;
  createdAt: string;
}

export interface OrganizationStatistics {
  totalMembers: number;
  totalManagers: number;
  pendingRequests: number;
  pendingInvitations: number;
  appointmentsThisMonth: number;
  upcomingMeetings: number;
}
