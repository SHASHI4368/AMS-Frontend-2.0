'use client';

import { useState, useRef, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '@/services/organizationService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Loader2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/useDebounce';

export function UserSearch({ organizationId }: { organizationId: string }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const queryClient = useQueryClient();

  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ['search-users', organizationId, debouncedQuery],
    queryFn: ({ pageParam = 0 }) => organizationService.searchUsers(organizationId, debouncedQuery, pageParam, 10),
    getNextPageParam: (lastPage) => {
      if (!lastPage.last) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: debouncedQuery.length > 0,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { threshold: 1.0 });

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleInvite = async (email: string) => {
    toast.promise(organizationService.inviteUser(organizationId, email), {
      loading: 'Sending invitation...',
      success: () => {
        queryClient.invalidateQueries({ queryKey: ['org-invitations', organizationId] });
        return 'Invitation sent!';
      },
      error: 'Failed to send invitation',
    });
  };

  const users = data?.pages.flatMap(page => page.content) || [];

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by name or email..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 h-11"
        />
      </div>

      <div className="h-[300px] overflow-y-auto border border-border rounded-lg p-2 bg-muted/10">
        {!query ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-10">
            <Search className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-sm">Start typing to search for users.</p>
          </div>
        ) : isLoading ? (
          <div className="h-full flex flex-col items-center justify-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : users.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-10">
            <p className="text-sm">No users found matching &quot;{query}&quot;</p>
          </div>
        ) : (
          <ul className="space-y-1">
            {users.map(u => (
              <li key={u.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    {u.avatarUrl && <AvatarImage src={u.avatarUrl} alt={u.name} />}
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">{u.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
                <Button size="sm" variant="secondary" onClick={() => handleInvite(u.email)} className="h-8 text-xs font-semibold">
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Invite
                </Button>
              </li>
            ))}
            {hasNextPage && (
              <div ref={loadMoreRef} className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
