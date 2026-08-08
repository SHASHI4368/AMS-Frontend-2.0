'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Plus, Calendar as CalendarIcon, Clock, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CalendarPreview() {
  const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];
  const days = ['Mon 21', 'Tue 22', 'Wed 23', 'Thu 24', 'Fri 25'];

  return (
    <section className="py-24 bg-card/50 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            A familiar, powerful interface.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built our calendar from the ground up to feel instantly intuitive. If you know how to use Google Calendar, you already know how to use AMS.
          </p>
        </div>

        {/* Calendar UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-background rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col h-[700px]"
        >
          {/* Topbar */}
          <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-foreground" />
                <span className="font-bold text-xl">Calendar</span>
              </div>
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full h-10 px-5 font-medium shadow-sm">
                <Plus className="h-4 w-4 mr-2" /> Create
              </Button>
              <Button variant="outline" className="rounded-full px-4 h-10 font-medium">Today</Button>
              <div className="flex items-center gap-2 text-foreground">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronLeft className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><ChevronRight className="h-5 w-5" /></Button>
                <span className="font-semibold text-lg ml-2">October 2026</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search events" 
                  className="bg-background border border-border rounded-full h-10 pl-9 pr-4 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-accent"
                  disabled
                />
              </div>
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent border border-accent/20">
                JD
              </div>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-card/30 p-6 flex flex-col gap-8 hidden lg:flex">
              {/* Mini Calendar (Fake) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-sm">October 2026</span>
                  <div className="flex gap-1">
                    <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-muted-foreground">
                  <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                  {/* Just some fake dates */}
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className={`h-7 w-7 flex items-center justify-center rounded-full ${i === 23 ? 'bg-accent text-background' : 'hover:bg-muted'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div>
                <span className="font-medium text-sm text-muted-foreground mb-4 block">My Calendars</span>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input type="checkbox" checked readOnly className="rounded-sm accent-green-500" />
                    Approved
                  </label>
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input type="checkbox" checked readOnly className="rounded-sm accent-yellow-500" />
                    Pending
                  </label>
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input type="checkbox" checked readOnly className="rounded-sm accent-red-500" />
                    Rejected
                  </label>
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input type="checkbox" checked readOnly className="rounded-sm accent-blue-500" />
                    Completed
                  </label>
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <input type="checkbox" checked readOnly className="rounded-sm accent-gray-500" />
                    Blocked
                  </label>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="flex-1 flex flex-col">
              {/* Header Row */}
              <div className="flex border-b border-border pl-16">
                {days.map((day, i) => (
                  <div key={day} className="flex-1 py-3 text-center border-l border-border relative">
                    <span className="text-xs font-semibold text-muted-foreground uppercase">{day.split(' ')[0]}</span>
                    <div className={`text-2xl font-light mt-1 ${i === 3 ? 'h-10 w-10 bg-accent text-background rounded-full mx-auto flex items-center justify-center shadow-md' : 'text-foreground'}`}>
                      {day.split(' ')[1]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="flex-1 overflow-hidden relative flex">
                {/* Time Axis */}
                <div className="w-16 flex flex-col shrink-0 border-r border-border bg-card/10">
                  {times.map(time => (
                    <div key={time} className="h-20 border-b border-transparent relative">
                      <span className="absolute -top-2.5 right-2 text-xs text-muted-foreground font-medium">{time.split(' ')[0]} {time.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>

                {/* Grid Columns */}
                <div className="flex-1 flex relative">
                  
                  {/* Current Time Line */}
                  <div className="absolute top-[35%] left-0 w-full h-px bg-red-500 z-20 flex items-center shadow-sm pointer-events-none">
                    <div className="h-2 w-2 rounded-full bg-red-500 absolute -left-1" />
                  </div>

                  {days.map((day, i) => (
                    <div key={day} className="flex-1 border-l border-border relative border-b-0 h-full">
                      {/* Grid lines */}
                      {times.map(t => (
                        <div key={t} className="h-20 border-b border-border/50" />
                      ))}

                      {/* Mock Appointments */}
                      {i === 1 && (
                        <div className="absolute top-5 left-1 right-1 h-16 bg-yellow-100 border-l-4 border-yellow-500 rounded p-1.5 shadow-sm text-yellow-900 z-10 overflow-hidden">
                          <p className="text-xs font-bold truncate">Q4 Planning (Pending)</p>
                          <p className="text-[10px] truncate opacity-80">08:15 AM - 09:00 AM</p>
                        </div>
                      )}
                      
                      {i === 2 && (
                        <>
                          <div className="absolute top-24 left-1 right-1 h-32 bg-green-100 border-l-4 border-green-500 rounded p-1.5 shadow-sm text-green-900 z-10 overflow-hidden">
                            <p className="text-xs font-bold truncate">Client Presentation</p>
                            <p className="text-[10px] truncate opacity-80">09:30 AM - 11:00 AM</p>
                            <p className="text-[10px] font-medium mt-1">✓ Approved</p>
                          </div>
                          <div className="absolute top-[260px] left-1 right-1 h-20 bg-gray-100 border-l-4 border-gray-500 rounded p-1.5 shadow-sm text-gray-700 z-10 overflow-hidden repeating-linear-gradient">
                            <p className="text-xs font-bold truncate">Focus Time</p>
                            <p className="text-[10px] font-medium mt-1">Blocked</p>
                          </div>
                        </>
                      )}

                      {i === 3 && (
                        <div className="absolute top-[400px] left-1 right-1 h-16 bg-red-100 border-l-4 border-red-500 rounded p-1.5 shadow-sm text-red-900 z-10 overflow-hidden opacity-60">
                          <p className="text-xs font-bold truncate line-through">Sync Call</p>
                          <p className="text-[10px] font-medium mt-1">✗ Rejected</p>
                        </div>
                      )}

                      {i === 4 && (
                        <div className="absolute top-0 left-1 right-1 h-20 bg-blue-100 border-l-4 border-blue-500 rounded p-1.5 shadow-sm text-blue-900 z-10 overflow-hidden">
                          <p className="text-xs font-bold truncate">Team Standup</p>
                          <p className="text-[10px] truncate opacity-80">08:00 AM - 09:00 AM</p>
                          <p className="text-[10px] font-medium mt-1">✓ Completed</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Panel (Upcoming) */}
            <div className="w-72 border-l border-border bg-card/30 p-6 hidden xl:block">
              <div className="flex items-center justify-between mb-6">
                <span className="font-bold">Upcoming</span>
                <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="bg-background border border-border rounded-xl p-4 shadow-sm hover:border-accent transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded">Approved</span>
                    <span className="text-xs text-muted-foreground">In 30m</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">Product Sync</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> 10:30 AM - 11:30 AM
                  </div>
                </div>

                <div className="bg-background border border-border rounded-xl p-4 shadow-sm hover:border-accent transition-colors cursor-pointer opacity-70">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">Pending</span>
                  </div>
                  <h4 className="font-bold text-sm mb-1">Interview: Jane Doe</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> 02:00 PM - 03:00 PM
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
