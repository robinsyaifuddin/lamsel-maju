import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  MapPin, 
  Clock, 
  Calendar,
  Users,
  Star,
  ArrowLeft,
  Heart,
  Share2,
  Info,
  MessageSquare
} from 'lucide-react';
import { AgendaSection } from '@/components/AgendaSection';

// Sample data for destinations
const destinations = [
  {
    id: 1,
    name: "Pantai Tanjung Putus",
    description: "Pantai Tanjung Putus adalah salah satu destinasi wisata pantai yang terletak di Desa Waymuli, Kecamatan Rajabasa, Kabupaten Lampung Selatan. Pantai ini menawarkan pemandangan yang indah dengan pasir putih dan air laut yang jernih. Pengunjung dapat menikmati berbagai aktivitas seperti berenang, snorkeling, atau sekadar bersantai menikmati keindahan alam.",
    longDescription: "Pantai Tanjung Putus adalah salah satu destinasi wisata pantai yang terletak di Desa Waymuli, Kecamatan Rajabasa, Kabupaten Lampung Selatan. Pantai ini menawarkan pemandangan yang indah dengan pasir putih dan air laut yang jernih. Pengunjung dapat menikmati berbagai aktivitas seperti berenang, snorkeling, atau sekadar bersantai menikmati keindahan alam.\n\nPantai Tanjung Putus mendapatkan namanya karena bentuk pantai yang seperti tanjung yang terputus dari daratan utama ketika air laut pasang. Saat air laut surut, pengunjung dapat berjalan menyeberangi gundukan pasir untuk mencapai 'pulau kecil' di ujung tanjung. Fenomena alam ini menjadi daya tarik utama bagi wisatawan yang berkunjung.\n\nSelain keindahan pantainya, Tanjung Putus juga menawarkan pemandangan matahari terbenam yang spektakuler. Banyak fotografer dan pecinta alam yang sengaja datang di sore hari untuk mengabadikan momen matahari terbenam di pantai ini. Fasilitas yang tersedia di Pantai Tanjung Putus meliputi area parkir, toilet umum, warung makan, dan penginapan sederhana bagi yang ingin menginap.",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=3270",
      "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=3270",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=3270",
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=3272"
    ],
    location: "Desa Waymuli, Kecamatan Rajabasa, Lampung Selatan",
    category: "Pantai",
    rating: 4.5,
    reviews: 120,
    openHours: "06:00 - 18:00",
    entryFee: "Rp 10.000 / orang",
    bestTimeToVisit: "Pagi hingga sore hari",
    facilities: ["Parkir", "Toilet", "Warung Makan", "Penginapan", "Spot Foto"],
    activities: ["Berenang", "Snorkeling", "Fotografi", "Camping", "Memancing"],
    nearbyAttractions: [
      {
        id: 2,
        name: "Air Terjun Way Lalaan",
        image: "https://images.unsplash.com/photo-1564519592964-e609973fd632?q=80&w=3087",
        distance: "15 km"
      },
      {
        id: 3,
        name: "Gunung Rajabasa",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=3270",
        distance: "8 km"
      },
      {
        id: 4,
        name: "Pulau Sebesi",
        image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=3173",
        distance: "20 km (via perahu)"
      }
    ],
    relatedTours: [
      {
        id: 101,
        name: "Paket Wisata Pantai Lampung Selatan",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=3270",
        duration: "2 hari 1 malam",
        price: "Rp 850.000",
        rating: 4.7,
        reviews: 45
      },
      {
        id: 102,
        name: "Eksplorasi Pantai Tanjung Putus",
        image: "https://images.unsplash.com/photo-1596627116790-af6f96d60f2c?q=80&w=3270",
        duration: "1 hari",
        price: "Rp 350.000",
        rating: 4.5,
        reviews: 32
      },
      {
        id: 103,
        name: "Snorkeling di Tanjung Putus",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=3270",
        duration: "5 jam",
        price: "Rp 250.000",
        rating: 4.8,
        reviews: 28
      }
    ]
  },
  {
    id: 2,
    name: "Air Terjun Way Lalaan",
    description: "Air Terjun Way Lalaan adalah salah satu air terjun terindah di Lampung Selatan yang terletak di kaki Gunung Rajabasa. Air terjun ini memiliki ketinggian sekitar 30 meter dengan aliran air yang jernih dan sejuk.",
    longDescription: "Air Terjun Way Lalaan adalah salah satu air terjun terindah di Lampung Selatan yang terletak di kaki Gunung Rajabasa. Air terjun ini memiliki ketinggian sekitar 30 meter dengan aliran air yang jernih dan sejuk. Dikelilingi oleh hutan tropis yang rimbun, Way Lalaan menawarkan suasana alam yang asri dan menyegarkan.\n\nUntuk mencapai Air Terjun Way Lalaan, pengunjung perlu melakukan trekking ringan sejauh sekitar 1 kilometer dari area parkir. Jalur trekking cukup mudah dilalui dan telah dilengkapi dengan tangga dan pegangan di beberapa bagian yang curam. Selama perjalanan, pengunjung akan disuguhi dengan pemandangan hutan yang indah dan suara gemericik air sungai.\n\nSetibanya di lokasi air terjun, pengunjung dapat berenang di kolam alami yang terbentuk di bawah air terjun atau sekadar bersantai menikmati keindahan alam sekitar. Air yang jernih dan sejuk menjadi daya tarik utama bagi wisatawan yang ingin menyegarkan diri dari hiruk pikuk kehidupan kota.",
    images: [
      "https://images.unsplash.com/photo-1564519592964-e609973fd632?q=80&w=3087",
      "https://images.unsplash.com/photo-1513125370-3460ebe3401b?q=80&w=3087",
      "https://images.unsplash.com/photo-1469796466635-455ede028ac4?q=80&w=3270",
      "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=3270"
    ],
    location: "Kaki Gunung Rajabasa, Kecamatan Rajabasa, Lampung Selatan",
    category: "Air Terjun",
    rating: 4.3,
    reviews: 85,
    openHours: "07:00 - 17:00",
    entryFee: "Rp 15.000 / orang",
    bestTimeToVisit: "Pagi hingga siang hari",
    facilities: ["Parkir", "Toilet", "Warung Makan", "Jalur Trekking", "Gazebo"],
    activities: ["Berenang", "Trekking", "Fotografi", "Piknik"],
    nearbyAttractions: [
      {
        id: 1,
        name: "Pantai Tanjung Putus",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=3270",
        distance: "15 km"
      },
      {
        id: 3,
        name: "Gunung Rajabasa",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=3270",
        distance: "5 km"
      },
      {
        id: 5,
        name: "Pemandian Air Panas",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=3270",
        distance: "7 km"
      }
    ],
    relatedTours: [
      {
        id: 201,
        name: "Eksplorasi Air Terjun Way Lalaan",
        image: "https://images.unsplash.com/photo-1513125370-3460ebe3401b?q=80&w=3087",
        duration: "1 hari",
        price: "Rp 300.000",
        rating: 4.6,
        reviews: 38
      },
      {
        id: 202,
        name: "Trekking Gunung Rajabasa & Air Terjun",
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=3270",
        duration: "2 hari 1 malam",
        price: "Rp 750.000",
        rating: 4.7,
        reviews: 25
      },
      {
        id: 203,
        name: "Wisata Alam Lampung Selatan",
        image: "https://images.unsplash.com/photo-1469796466635-455ede028ac4?q=80&w=3270",
        duration: "3 hari 2 malam",
        price: "Rp 1.200.000",
        rating: 4.8,
        reviews: 42
      }
    ]
  },
  // Add more destinations as needed
];

