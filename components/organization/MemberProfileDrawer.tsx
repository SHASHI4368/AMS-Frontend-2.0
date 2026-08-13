'use client';

import { Membership } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Mail, Shield, User, Building2, MessageSquare, LogOut, TrendingUp, TrendingDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface MemberProfileDrawerProps {
  member: Membership | null;
  isOpen: boolean;
  onClose: () => void;
  isManager: boolean;
  currentUserId: string;
}

export function MemberProfileDrawer({ member, isOpen, onClose, isManager, currentUserId }: MemberProfileDrawerProps) {
  if (!member || !member.user) return null;

  const user = member.user;
  const initials = user.name.substring(0, 2).toUpperCase();
  const isSelf = member.userId === currentUserId;
  const isTargetManager = member.role === 'MANAGER';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 overflow-y-auto">
        <div className="bg-muted/30 h-32 w-full relative">
          <div className="absolute -bottom-12 left-6 h-24 w-24 rounded-lg border-4 border-background bg-primary/10 flex items-center justify-center overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-primary">{initials}</span>
            )}
          </div>
        </div>
        
        <div className="pt-16 px-6 pb-6">
          <SheetHeader className="p-0 text-left">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold">{user.name}</SheetTitle>
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full uppercase tracking-wider
                ${isTargetManager ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-muted text-muted-foreground'}
              `}>
                {isTargetManager ? 'Manager' : 'Member'}
              </span>
            </div>
            <SheetDescription className="flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4" />
              {user.email}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-md p-4 shadow-sm">
                <p className="text-xs font-medium text-muted-foreground mb-1">Upcoming Meetings</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <div className="bg-card border border-border rounded-md p-4 shadow-sm">
                <p className="text-xs font-medium text-muted-foreground mb-1">Completed</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground border-b border-border pb-2">Organization Details</h4>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-muted p-2 rounded-lg"><Calendar className="h-4 w-4 text-muted-foreground" /></div>
                <div>
                  <p className="font-medium text-foreground">Joined</p>
                  <p className="text-muted-foreground">{member.joinedAt ? formatDistanceToNow(new Date(member.joinedAt)) : 'Unknown'} ago</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="bg-muted p-2 rounded-lg"><Building2 className="h-4 w-4 text-muted-foreground" /></div>
                <div>
                  <p className="font-medium text-foreground">Department</p>
                  <p className="text-muted-foreground">{member.department || 'General'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-border">
              {!isSelf && (
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message (Dummy)
                </Button>
              )}
              
              <Link href={`/calendar/${member.userId}`}>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Button>
              </Link>

              {isManager && !isSelf && (
                <div className="pt-4 flex gap-2">
                  {!isTargetManager ? (
                    <Button variant="outline" className="flex-1 border-primary/20 text-primary hover:bg-primary/10">
                      <TrendingUp className="h-4 w-4 mr-2" /> Promote
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1 text-amber-600 border-amber-200 hover:bg-amber-50">
                      <TrendingDown className="h-4 w-4 mr-2" /> Demote
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1 text-destructive border-destructive/20 hover:bg-destructive/10">
                    <LogOut className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
