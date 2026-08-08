'use client';

import { CalendarDays, Zap, Building, UserPlus, MailCheck, ShieldCheck, BellRing, Smartphone } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      title: 'Smart Calendar',
      description: 'Google Calendar style scheduling with drag-and-drop simplicity and visual time blocking.',
      icon: CalendarDays
    },
    {
      title: 'Live Updates',
      description: 'Socket-powered instant synchronization across all connected devices in real-time.',
      icon: Zap
    },
    {
      title: 'Organization Management',
      description: 'Create teams, invite members, and assign role-based managers to oversee schedules.',
      icon: Building
    },
    {
      title: 'Appointment Requests',
      description: 'Easy meeting requests with an intuitive approval workflow for managers and admins.',
      icon: UserPlus
    },
    {
      title: 'Email Verification',
      description: 'Secure account activation ensuring only verified members can join your organization.',
      icon: MailCheck
    },
    {
      title: 'Google Authentication',
      description: 'Frictionless, one-click sign in for users who prefer using their Google Workspace accounts.',
      icon: ShieldCheck
    },
    {
      title: 'Real-time Notifications',
      description: 'Never miss a beat with instant in-app alerts for new requests, approvals, and changes.',
      icon: BellRing
    },
    {
      title: 'Responsive Design',
      description: 'Flawless experience across desktops, laptops, tablets, and mobile devices.',
      icon: Smartphone
    }
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent font-bold tracking-wider uppercase text-sm mb-4 block">Enterprise Features</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Everything you need to manage time.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A comprehensive suite of tools designed to remove the friction from scheduling, letting your team focus on the work that matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