const DestinationDetail = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id') || '1');
  const [destination, setDestination] = useState<any>(null);
  const [activeImage, setActiveImage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the destination based on the ID from URL
    const foundDestination = destinations.find(dest => dest.id === id);
    if (foundDestination) {
      setDestination(foundDestination);
      setActiveImage(foundDestination.images[0]);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleBackToList = () => {
    navigate('/destinasi');
  };
  
  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };
  
  const handleLikeDestination = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: isLiked ? "Destinasi dihapus dari daftar favorit Anda" : "Destinasi ditambahkan ke daftar favorit Anda",
    });
  };
  
  const handleShareDestination = () => {
    if (navigator.share) {
      navigator.share({
        title: destination?.name || '',
        text: `Lihat destinasi wisata ${destination?.name || ''} di Lampung Selatan`,
        url: window.location.href,
      })
      .catch((error) => {
        toast({
          title: "Gagal membagikan",
          description: "Terjadi kesalahan saat mencoba membagikan",
          variant: "destructive",
        });
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Tautan disalin!",
        description: "Tautan telah disalin ke clipboard",
      });
    }
  };

  const handleConsultation = () => {
    if (!destination) return;
    
    // Format the WhatsApp message
    const message = `*Konsultasi Wisata - ${destination.name}*
    
Saya tertarik dengan destinasi wisata ${destination.name}.
Saya ingin mendapatkan informasi lebih lanjut tentang paket wisata, harga, dan ketersediaan.

Informasi Destinasi:
Nama: ${destination.name}
Lokasi: ${destination.location}
Kategori: ${destination.category}

Terima kasih.`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL with the provided phone number
    const whatsappUrl = `https://wa.me/6287437525303?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Menghubungi penyedia wisata",
      description: "Anda akan diarahkan ke WhatsApp untuk konsultasi",
    });
  };

  const handleJoinTour = (tourId: number) => {
    navigate(`/agenda/join?id=${tourId}`);
  };

  if (!destination) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Destinasi tidak ditemukan</h1>
            <Button 
              className="mt-4 bg-lamsel-blue hover:bg-lamsel-blue/80"
              onClick={handleBackToList}
            >
              Kembali ke Daftar Destinasi
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back button and header */}
      <div className="pt-16 bg-lamsel-blue/10">
        <div className="container mx-auto p-4">
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="mb-4 flex items-center border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar Destinasi
          </Button>
        </div>
      </div>
      
      {/* Destination Hero Section */}
      <section className="bg-lamsel-blue/10">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Image Gallery */}
            <div className="w-full lg:w-3/5">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={activeImage} 
                  alt={destination.name}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {destination.images.map((image: string, index: number) => (
                  <div 
                    key={index}
                    className={`rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === image ? 'border-lamsel-blue' : 'border-transparent'}`}
                    onClick={() => handleImageClick(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Destination Info */}
            <div className="w-full lg:w-2/5">
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2 bg-lamsel-blue">{destination.category}</Badge>
                  <h1 className="text-3xl font-bold">{destination.name}</h1>
                  <div className="flex items-center mt-2">
                    {renderStars(destination.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({destination.reviews} ulasan)
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={handleShareDestination}
                    className="border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLikeDestination}
                    className={`${isLiked ? 'bg-red-100 text-red-500 border-red-200' : 'border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white'}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>{destination.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>Jam Buka: {destination.openHours}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>Waktu Terbaik: {destination.bestTimeToVisit}</span>
                </div>
                <div className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-lamsel-blue" />
                  <span>Tiket Masuk: {destination.entryFee}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Deskripsi Singkat</h3>
                <p className="text-gray-700">{destination.description}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <Button 
                  className="flex-1 bg-lamsel-blue hover:bg-lamsel-blue/80 gap-2"
                  onClick={handleConsultation}
                >
                  <MessageSquare className="h-5 w-5" />
                  Konsultasi
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"
                  onClick={() => navigate('/agenda')}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Lihat Tur
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tab Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full mb-8 bg-gray-100 p-1">
              <TabsTrigger value="about" className="flex-1">Tentang</TabsTrigger>
              <TabsTrigger value="facilities" className="flex-1">Fasilitas & Aktivitas</TabsTrigger>
              <TabsTrigger value="location" className="flex-1">Lokasi</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Tentang {destination.name}</h2>
                <p className="text-gray-700 whitespace-pre-line">{destination.longDescription}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="facilities" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.facilities.map((facility: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-lamsel-blue rounded-full mr-2"></div>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">Aktivitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.activities.map((activity: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                      <div className="w-2 h-2 bg-lamsel-blue rounded-full mr-2"></div>
                      <span>{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location">
              <div>
                <h2 className="text-2xl font-bold mb-4">Lokasi</h2>
                <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
                  <p className="text-gray-600">Peta lokasi {destination.name}</p>
                  {/* Here you would integrate with Google Maps or another map provider */}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">Alamat</h3>
                  <p className="text-gray-700">{destination.location}</p>
                  
                  <h3 className="text-xl font-semibold mt-4 mb-2">Cara Mencapai Lokasi</h3>
                  <p className="text-gray-700">
                    Untuk mencapai {destination.name}, Anda dapat menggunakan kendaraan pribadi atau transportasi umum. Dari pusat kota Kalianda, perjalanan memakan waktu sekitar 30 menit dengan kendaraan bermotor.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Tours Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Tur yang Tersedia</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.relatedTours.map(tour => (
              <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={tour.image} 
                    alt={tour.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{tour.name}</h3>
                  <div className="flex items-center mb-2">
                    {renderStars(tour.rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({tour.reviews} ulasan)
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">{tour.duration}</span>
                    <span className="font-bold text-lamsel-blue">{tour.price}</span>
                  </div>
                  <Button 
                    onClick={() => handleJoinTour(tour.id)}
                    className="w-full bg-lamsel-blue hover:bg-lamsel-blue/80"
                  >
                    Bergabung dengan Tur
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Related Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Destinasi Terdekat</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.nearbyAttractions.map((attraction: any) => (
              <Card key={attraction.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/destinasi/detail?id=${attraction.id}`)}>
                <div className="relative h-48">
                  <img 
                    src={attraction.image} 
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="font-bold">{attraction.name}</h3>
                    <p className="text-sm">Jarak: {attraction.distance}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-lamsel-blue/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Jelajahi Lebih Banyak Destinasi di Lampung Selatan</h2>
          <p className="max-w-2xl mx-auto mb-6 text-gray-700">
            Temukan keindahan alam, budaya, dan kuliner khas Lampung Selatan yang menakjubkan
          </p>
          <Button 
            className="bg-lamsel-blue hover:bg-lamsel-blue/80"
            onClick={() => navigate('/destinasi')}
          >
            Lihat Semua Destinasi
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
