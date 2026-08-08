'use client';

import { ToolbarProps } from 'react-big-calendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Settings, Download, Search, LayoutGrid } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export function CalendarToolbar(props: ToolbarProps) {
  const { label, onNavigate, onView, view, views } = props;

  const navigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    onNavigate(action);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
        <h2 className="text-xl font-bold text-foreground w-48 shrink-0">{label}</h2>
        <div className="flex items-center gap-1">
          <Button variant="outline" className="h-9 px-4" onClick={() => navigate('TODAY')}>
            Today
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => navigate('PREV')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={() => navigate('NEXT')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
        <div className="relative hidden md:block">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search events..." 
            className="h-9 pl-9 w-[200px] bg-background border-border focus-visible:ring-1"
          />
        </div>
        
        <Select value={view} onValueChange={(val) => onView(val as any)}>
          <SelectTrigger className="h-9 w-[120px] bg-background">
            <SelectValue placeholder="View" />
          </SelectTrigger>
          <SelectContent>
            {(views as string[]).map((v) => (
              <SelectItem key={v} value={v} className="capitalize">
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-1 border-l border-border pl-3 ml-1">
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
