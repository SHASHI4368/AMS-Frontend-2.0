'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function PricingPreview() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals and small teams getting started.",
      features: [
        "Up to 5 members",
        "Basic calendar view",
        "Standard email support",
        "1 Organization"
      ],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Everything you need to manage growing organizations.",
      features: [
        "Up to 50 members",
        "Live socket synchronization",
        "Role-based managers",
        "Priority support",
        "Unlimited Organizations"
      ],
      buttonText: "Start Free Trial",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Advanced security and control for large scale operations.",
      features: [
        "Unlimited members",
        "SSO & Google Workspace Auth",
        "Custom API Access",
        "Dedicated account manager",
        "Audit logs"
      ],
      buttonText: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-card/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground">
            Actual billing will be integrated later. These are preview plans for demonstration purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col ${
                plan.highlighted 
                  ? 'bg-foreground text-background shadow-2xl scale-105 border border-foreground ring-4 ring-foreground/10' 
                  : 'bg-background text-foreground border border-border shadow-sm'
              }`}
            >
              <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-background' : 'text-foreground'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 h-10 ${plan.highlighted ? 'text-background/80' : 'text-muted-foreground'}`}>
                {plan.description}
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-black">{plan.price}</span>
                {plan.period && <span className={`text-sm ${plan.highlighted ? 'text-background/80' : 'text-muted-foreground'}`}>{plan.period}</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`h-5 w-5 shrink-0 ${plan.highlighted ? 'text-accent' : 'text-foreground'}`} />
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="w-full mt-auto">
                <Button 
                  className={`w-full h-12 rounded-xl text-base font-bold ${
                    plan.highlighted 
                      ? 'bg-background text-foreground hover:bg-background/90' 
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
