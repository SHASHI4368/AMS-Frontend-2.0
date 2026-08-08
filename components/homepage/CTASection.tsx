'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground to-foreground/90 -z-10" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 -z-10" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-background tracking-tight mb-8">
          Ready to simplify appointment scheduling?
        </h2>
        <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto">
          Join thousands of organizations that use AMS to save time, reduce friction, and align their teams effortlessly.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="h-14 px-10 bg-background text-foreground hover:bg-background/90 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-all">
              Create Free Account
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg font-bold border-background/20 text-background hover:bg-background/10 transition-all">
              Login to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
