'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { appointmentService } from '@/services/appointmentService';
import { AppointmentCard } from '@/components/appointment/AppointmentCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Calendar as CalendarIcon, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { AppointmentStatus } from '@/types';

export default function MyAppointmentsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: () => appointmentService.getAppointments(),
  });

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(search.toLowerCase()) || 
                          app.organizer?.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    upcoming: appointments.filter(a => a.status === 'APPROVED' && new Date(a.startTime) > new Date()).length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
    pending: appointments.filter(a => a.status === 'PENDING').length,
    rejected: appointments.filter(a => a.status === 'REJECTED').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-2">Manage and view your upcoming schedule.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Upcoming" value={stats.upcoming} icon={CalendarIcon} color="text-emerald-600" bg="bg-emerald-100" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="text-amber-600" bg="bg-amber-100" />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} color="text-primary" bg="bg-blue-100" />
        <StatCard title="Rejected" value={stats.rejected} icon={XCircle} color="text-red-600" bg="bg-red-100" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl shadow-sm border border-border">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search appointments..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="pl-9"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'ALL')}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="APPROVED">Approved</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-xl border border-border shadow-sm">
          <CalendarIcon className="mx-auto h-12 w-12 text-slate-300" />
          <h3 className="mt-4 text-lg font-medium text-foreground">No appointments found</h3>
          <p className="mt-1 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAppointments.map(app => (
            <AppointmentCard key={app.id} appointment={app} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: { title: string, value: number, icon: any, color: string, bg: string }) {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-full ${bg} ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
