
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { TopDestinations } from '@/components/TopDestinations';
import { AgendaSection } from '@/components/AgendaSection';
import { UMKMShowcase } from '@/components/UMKMShowcase';
import { PromoSection } from '@/components/PromoSection';
import { KecamatanSection } from '@/components/KecamatanSection';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TopDestinations />
        <PromoSection />
        <AgendaSection />
        <UMKMShowcase />
        <KecamatanSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
