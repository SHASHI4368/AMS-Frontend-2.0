import { Navbar } from '@/components/homepage/Navbar';
import { Hero } from '@/components/homepage/Hero';
import { TrustedBy } from '@/components/homepage/TrustedBy';
import { Features } from '@/components/homepage/Features';
import { CalendarPreview } from '@/components/homepage/CalendarPreview';
import { LiveUpdatesSection } from '@/components/homepage/LiveUpdatesSection';
import { OrganizationSection } from '@/components/homepage/OrganizationSection';
import { HowItWorks } from '@/components/homepage/HowItWorks';
import { Statistics } from '@/components/homepage/Statistics';
import { Testimonials } from '@/components/homepage/Testimonials';
import { PricingPreview } from '@/components/homepage/PricingPreview';
import { FAQ } from '@/components/homepage/FAQ';
import { CTASection } from '@/components/homepage/CTASection';
import { Footer } from '@/components/homepage/Footer';

export const metadata = {
  title: 'Appointment Management System | Smart Scheduling for Organizations',
  description: 'Manage appointments, collaborate with teams, organize schedules, and streamline meetings with a modern appointment management platform.',
};

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <CalendarPreview />
        <LiveUpdatesSection />
        <OrganizationSection />
        <HowItWorks />
        <Statistics />
        <Testimonials />
        <PricingPreview />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
