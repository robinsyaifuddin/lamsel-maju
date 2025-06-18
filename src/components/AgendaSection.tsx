import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for upcoming travel agendas
const upcomingAgendas = [
  {
    id: 1,
    title: "Festival Krakatau",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2960",
    date: "15 Juni 2023",
    time: "09:00 - 21:00",
    location: "Kalianda, Lampung Selatan",
    category: "Festival",
    spots: 25
  },
  {
    id: 2,
    title: "Tour Gunung Rajabasa",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=3270",
    date: "22 Juni 2023",
    time: "07:00 - 17:00",
    location: "Rajabasa, Lampung Selatan",
    category: "Pendakian",
    spots: 15
  },
  {
    id: 3,
    title: "Snorkeling Pulau Sebesi",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=3270",
    date: "30 Juni 2023",
    time: "08:00 - 16:00",
    location: "Rajabasa, Lampung Selatan",
    category: "Bahari",
    spots: 20
  }
];

export const AgendaSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleViewAllAgenda = () => {
    navigate('/agenda');
  };

  const handleJoinAgenda = (id: number) => {
    navigate(`/agenda?id=${id}`);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Agenda Travel</h2>
        <p className="mt-2 mx-auto max-w-2xl text-gray-600">
          Bergabunglah dengan agenda travel kami dan nikmati pengalaman wisata terbaik di Lampung Selatan dengan panduan profesional
        </p>
      </div>
      
      {isMobile ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {upcomingAgendas.map((agenda) => (
              <CarouselItem key={agenda.id} className="pl-2 md:pl-4 basis-4/5">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={agenda.image} 
                      alt={agenda.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                      {agenda.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-bold">{agenda.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-2 h-4 w-4 text-lamsel-purple" />
                      <span>{agenda.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-lamsel-purple" />
                      <span>{agenda.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-lamsel-purple" />
                      <span>{agenda.location}</span>
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      <span className="text-lamsel-purple">{agenda.spots}</span> spot tersedia
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80"
                      onClick={() => handleJoinAgenda(agenda.id)}
                    >
                      Bergabung
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingAgendas.map((agenda) => (
            <Card key={agenda.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={agenda.image} 
                  alt={agenda.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  {agenda.category}
                </Badge>
              </div>
              <CardHeader>
                <h3 className="text-xl font-bold">{agenda.title}</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{agenda.date}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{agenda.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-lamsel-purple" />
                  <span>{agenda.location}</span>
                </div>
                <div className="mt-2 text-sm font-medium">
                  <span className="text-lamsel-purple">{agenda.spots}</span> spot tersedia
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80"
                  onClick={() => handleJoinAgenda(agenda.id)}
                >
                  Bergabung
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      <div className="mt-10 text-center">
        <Button 
          variant="outline" 
          className="border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
          onClick={handleViewAllAgenda}
        >
          Lihat Semua Agenda
        </Button>
      </div>
    </div>
  );
};
