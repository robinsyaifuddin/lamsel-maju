
import React from 'react';
import { 
  Map, 
  Calendar
} from 'lucide-react';
import { TravelSearchForm } from '@/components/TravelSearchForm';

export const HeroSection = () => {
  return (
    <div className="relative h-screen max-h-[800px] min-h-[600px] w-full overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('/lovable-uploads/417ca5e8-2fd5-417a-b33b-2acc06d3986d.png')",
          backgroundPosition: "center center",
          backgroundSize: "cover"
        }}
      >
        {/* White gradient overlay (20% opacity) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/5"></div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-lamsel-dark/30 via-lamsel-dark/20 to-transparent"></div>
      </div>
      
      {/* 3D Animated elements - floating icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-[20%] left-[10%] h-16 w-16 opacity-70">
          <div className="rotate-12 rounded-lg bg-white/20 p-3 shadow-xl backdrop-blur-md">
            <Map className="h-full w-full text-white" />
          </div>
        </div>
        <div className="floating-element absolute top-[30%] right-[15%] h-20 w-20 opacity-70" style={{animationDelay: "1s"}}>
          <div className="-rotate-12 rounded-lg bg-white/20 p-4 shadow-xl backdrop-blur-md">
            <Calendar className="h-full w-full text-white" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <h1 className="animate-fade-in text-center text-4xl font-bold text-white hero-shadow md:text-6xl">
          Selamat Datang di Lamsel Maju
        </h1>
        <p className="animate-fade-in mt-6 max-w-3xl text-center text-lg text-white hero-shadow md:text-xl">
          Jelajahi keindahan alam, budaya, dan kuliner terbaik di Lampung Selatan
        </p>
        
        {/* Search form */}
        <div className="animate-scale-in mt-10">
          <TravelSearchForm />
        </div>
      </div>
    </div>
  );
};
