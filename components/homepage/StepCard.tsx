'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export function StepCard({ number, title, description, icon, delay = 0 }: StepCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="relative pl-12 md:pl-0 md:pt-12"
    >
      {/* Mobile timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:hidden" />
      
      {/* Step Number Badge */}
      <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm z-10 md:-top-4 md:left-6 shadow-md border-4 border-background">
        {number}
      </div>

      <div className="bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
        <div className="h-10 w-10 rounded-lg bg-card flex items-center justify-center mb-4 text-accent">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
