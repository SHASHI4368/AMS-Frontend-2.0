'use client';

import { Menu, Search, Bell, CalendarCheck2, Building, Settings, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNotificationStore } from '@/store/notificationStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { notificationService } from '@/services/notificationService';
import { useEffect } from 'react';

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { notifications, setNotifications } = useNotificationStore();
  
  const { data: notifData } = useQuery({
    queryKey: ['notifications-topbar'],
    queryFn: () => notificationService.getNotifications(0, 50), // fetch recent for unread count
    enabled: !!user,
    refetchInterval: 60000, // optionally poll every minute
  });

  useEffect(() => {
    if (notifData?.content) {
      setNotifications(notifData.content);
    }
  }, [notifData, setNotifications]);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { name: 'My Appointments', href: '/my-appointments', icon: CalendarCheck2 },
    { name: 'My Calendar', href: '/calendar/me', icon: CalendarCheck2 },
    { name: 'Organizations', href: '/organizations', icon: Building },
  ];

  const handleLogout = async () => {
    await authService.logout();
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b border-border">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex h-20 items-center max-w-7xl mx-auto w-full justify-between">
        
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/my-appointments" className="flex items-center space-x-2">
            <div className="font-bold text-2xl tracking-tight text-foreground flex items-center gap-2 group">
              <div className="h-8 w-8 bg-foreground rounded-md flex items-center justify-center group-hover:bg-accent transition-colors">
                <CalendarCheck2 className="h-5 w-5 text-background" />
              </div>
              <span>AMS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname.startsWith(item.href) ? "text-foreground border-b-2 border-foreground -mb-[30px] pb-[28px]" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive border-2 border-background box-content animate-pulse" />
              )}
            </Button>
          </Link>

          <div className="hidden md:flex items-center gap-3 border-l border-border pl-4 ml-2">
            <div className="flex flex-col items-end text-sm">
              <span className="font-medium text-foreground">{user?.name || 'User'}</span>
              <span className="text-xs text-muted-foreground">{user?.role || 'Guest'}</span>
            </div>
            
            {/* Desktop User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger render={
                <button type="button" className="outline-none focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-border hover:border-primary transition-all cursor-pointer">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback className="bg-muted text-muted-foreground">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                </button>
              } />
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} variant="destructive" className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-primary/10 hover:text-primary" />}>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px] bg-background border-border">
                <SheetHeader>
                  <SheetTitle className="text-left text-foreground text-xl font-bold mb-4 tracking-tight">AMS Portal</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        pathname.startsWith(item.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                      )}>
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </span>
                    </Link>
                  ))}
                  <div className="my-4 border-t border-border" />
                  <Link href="/profile">
                    <span className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors", pathname === '/profile' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                      <User className="h-5 w-5 shrink-0" />
                      Profile
                    </span>
                  </Link>
                  <Link href="/settings">
                    <span className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors", pathname === '/settings' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>
                      <Settings className="h-5 w-5 shrink-0" />
                      Settings
                    </span>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start px-3 mt-4 text-destructive hover:text-destructive hover:bg-destructive/10">
                    <LogOut className="h-5 w-5 shrink-0 mr-3" />
                    Log Out
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
        </div>
      </div>
    </header>
  );
}
