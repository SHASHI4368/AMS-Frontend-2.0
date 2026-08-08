'use client';

import { StepCard } from './StepCard';
import { UserPlus, Building, CalendarPlus, Handshake } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up securely using your Email or utilize one-click Google Authentication to get started instantly.',
      icon: <UserPlus className="h-5 w-5" />
    },
    {
      number: '2',
      title: 'Join Organization',
      description: 'Create your own organization workspace or accept an invite link to join your existing company team.',
      icon: <Building className="h-5 w-5" />
    },
    {
      number: '3',
      title: 'Request Appointment',
      description: 'Navigate to the shared calendar and select an available time slot that works for your schedule.',
      icon: <CalendarPlus className="h-5 w-5" />
    },
    {
      number: '4',
      title: 'Meet',
      description: 'A manager approves your request instantly, notifying all parties and locking the slot on the calendar.',
      icon: <Handshake className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            How it works
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We have streamlined the process so you can go from zero to booked in less than two minutes.
          </p>
        </div>

        <div className="relative">
          {/* Desktop horizontal timeline line */}
          <div className="absolute top-8 left-6 right-6 h-px bg-border hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {steps.map((step, index) => (
              <StepCard 
                key={step.number}
                {...step}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
