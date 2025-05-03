
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Sample data for districts
const districts = [
  {
    id: 1,
    name: "Kalianda",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2940",
    totalVillages: 27,
    population: "98,245"
  },
  {
    id: 2,
    name: "Rajabasa",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2940",
    totalVillages: 16,
    population: "54,123"
  },
  {
    id: 3,
    name: "Way Panji",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3270",
    totalVillages: 8,
    population: "32,654"
  },
  {
    id: 4,
    name: "Natar",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2940",
    totalVillages: 22,
    population: "87,521"
  },
  {
    id: 5,
    name: "Jati Agung",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    totalVillages: 21,
    population: "76,321"
  },
  {
    id: 6,
    name: "Sidomulyo",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=2880",
    totalVillages: 16,
    population: "45,876"
  }
];

export const KecamatanSection = () => {
  const navigate = useNavigate();

  const handleViewAllKecamatan = () => {
    navigate('/kecamatan');
  };

  const handleViewKecamatanDetail = (id: number) => {
    navigate(`/kecamatan?id=${id}`);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Kecamatan di Lampung Selatan</h2>
            <p className="mt-2 text-gray-600">
              Kenali lebih dekat kecamatan-kecamatan di Lampung Selatan
            </p>
          </div>
          <Button 
            variant="outline" 
            className="group flex items-center border-lamsel-red text-lamsel-red hover:bg-lamsel-red hover:text-white"
            onClick={handleViewAllKecamatan}
          >
            Lihat Semua Kecamatan
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => (
            <Card key={district.id} className="card-3d overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="card-3d-content">
                <div className="relative h-44">
                  <img 
                    src={district.image} 
                    alt={district.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">{district.name}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Jumlah Desa</p>
                      <p className="font-semibold">{district.totalVillages}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Populasi</p>
                      <p className="font-semibold">{district.population}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="mt-4 w-full text-lamsel-red hover:bg-lamsel-red/10"
                    onClick={() => handleViewKecamatanDetail(district.id)}
                  >
                    Lihat Detail
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
