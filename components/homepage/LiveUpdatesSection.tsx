'use client';

import { motion } from 'framer-motion';
import { RefreshCw, User, Laptop, Bell, CheckCircle } from 'lucide-react';

export function LiveUpdatesSection() {
  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { pathLength: { delay: 0.5, type: "spring" as const, duration: 1.5, bounce: 0 }, opacity: { delay: 0.5, duration: 0.01 } } 
    }
  };

  const pulseCircle = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { delay: 1.8, type: "spring" as const, stiffness: 200, damping: 10 }
    }
  };

  return (
    <section className="py-32 bg-foreground text-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 text-background text-sm font-semibold mb-6">
              <RefreshCw className="h-4 w-4 animate-spin-slow" />
              Socket.io Powered
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Real-time magic. <br />No refreshing required.
            </h2>
            <p className="text-xl text-background/70 leading-relaxed mb-8">
              When a manager approves an appointment, the user sees it instantly. When a slot is booked, it disappears for everyone else immediately. Experience true live collaboration.
            </p>
            
            <ul className="space-y-4 text-background/80">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-accent" /> Meeting accepted instantly.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-accent" /> Live push notifications.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-accent" /> Calendars synchronized globally.
              </li>
            </ul>
          </div>

          {/* Animation Illustration */}
          <div className="relative h-[400px] bg-background/5 rounded-3xl border border-background/10 p-8 flex items-center justify-between">
            
            {/* User 1 (Manager) */}
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="bg-background text-foreground p-4 rounded-2xl shadow-xl flex flex-col items-center gap-2 w-32 border border-border">
                <User className="h-8 w-8 text-accent" />
                <span className="font-bold text-sm">Manager</span>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-accent text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
              >
                Approve Meeting
              </motion.div>
            </div>

            {/* Connecting Socket Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <motion.path
                d="M 160 200 C 250 200, 350 200, 480 200"
                fill="transparent"
                stroke="rgba(255,107,74,0.5)"
                strokeWidth="4"
                strokeDasharray="8 8"
                variants={drawLine}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <motion.circle 
                cx="320" cy="200" r="24" 
                fill="#111" 
                stroke="#FF6B4A" 
                strokeWidth="2"
                variants={pulseCircle}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </svg>
            
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              variants={pulseCircle}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <RefreshCw className="h-6 w-6 text-accent animate-spin" />
            </motion.div>

            {/* User 2 (Employee) */}
            <div className="flex flex-col items-center gap-4 z-10">
              <div className="bg-background text-foreground p-4 rounded-2xl shadow-xl flex flex-col items-center gap-2 w-32 border border-border">
                <Laptop className="h-8 w-8 text-accent" />
                <span className="font-bold text-sm">Employee</span>
              </div>
              
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 2.2, type: "spring" }}
                  className="bg-background text-foreground px-4 py-2 rounded-xl text-xs font-bold shadow-xl border border-border flex items-center gap-2 absolute -bottom-16 -left-12 w-48"
                >
                  <Bell className="h-4 w-4 text-accent" />
                  Request Approved!
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
