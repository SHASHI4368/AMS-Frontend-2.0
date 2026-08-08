'use client';

import Link from 'next/link';
import { CalendarCheck2, Hash, Share2, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="h-8 w-8 bg-foreground rounded-md flex items-center justify-center group-hover:bg-accent transition-colors">
                <CalendarCheck2 className="h-5 w-5 text-background" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-foreground">AMS</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              The smart, real-time appointment management system built for modern organizations. Stop dealing with email ping-pong.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background hover:border-accent transition-colors">
                <Hash className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background hover:border-accent transition-colors">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background hover:border-accent transition-colors">
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-muted-foreground hover:text-accent transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link href="#faq" className="text-muted-foreground hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-accent transition-colors">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">API Reference</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-accent transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AMS, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
