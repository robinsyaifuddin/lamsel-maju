
import React from 'react';
import { DestinationCard } from './DestinationCard';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data for top destinations
const topDestinations = [
  {
    id: 1,
    name: "Pantai Way Belerang",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=3270",
    location: "Kalianda, Lampung Selatan",
    rating: 4.8,
    category: "Pantai",
    description: "Nikmati indahnya pantai dengan pasir putih dan air laut yang jernih, sempurna untuk berenang dan bersantai."
  },
  {
    id: 2,
    name: "Gunung Rajabasa",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2940",
    location: "Rajabasa, Lampung Selatan",
    rating: 4.6,
    category: "Gunung",
    description: "Gunung berapi aktif dengan pemandangan indah dan jalur pendakian yang menantang untuk pendaki."
  },
  {
    id: 3,
    name: "Air Terjun Way Kalam",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3270",
    location: "Penengahan, Lampung Selatan",
    rating: 4.7,
    category: "Air Terjun",
    description: "Air terjun tersembunyi dengan air yang menyegarkan, dikelilingi oleh hutan yang rimbun."
  },
  {
    id: 4,
    name: "Pulau Sebesi",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2900",
    location: "Rajabasa, Lampung Selatan",
    rating: 4.9,
    category: "Pulau",
    description: "Pulau cantik dengan terumbu karang dan kehidupan laut yang indah, sempurna untuk snorkeling dan diving."
  }
];

export const TopDestinations = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/destinasi');
  };
  
  const handleViewDestination = (id: number) => {
    navigate(`/destinasi/detail?id=${id}`);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Destinasi Unggulan</h2>
          <p className="mt-2 text-gray-600">
            Jelajahi destinasi wisata terbaik di Lampung Selatan
          </p>
        </div>
        <Button 
          variant="outline" 
          className="group flex items-center border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"
          onClick={handleViewAll}
        >
          Lihat Semua
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {topDestinations.map((destination) => (
          <DestinationCard 
            key={destination.id}
            id={destination.id}
            name={destination.name}
            image={destination.image}
            location={destination.location}
            rating={destination.rating}
            category={destination.category}
            description={destination.description}
            onViewDetails={() => handleViewDestination(destination.id)}
          />
        ))}
      </div>
    </div>
  );
};
