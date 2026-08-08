'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarCheck2 } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Organizations', href: '#organizations' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 bg-foreground rounded-md flex items-center justify-center group-hover:bg-accent transition-colors">
            <CalendarCheck2 className="h-5 w-5 text-background" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-foreground">AMS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:bg-muted font-medium">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}
