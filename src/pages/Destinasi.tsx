
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DestinationCard } from '@/components/DestinationCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search,
  FilterX
} from 'lucide-react';

// Sample data for destinations
const allDestinations = [
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
  },
  {
    id: 5,
    name: "Menara Siger",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    location: "Bakauheni, Lampung Selatan",
    rating: 4.5,
    category: "Sejarah",
    description: "Ikon Lampung yang terletak di ujung Pulau Sumatera, menawarkan pemandangan indah Selat Sunda."
  },
  {
    id: 6,
    name: "Taman Nasional Way Kambas",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2960",
    location: "Kalianda, Lampung Selatan",
    rating: 4.7,
    category: "Taman",
    description: "Taman nasional yang terkenal sebagai tempat konservasi gajah sumatera, badak, dan satwa liar lainnya."
  },
  {
    id: 7,
    name: "Pantai Mengkudu",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2940",
    location: "Rajabasa, Lampung Selatan",
    rating: 4.4,
    category: "Pantai",
    description: "Pantai yang menawarkan pemandangan sunset yang menakjubkan dengan tebing-tebing karang yang indah."
  },
  {
    id: 8,
    name: "Bukit Kabut",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=3270",
    location: "Jati Agung, Lampung Selatan",
    rating: 4.3,
    category: "Bukit",
    description: "Bukit dengan pemandangan kabut pagi yang magis, menjadi tempat favorit fotografi dan camping."
  }
];

const categories = ["Semua", "Pantai", "Gunung", "Air Terjun", "Pulau", "Sejarah", "Taman", "Bukit"];

const Destinasi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredDestinations, setFilteredDestinations] = useState(allDestinations);

  const handleSearch = () => {
    const filtered = allDestinations.filter(destination => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Semua' || destination.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredDestinations(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'Semua') {
      setFilteredDestinations(allDestinations);
    } else {
      const filtered = allDestinations.filter(destination => 
        destination.category === category
      );
      setFilteredDestinations(filtered);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('Semua');
    setFilteredDestinations(allDestinations);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-lamsel-blue text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Destinasi Wisata</h1>
          <p className="max-w-2xl">
            Jelajahi keindahan destinasi wisata di Lampung Selatan, mulai dari pantai yang indah, gunung yang menantang, hingga budaya yang menarik.
          </p>
        </div>
      </div>
      
      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input 
                type="text"
                placeholder="Cari destinasi wisata..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-lamsel-blue hover:bg-lamsel-blue/80"
          >
            Cari
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"
          >
            <FilterX className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
        
        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className={selectedCategory === category 
                ? "bg-lamsel-blue hover:bg-lamsel-blue/80" 
                : "border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDestinations.map(destination => (
              <DestinationCard
                key={destination.id}
                id={destination.id}
                name={destination.name}
                image={destination.image}
                location={destination.location}
                rating={destination.rating}
                category={destination.category}
                description={destination.description}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">Tidak Ada Destinasi Ditemukan</h3>
            <p className="text-gray-500">
              Mohon coba dengan kata kunci atau filter yang berbeda
            </p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Destinasi;
