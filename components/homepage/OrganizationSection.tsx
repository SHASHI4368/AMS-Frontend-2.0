'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Briefcase, CalendarCheck, ShieldCheck } from 'lucide-react';

export function OrganizationSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <section id="organizations" className="py-24 bg-card/30 border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Built for entire organizations.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Not just single users. Create organizations, assign managers, invite employees, and oversee all appointments in one unified workspace.
          </p>
        </div>

        {/* Tree Diagram Illustration */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-px bg-border -translate-x-1/2 z-0" />

          {/* Level 1: Organization */}
          <motion.div variants={item} className="relative z-10 flex justify-center mb-16">
            <div className="bg-background border-2 border-accent p-6 rounded-2xl shadow-xl flex items-center gap-4 w-72">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Root</span>
                <h3 className="font-bold text-lg text-foreground">Organization</h3>
              </div>
            </div>
          </motion.div>

          {/* Level 2: Managers */}
          <motion.div variants={item} className="relative z-10 flex justify-center mb-16">
            <div className="bg-background border border-border p-6 rounded-2xl shadow-lg flex items-center gap-4 w-64 relative">
              <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Admins</span>
                <h3 className="font-bold text-base text-foreground">Managers</h3>
              </div>
              
              {/* Branching horizontal line for level 2 */}
              <div className="absolute top-1/2 -left-12 w-12 h-px bg-border" />
              <div className="absolute top-1/2 -right-12 w-12 h-px bg-border" />
            </div>
          </motion.div>

          {/* Level 3: Employees & Appointments */}
          <div className="relative z-10 flex justify-between px-10 md:px-24">
            <motion.div variants={item} className="bg-background border border-border p-5 rounded-2xl shadow-md flex items-center gap-3 w-48 relative">
              <div className="absolute -top-16 left-1/2 w-px h-16 bg-border -translate-x-1/2" />
              <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Members</span>
                <h3 className="font-bold text-sm text-foreground">Employees</h3>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-background border border-border p-5 rounded-2xl shadow-md flex items-center gap-3 w-48 relative">
              <div className="absolute -top-16 left-1/2 w-px h-16 bg-border -translate-x-1/2" />
              <div className="h-8 w-8 rounded-lg bg-card flex items-center justify-center shrink-0">
                <CalendarCheck className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Events</span>
                <h3 className="font-bold text-sm text-foreground">Appointments</h3>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
