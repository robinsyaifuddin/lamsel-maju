
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Filter,
  ChevronDown,
  Info 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DatePicker } from '@/components/DatePicker';

// Sample data for events
const events = [
  {
    id: 1,
    title: "Festival Krakatau",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2960",
    date: "15 Juni 2023",
    time: "09:00 - 21:00",
    location: "Kalianda, Lampung Selatan",
    category: "Festival",
    spots: 25,
    description: "Festival budaya tahunan untuk memperingati letusan Gunung Krakatau dengan berbagai pertunjukan seni dan budaya tradisional Lampung."
  },
  {
    id: 2,
    title: "Tour Gunung Rajabasa",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=3270",
    date: "22 Juni 2023",
    time: "07:00 - 17:00",
    location: "Rajabasa, Lampung Selatan",
    category: "Pendakian",
    spots: 15,
    description: "Nikmati pengalaman mendaki Gunung Rajabasa dengan pemandu berpengalaman dan lihat keindahan Lampung Selatan dari ketinggian."
  },
  {
    id: 3,
    title: "Snorkeling Pulau Sebesi",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=3270",
    date: "30 Juni 2023",
    time: "08:00 - 16:00",
    location: "Rajabasa, Lampung Selatan",
    category: "Bahari",
    spots: 20,
    description: "Jelajahi keindahan bawah laut di sekitar Pulau Sebesi dengan kegiatan snorkeling yang dipandu oleh instruktur profesional."
  },
  {
    id: 4,
    title: "Panen Raya Kopi Lamsel",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=3270",
    date: "5 Juli 2023",
    time: "08:00 - 14:00",
    location: "Jati Agung, Lampung Selatan",
    category: "Agrowisata",
    spots: 30,
    description: "Ikuti kegiatan panen kopi dan belajar tentang proses pembuatan kopi Lampung Selatan dari kebun hingga cangkir."
  },
  {
    id: 5,
    title: "Wisata Kuliner Tradisional",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    date: "12 Juli 2023",
    time: "16:00 - 21:00",
    location: "Kalianda, Lampung Selatan",
    category: "Kuliner",
    spots: 25,
    description: "Nikmati berbagai kuliner tradisional Lampung dalam tur keliling pusat kuliner di Kalianda dengan pemandu lokal."
  },
  {
    id: 6,
    title: "Workshop Batik Tapis",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=2880",
    date: "18 Juli 2023",
    time: "09:00 - 15:00",
    location: "Natar, Lampung Selatan",
    category: "Budaya",
    spots: 15,
    description: "Belajar membuat Batik Tapis, kerajinan tradisional Lampung, dengan bimbingan langsung dari pengrajin berpengalaman."
  }
];

const categories = ["Semua", "Festival", "Pendakian", "Bahari", "Agrowisata", "Kuliner", "Budaya"];

const Agenda = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [showPopup, setShowPopup] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'Semua') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => event.category === category);
      setFilteredEvents(filtered);
    }
  };

  const handleShowDetails = (event: any) => {
    setActiveEvent(event);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-lamsel-purple text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Agenda Travel</h1>
          <p className="max-w-2xl">
            Bergabunglah dengan agenda travel kami dan nikmati pengalaman wisata terbaik di Lampung Selatan dengan panduan profesional.
          </p>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryFilter(category)}
                className={selectedCategory === category 
                  ? "bg-lamsel-purple hover:bg-lamsel-purple/80" 
                  : "border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-lamsel-purple text-lamsel-purple">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Tanggal Terbaru</DropdownMenuItem>
                <DropdownMenuItem>Harga Terendah</DropdownMenuItem>
                <DropdownMenuItem>Ketersediaan</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DatePicker />
          </div>
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map(event => (
            <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  {event.category}
                </Badge>
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold">{event.title}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <CalendarIcon className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span><span className="font-medium">{event.spots}</span> spot tersedia</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  className="flex-1 bg-lamsel-purple hover:bg-lamsel-purple/80"
                >
                  Bergabung
                </Button>
                <Button 
                  variant="outline" 
                  className="border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
                  onClick={() => handleShowDetails(event)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-2">Tidak Ada Agenda Ditemukan</h3>
            <p className="text-gray-500">
              Tidak ada agenda untuk kategori yang dipilih saat ini.
            </p>
            <Button 
              onClick={() => handleCategoryFilter('Semua')}
              className="mt-4 bg-lamsel-purple hover:bg-lamsel-purple/80"
            >
              Lihat Semua Agenda
            </Button>
          </div>
        )}
      </div>
      
      {/* Event Details Popup */}
      {showPopup && activeEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img 
                src={activeEvent.image} 
                alt={activeEvent.title}
                className="h-full w-full object-cover"
              />
              <Button 
                variant="ghost" 
                className="absolute right-2 top-2 bg-white/80 hover:bg-white text-black rounded-full p-2 h-8 w-8"
                onClick={() => setShowPopup(false)}
              >
                ✕
              </Button>
              <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                {activeEvent.category}
              </Badge>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{activeEvent.title}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span>{activeEvent.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span>{activeEvent.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span>{activeEvent.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span><span className="font-medium">{activeEvent.spots}</span> spot tersedia</span>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                <p className="text-gray-600">{activeEvent.description}</p>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  Bergabung
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
                  onClick={() => setShowPopup(false)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Agenda;
