
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Map, 
  Calendar,
  Users
} from 'lucide-react';
import { DatePicker } from "@/components/DatePicker";

export const HeroSection = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = () => {
    navigate('/destinasi');
  };
  
  return (
    <div className="relative h-screen max-h-[800px] min-h-[600px] w-full overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2940')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-lamsel-dark/50 via-lamsel-dark/30 to-transparent"></div>
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
        
        {/* Search box */}
        <div className="animate-scale-in mt-10 w-full max-w-5xl">
          <div className="search-container overflow-hidden rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-1 items-center border-b p-4 md:border-b-0 md:border-r">
                <Search className="mr-2 text-lamsel-blue" size={24} />
                <Input 
                  type="text"
                  placeholder="Ke mana Anda akan pergi?"
                  className="border-none text-lg shadow-none focus-visible:ring-0" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="flex flex-1 items-center border-b p-4 md:border-b-0 md:border-r">
                <Calendar className="mr-2 text-lamsel-blue" size={24} />
                <DatePicker />
              </div>
              
              <div className="flex flex-1 items-center p-4 md:border-r">
                <Users className="mr-2 text-lamsel-blue" size={24} />
                <select className="w-full border-none bg-transparent text-lg focus:outline-none">
                  <option value="1">1 Tamu</option>
                  <option value="2">2 Tamu</option>
                  <option value="3">3 Tamu</option>
                  <option value="4">4+ Tamu</option>
                </select>
              </div>
              
              <Button
                size="lg"
                className="m-4 bg-lamsel-blue hover:bg-lamsel-blue/80 px-8 py-6 text-lg"
                onClick={handleSearch}
              >
                <Search className="mr-2" size={20} />
                Cari
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
