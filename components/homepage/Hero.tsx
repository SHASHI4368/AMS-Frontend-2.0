'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { HeroIllustration } from './HeroIllustration';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 border border-accent/20">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              AMS 2.0 is Live
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.05] mb-6">
              Manage Appointments <br className="hidden lg:block" />
              <span className="text-muted-foreground">Smarter, Faster, Together.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              The all-in-one platform for organizations to manage appointments, synchronize calendars, and collaborate on scheduling seamlessly in one centralized hub.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 bg-foreground text-background hover:bg-foreground/90 rounded-full text-base font-bold shadow-xl shadow-foreground/10 hover:scale-105 transition-all">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-bold border-border hover:bg-muted hover:text-foreground transition-all">
                  <PlayCircle className="mr-2 h-5 w-5" /> View Demo
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required. Setup in minutes.
            </p>
          </motion.div>

          {/* Right: Vector Illustration */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none">
            <HeroIllustration />
          </div>

        </div>
      </div>
    </section>
  );
}
