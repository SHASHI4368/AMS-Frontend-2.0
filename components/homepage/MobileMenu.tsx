'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, CalendarCheck2 } from 'lucide-react';
import Link from 'next/link';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  
  const links = [
    { name: 'Features', href: '#features' },
    { name: 'Organizations', href: '#organizations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden text-foreground hover:bg-muted" />}>
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-background border-border">
        <SheetHeader>
          <SheetTitle className="text-left flex items-center gap-2 text-foreground text-xl font-bold mb-6">
            <CalendarCheck2 className="h-6 w-6 text-accent" />
            AMS
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="my-4 border-t border-border" />
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full justify-center h-12 text-base">
              Login
            </Button>
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)}>
            <Button className="w-full justify-center h-12 text-base bg-foreground text-background hover:bg-foreground/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
