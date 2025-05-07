
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { TopDestinations } from '@/components/TopDestinations';
import { AgendaSection } from '@/components/AgendaSection';
import { UMKMShowcase } from '@/components/UMKMShowcase';
import { PromoSection } from '@/components/PromoSection';
import { KecamatanSection } from '@/components/KecamatanSection';
import ScrollAnimations from '@/components/ScrollAnimations';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <HeroSection />
        <div className="animate-on-scroll">
          <TopDestinations />
        </div>
        <div className="animate-on-scroll">
          <PromoSection />
        </div>
        <div className="animate-on-scroll">
          <AgendaSection />
        </div>
        <div className="animate-on-scroll">
          <UMKMShowcase />
        </div>
        <div className="animate-on-scroll">
          <KecamatanSection />
        </div>
      </main>
      <Footer />
      <ScrollAnimations />
    </div>
  );
};

export default Index;
