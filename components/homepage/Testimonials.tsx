'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Operations Director",
      company: "TechFlow Solutions",
      content: "AMS completely revolutionized how we handle cross-department meetings. The Google Calendar integration is flawless and the live updates save us hours of back-and-forth.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Clinic Manager",
      company: "Westside Health",
      content: "Managing 50+ doctors and hundreds of patient requests was a nightmare before AMS. The organization-level approvals workflow is exactly what we needed to maintain order.",
      avatar: "MC"
    },
    {
      name: "Elena Rodriguez",
      role: "HR Lead",
      company: "GlobalEd University",
      content: "The easiest onboarding experience we've ever had with a SaaS product. We invited 500 staff members and they were all scheduling appointments within minutes.",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Loved by teams worldwide.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow"
            >
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              
              <p className="text-foreground text-lg mb-8 leading-relaxed font-medium">
                "{t.content}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
