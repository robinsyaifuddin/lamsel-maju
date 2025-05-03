
import React from 'react';
import Navbar from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PromoSection } from '@/components/PromoSection';
import { TopDestinations } from '@/components/TopDestinations';
import { UMKMShowcase } from '@/components/UMKMShowcase';
import { AgendaSection } from '@/components/AgendaSection';
import { KecamatanSection } from '@/components/KecamatanSection';
import { TestimonialSection } from '@/components/TestimonialSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Promo Section */}
      <PromoSection />
      
      {/* Top Destinations */}
      <TopDestinations />
      
      {/* UMKM Showcase */}
      <UMKMShowcase />
      
      {/* Travel Agenda */}
      <AgendaSection />
      
      {/* Kecamatan Information */}
      <KecamatanSection />
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
