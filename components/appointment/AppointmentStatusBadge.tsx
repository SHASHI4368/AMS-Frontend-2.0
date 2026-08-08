import { AppointmentStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  const statusConfig: Record<AppointmentStatus, { label: string; className: string }> = {
    PENDING: { label: 'Pending', className: 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200' },
    APPROVED: { label: 'Approved', className: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200' },
    REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200' },
    COMPLETED: { label: 'Completed', className: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200' },
    BLOCKED: { label: 'Blocked', className: 'bg-muted text-slate-800 hover:bg-slate-200 border-border' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={cn("font-medium", config.className)}>
      {config.label}
    </Badge>
  );
}
