'use client';

import { motion } from 'framer-motion';
import { CalendarCheck2, CheckCircle2, BellRing, Clock } from 'lucide-react';

export function HeroIllustration() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      } 
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 10, -10],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const }
    }
  };

  return (
    <motion.div 
      className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-accent/5 rounded-[4rem] transform rotate-3 -z-10" />
      <div className="absolute inset-0 bg-card rounded-[4rem] border border-border shadow-2xl overflow-hidden" />

      {/* Main Mockup Container */}
      <div className="absolute inset-4 bg-background rounded-[3rem] border border-border/50 p-6 flex flex-col shadow-inner">
        {/* Mock Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 bg-muted rounded-full" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="h-8 w-8 rounded-full bg-foreground" />
          </div>
        </div>

        {/* Mock Content */}
        <div className="flex-1 flex gap-4">
          {/* Mock Sidebar */}
          <div className="w-1/4 hidden md:flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 w-full bg-muted/50 rounded-md" />
            ))}
          </div>
          {/* Mock Calendar Grid */}
          <div className="flex-1 grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-muted/30 rounded-lg border border-border/50" />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Card 1: New Request */}
      <motion.div 
        variants={cardVariants}
        className="absolute -left-6 top-24"
      >
        <motion.div 
          variants={floatVariants}
          initial="initial"
          animate="animate"
          className="bg-card p-4 rounded-xl border border-border shadow-xl flex items-start gap-4 w-[260px]"
        >
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">New Request</h4>
            <p className="text-xs text-muted-foreground mt-1">Marketing Sync</p>
            <div className="flex gap-2 mt-3">
              <div className="h-6 w-16 bg-foreground text-background text-[10px] font-bold rounded flex items-center justify-center">Approve</div>
              <div className="h-6 w-16 bg-muted text-muted-foreground text-[10px] font-bold rounded flex items-center justify-center">Decline</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Card 2: Approved Meeting */}
      <motion.div 
        variants={cardVariants}
        className="absolute -right-8 top-12"
      >
        <motion.div 
          variants={floatVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="bg-card p-4 rounded-xl border border-border shadow-xl flex items-center gap-3 w-[220px]"
        >
          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Meeting Approved</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Tomorrow at 10:00 AM</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Card 3: Live Notification */}
      <motion.div 
        variants={cardVariants}
        className="absolute -right-4 bottom-32"
      >
        <motion.div 
          variants={floatVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="bg-foreground text-background p-4 rounded-xl shadow-2xl flex items-center gap-3 w-[240px]"
        >
          <div className="h-10 w-10 rounded-full bg-background/20 flex items-center justify-center shrink-0">
            <BellRing className="h-5 w-5 text-background" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Live Update</h4>
            <p className="text-xs text-background/80 mt-0.5">Sarah joined the organization</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Card 4: Calendar Event */}
      <motion.div 
        variants={cardVariants}
        className="absolute left-10 bottom-16"
      >
        <motion.div 
          variants={floatVariants}
          initial="initial"
          animate="animate"
          style={{ animationDelay: '0.5s' }}
          className="bg-card p-4 rounded-xl border border-border shadow-xl flex gap-4 w-[280px]"
        >
          <div className="flex flex-col items-center justify-center bg-muted rounded-lg px-3 py-2 shrink-0">
            <span className="text-xs font-bold text-accent uppercase">Oct</span>
            <span className="text-xl font-black text-foreground">24</span>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-foreground">Q4 Planning</h4>
            <div className="flex items-center gap-1.5 mt-1">
              <CalendarCheck2 className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">02:00 PM - 04:00 PM</span>
            </div>
            <div className="flex -space-x-2 mt-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-6 rounded-full bg-foreground border-2 border-card" />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

    </motion.div>
  );
}
