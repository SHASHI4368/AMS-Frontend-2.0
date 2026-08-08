'use client';

import { Button } from '@/components/ui/button';
import { Plus, CalendarPlus, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CalendarFAB({ isOwner }: { isOwner: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {isOwner && (
              <Button variant="secondary" className="h-12 px-4 shadow-lg rounded-full flex gap-3 font-semibold justify-end">
                <span>Block Time</span>
                <Clock className="h-4 w-4" />
              </Button>
            )}
            <Button className="h-12 px-4 shadow-lg rounded-full flex gap-3 font-semibold justify-end bg-primary">
              <span>{isOwner ? 'New Appointment' : 'Request Meeting'}</span>
              <CalendarPlus className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        size="icon-lg" 
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full shadow-xl bg-foreground text-background hover:bg-foreground/90 transition-transform hover:scale-105"
      >
        <Plus className={`h-6 w-6 transition-transform duration-300 ${open ? 'rotate-45' : 'rotate-0'}`} />
      </Button>
    </div>
  );
}
