'use client';

import { motion } from 'framer-motion';

export function Statistics() {
  const stats = [
    { value: '25,000+', label: 'Appointments Managed' },
    { value: '500+', label: 'Organizations' },
    { value: '10,000+', label: 'Users' },
    { value: '99.9%', label: 'Availability' },
  ];

  return (
    <section className="py-20 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <h3 className="text-4xl md:text-5xl font-black text-foreground">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
