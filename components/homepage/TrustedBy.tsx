'use client';

import { Building2, GraduationCap, HeartPulse, Laptop, Landmark, Rocket, LineChart } from 'lucide-react';
import { motion } from 'framer-motion';

export function TrustedBy() {
  const logos = [
    { icon: GraduationCap, name: 'University' },
    { icon: HeartPulse, name: 'Hospital' },
    { icon: Laptop, name: 'Software Co' },
    { icon: Landmark, name: 'Government' },
    { icon: Rocket, name: 'Startup' },
    { icon: LineChart, name: 'Finance' },
    { icon: Building2, name: 'Education' },
  ];

  return (
    <section className="py-12 border-y border-border bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by forward-thinking organizations
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <logo.icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-bold text-lg text-muted-foreground group-hover:text-foreground transition-colors">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
