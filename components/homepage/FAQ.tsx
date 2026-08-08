'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does appointment approval work?",
      answer: "When a user requests a time slot, it appears as 'Pending' on the manager's dashboard. The manager can review and click Approve or Decline. Upon approval, the slot is locked, and all relevant parties receive instant live notifications."
    },
    {
      question: "Can I create organizations?",
      answer: "Yes. Any user can create an organization. Once created, they become the root admin of that organization and can invite other users to join."
    },
    {
      question: "Can multiple managers exist?",
      answer: "Absolutely. You can promote multiple users to the Manager role within a single organization, allowing them to share the workload of approving appointments."
    },
    {
      question: "Does Google Login work?",
      answer: "Yes, we support seamless one-click authentication via Google Workspace, ensuring your team can login quickly and securely without remembering new passwords."
    },
    {
      question: "How are notifications sent?",
      answer: "We use Socket.io for live, real-time push notifications within the application. You'll see alerts instantly without ever needing to refresh the page."
    },
    {
      question: "Can appointments be rescheduled?",
      answer: "Currently, appointments must be cancelled and re-requested. A drag-and-drop rescheduling feature for managers is on our upcoming roadmap."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the platform.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border-border px-4 py-2 hover:bg-card/50 transition-colors rounded-lg border overflow-hidden"
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left font-semibold text-lg flex items-center justify-between py-2 focus:outline-none"
                >
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2 pb-2' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden text-muted-foreground text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
