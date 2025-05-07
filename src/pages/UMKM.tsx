import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollAnimations from '@/components/ScrollAnimations';

// Sample data for UMKM
const allUMKM = [
  {
    id: 1,
    name: "Kopi Lamsel",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=3270",
    category: "Kuliner",
    location: "Kalianda, Lampung Selatan",
    phone: "+62 812-3456-7890",
    email: "kopilamsel@example.com",
    description: "Produsen kopi lokal dengan berbagai varian kopi khas Lampung Selatan yang diproses dengan metode tradisional."
  },
  {
    id: 2,
    name: "Batik Tapis Lamsel",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=2880",
    category: "Kerajinan",
    location: "Natar, Lampung Selatan",
    phone: "+62 812-3456-7891",
    email: "batiktapis@example.com",
    description: "Pengrajin batik tapis tradisional Lampung yang menggabungkan motif khas daerah dengan teknik modern."
  },
  {
    id: 3,
    name: "Keripik Pisang Crispy",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    category: "Kuliner",
    location: "Sidomulyo, Lampung Selatan",
    phone: "+62 812-3456-7892",
    email: "keripikpisang@example.com",
    description: "Produsen keripik pisang dengan berbagai varian rasa yang unik, diolah dari pisang lokal berkualitas tinggi."
  },
  {
    id: 4,
    name: "Tenun Lamsel",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2960",
    category: "Kerajinan",
    location: "Jati Agung, Lampung Selatan",
    phone: "+62 812-3456-7893",
    email: "tenunlamsel@example.com",
    description: "Pengrajin kain tenun tradisional dengan motif-motif ekslusif yang menggambarkan kebudayaan Lampung Selatan."
  },
  {
    id: 5,
    name: "Dodol Kenari",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2900",
    category: "Kuliner",
    location: "Kalianda, Lampung Selatan",
    phone: "+62 812-3456-7894",
    email: "dodolkenari@example.com",
    description: "Produsen dodol tradisional dengan bahan utama kenari lokal, menjadi oleh-oleh khas Lampung Selatan."
  },
  {
    id: 6,
    name: "Anyaman Bambu Kreatif",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=3270",
    category: "Kerajinan",
    location: "Way Panji, Lampung Selatan",
    phone: "+62 812-3456-7895",
    email: "anyamanbambu@example.com",
    description: "Pengrajin berbagai produk anyaman bambu modern untuk kebutuhan dekorasi dan peralatan rumah tangga."
  }
];

const categories = ["Semua", "Kuliner", "Kerajinan", "Fashion", "Pertanian", "Perikanan"];
const locations = ["Semua Lokasi", "Kalianda", "Natar", "Sidomulyo", "Jati Agung", "Way Panji", "Rajabasa"];

const UMKM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedLocation, setSelectedLocation] = useState('Semua Lokasi');
  const [filteredUMKM, setFilteredUMKM] = useState(allUMKM);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filtered = allUMKM.filter(umkm => {
      const matchesSearch = umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           umkm.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Semua' || umkm.category === selectedCategory;
      
      const matchesLocation = selectedLocation === 'Semua Lokasi' || 
                             umkm.location.includes(selectedLocation);
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
    
    setFilteredUMKM(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterResults(category, selectedLocation);
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    filterResults(selectedCategory, location);
  };

  const filterResults = (category: string, location: string) => {
    let filtered = allUMKM;
    
    if (category !== 'Semua') {
      filtered = filtered.filter(umkm => umkm.category === category);
    }
    
    if (location !== 'Semua Lokasi') {
      filtered = filtered.filter(umkm => umkm.location.includes(location));
    }
    
    if (searchTerm) {
      filtered = filtered.filter(umkm => 
        umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredUMKM(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('Semua');
    setSelectedLocation('Semua Lokasi');
    setFilteredUMKM(allUMKM);
  };

  const handleViewDetail = (id: number) => {
    navigate(`/umkm/detail?id=${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-lamsel-green text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">UMKM Lampung Selatan</h1>
          <p className="max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Jelajahi dan dukung usaha mikro, kecil, dan menengah di Lampung Selatan. Temukan produk lokal berkualitas dari berbagai kategori.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8 animate-slide-in-bottom">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="text"
                placeholder="Cari UMKM..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-lamsel-green hover:bg-lamsel-green/80 button-3d"
          >
            Cari
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="border-lamsel-green text-lamsel-green hover:bg-lamsel-green hover:text-white button-3d"
          >
            Reset
          </Button>
        </div>
        
        {/* Filter Controls */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Kategori:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="rounded-md border-gray-300 py-1 pl-3 pr-8 text-sm focus:border-lamsel-green focus:ring-lamsel-green"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Lokasi:</span>
            <select 
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              className="rounded-md border-gray-300 py-1 pl-3 pr-8 text-sm focus:border-lamsel-green focus:ring-lamsel-green"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* UMKM Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 animated-section">
          {filteredUMKM.map((umkm, index) => (
            <Card key={umkm.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg card-hover stagger-item">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={umkm.image} 
                  alt={umkm.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <Badge className="mb-2 bg-lamsel-green hover:bg-lamsel-green/80">
                    {umkm.category}
                  </Badge>
                  <h3 className="text-xl font-bold">{umkm.name}</h3>
                </div>
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <span>{umkm.location}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <span>{umkm.phone}</span>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <span className="truncate">{umkm.email}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 border-t pt-2">
                  {umkm.description}
                </p>
                <Button 
                  className="w-full mt-2 bg-lamsel-green hover:bg-lamsel-green/80 button-3d"
                  onClick={() => handleViewDetail(umkm.id)}
                >
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredUMKM.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <h3 className="text-2xl font-semibold mb-2">Tidak Ada UMKM Ditemukan</h3>
            <p className="text-gray-500">
              Mohon coba dengan kata kunci atau filter yang berbeda
            </p>
            <Button 
              onClick={handleReset}
              className="mt-4 bg-lamsel-green hover:bg-lamsel-green/80 button-3d"
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
      <ScrollAnimations />
    </div>
  );
};

export default UMKM;
