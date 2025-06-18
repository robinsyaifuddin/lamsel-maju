import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

const FeaturedArticles = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Featured articles data
  const featuredArticles = [
    {
      id: 1,
      title: "Festival Krakatau 2024 Siap Memukau Wisatawan",
      excerpt: "Festival Krakatau tahun ini menampilkan berbagai atraksi budaya dan kuliner khas Lampung Selatan yang akan memukau para wisatawan.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500",
      author: "Admin Pariwisata",
      date: "15 Des 2024",
      readTime: "5 menit",
      category: "Event"
    },
    {
      id: 2,
      title: "Pembangunan Infrastruktur Wisata Pantai Tanjung Putus",
      excerpt: "Pemerintah daerah melakukan pembangunan infrastruktur untuk meningkatkan kenyamanan wisatawan di Pantai Tanjung Putus.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      author: "Dinas Pariwisata",
      date: "12 Des 2024",
      readTime: "4 menit",
      category: "Pembangunan"
    },
    {
      id: 3,
      title: "UMKM Kopi Lamsel Meraih Penghargaan Nasional",
      excerpt: "Produk kopi robusta dari Lampung Selatan berhasil meraih penghargaan tingkat nasional dalam kompetisi produk unggulan daerah.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
      author: "Dinas Koperasi",
      date: "10 Des 2024",
      readTime: "3 menit",
      category: "UMKM"
    }
  ];

  const handleReadMore = (id: number) => {
    navigate(`/informasi/detail?id=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAllNews = () => {
    navigate('/informasi');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-lamsel-blue/10 text-lamsel-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Artikel Unggulan
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Berita & Informasi Terkini
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti perkembangan terbaru seputar pariwisata, pembangunan, dan kemajuan Lampung Selatan
          </p>
        </div>

        {isMobile ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mb-10"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredArticles.map((article, index) => (
                <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-4/5">
                  <Card 
                    className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg animate-fade-in h-full"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-lamsel-blue text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-lamsel-blue transition-colors duration-300 leading-tight">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span className="font-medium">{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleReadMore(article.id)}
                        variant="outline"
                        className="w-full border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white transition-all duration-300 group-hover:scale-105 transform"
                      >
                        Baca Selengkapnya
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {featuredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-lamsel-blue text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-lamsel-blue transition-colors duration-300 leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm">
                    {article.excerpt}
                  </p>
                  
                  {/* Article meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span className="font-medium">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Read more button */}
                  <Button 
                    onClick={() => handleReadMore(article.id)}
                    variant="outline"
                    className="w-full border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white transition-all duration-300 group-hover:scale-105 transform"
                  >
                    Baca Selengkapnya
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button 
            onClick={handleViewAllNews}
            className="bg-lamsel-blue hover:bg-blue-700 text-white px-8 py-3"
          >
            Lihat Semua Berita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
