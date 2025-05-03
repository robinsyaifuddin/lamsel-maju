
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Calendar, ArrowLeft, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MapLocation } from '@/components/MapLocation';
import { ReviewSection } from '@/components/ReviewSection';
import { useIsMobile } from '@/hooks/use-mobile';

// Import same destination data used in other components
const allDestinations = [
  {
    id: 1,
    name: "Pantai Way Belerang",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=3270",
    location: "Kalianda, Lampung Selatan",
    rating: 4.8,
    category: "Pantai",
    description: "Nikmati indahnya pantai dengan pasir putih dan air laut yang jernih, sempurna untuk berenang dan bersantai.",
    fullDescription: "Pantai Way Belerang adalah salah satu destinasi wisata bahari terbaik di Lampung Selatan. Terkenal dengan pasir putihnya yang lembut dan air laut yang jernih, pantai ini menawarkan pemandangan alam yang menakjubkan dengan latar belakang pegunungan. Pengunjung dapat menikmati berbagai aktivitas seperti berenang, snorkeling, atau sekadar bersantai menikmati pemandangan matahari terbenam yang memukau. Tersedia juga fasilitas lengkap seperti tempat parkir, toilet, warung makan, dan penginapan di sekitar pantai.",
    facilities: ["Parkir", "Toilet", "Warung Makan", "Penginapan", "Rental Peralatan Snorkeling"],
    operatingHours: "08:00 - 18:00 WIB",
    entryFee: "Rp 15.000 per orang",
    bestTime: "Pagi hingga sore hari",
    coordinates: {
      lat: -5.7524,
      lng: 105.6881
    }
  },
  {
    id: 2,
    name: "Gunung Rajabasa",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2940",
    location: "Rajabasa, Lampung Selatan",
    rating: 4.6,
    category: "Gunung",
    description: "Gunung berapi aktif dengan pemandangan indah dan jalur pendakian yang menantang untuk pendaki.",
    fullDescription: "Gunung Rajabasa adalah gunung berapi aktif yang menjadi ikon Lampung Selatan dengan ketinggian mencapai 1.281 mdpl. Gunung ini menawarkan tantangan pendakian yang menarik dengan jalur yang bervariasi, cocok untuk pendaki pemula hingga berpengalaman. Dari puncak gunung, pengunjung dapat menikmati pemandangan spektakuler Selat Sunda dan Pulau Krakatau. Kawasan gunung ini juga dihuni oleh beragam flora dan fauna langka, menjadikannya tujuan favorit para pecinta alam dan fotografi.",
    facilities: ["Pos Pendakian", "Area Camping", "Pusat Informasi", "Toilet", "Warung"],
    operatingHours: "24 jam (pendakian disarankan pagi hari)",
    entryFee: "Rp 10.000 per orang",
    bestTime: "Musim kemarau (April - Oktober)",
    coordinates: {
      lat: -5.7848,
      lng: 105.5984
    }
  },
  {
    id: 3,
    name: "Air Terjun Way Kalam",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3270",
    location: "Penengahan, Lampung Selatan",
    rating: 4.7,
    category: "Air Terjun",
    description: "Air terjun tersembunyi dengan air yang menyegarkan, dikelilingi oleh hutan yang rimbun.",
    fullDescription: "Air Terjun Way Kalam adalah surga tersembunyi di tengah hutan rimbun Lampung Selatan. Air terjun setinggi sekitar 15 meter ini menawarkan kesegaran dengan airnya yang jernih dan sejuk, mengalir dari sumber mata air pegunungan. Lokasinya yang tersembunyi di antara pepohonan hijau menciptakan suasana yang tenang dan damai, sempurna untuk melepas penat dari hiruk pikuk kota. Pengunjung perlu melakukan trekking ringan melalui jalur hutan selama sekitar 30 menit untuk mencapai lokasi air terjun.",
    facilities: ["Jalur Trekking", "Area Istirahat", "Warung Sederhana", "Spot Foto"],
    operatingHours: "08:00 - 17:00 WIB",
    entryFee: "Rp 10.000 per orang",
    bestTime: "Pagi hari",
    coordinates: {
      lat: -5.6723,
      lng: 105.6384
    }
  },
  {
    id: 4,
    name: "Pulau Sebesi",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=2940",
    location: "Rajabasa, Lampung Selatan",
    rating: 4.9,
    category: "Pulau",
    description: "Pulau cantik dengan terumbu karang dan kehidupan laut yang indah, sempurna untuk snorkeling dan diving.",
    fullDescription: "Pulau Sebesi adalah surga tersembunyi di perairan Lampung Selatan yang terletak tidak jauh dari Gunung Krakatau. Pulau ini menawarkan pesona alam yang memukau dengan pantai pasir putih, air laut jernih, dan terumbu karang yang masih terjaga. Pulau Sebesi merupakan destinasi sempurna untuk snorkeling dan diving, dengan keanekaragaman hayati laut yang menakjubkan. Selain keindahan bawah laut, pengunjung juga dapat menikmati kebudayaan masyarakat lokal yang masih menjaga tradisi dan keramahtamahan.",
    facilities: ["Penginapan", "Warung Makan", "Rental Peralatan Snorkeling dan Diving", "Pemandu Wisata", "Transportasi Laut"],
    operatingHours: "Kunjungan setiap hari",
    entryFee: "Rp 25.000 per orang (belum termasuk transportasi laut)",
    bestTime: "Maret - Oktober (saat laut tenang)",
    coordinates: {
      lat: -5.9323,
      lng: 105.4763
    }
  },
  {
    id: 5,
    name: "Menara Siger",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    location: "Bakauheni, Lampung Selatan",
    rating: 4.5,
    category: "Sejarah",
    description: "Ikon Lampung yang terletak di ujung Pulau Sumatera, menawarkan pemandangan indah Selat Sunda.",
    fullDescription: "Menara Siger adalah landmark ikonik Lampung yang terletak di ujung selatan Pulau Sumatera, tepatnya di kawasan Bakauheni, Lampung Selatan. Dibangun menyerupai Siger, mahkota tradisional wanita Lampung, menara ini menjadi simbol kebanggaan dan identitas budaya masyarakat Lampung. Dari menara setinggi 30 meter ini, pengunjung dapat menikmati pemandangan menakjubkan Selat Sunda dan aktivitas penyeberangan ferry. Menara Siger juga dilengkapi dengan museum yang menampilkan berbagai artefak dan informasi tentang sejarah serta kebudayaan Lampung.",
    facilities: ["Museum", "Taman", "Kafe", "Toilet", "Area Parkir Luas", "Toko Souvenir"],
    operatingHours: "08:00 - 18:00 WIB",
    entryFee: "Rp 20.000 per orang",
    bestTime: "Pagi atau menjelang sore (untuk menikmati sunset)",
    coordinates: {
      lat: -5.8623,
      lng: 105.7523
    }
  },
  {
    id: 6,
    name: "Taman Nasional Way Kambas",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2960",
    location: "Kalianda, Lampung Selatan",
    rating: 4.7,
    category: "Taman",
    description: "Taman nasional yang terkenal sebagai tempat konservasi gajah sumatera, badak, dan satwa liar lainnya.",
    fullDescription: "Taman Nasional Way Kambas adalah salah satu taman nasional tertua di Indonesia yang terkenal sebagai pusat konservasi satwa liar, terutama gajah Sumatera, badak Sumatera, dan harimau Sumatera yang terancam punah. Taman seluas 130.000 hektar ini menawarkan pengalaman wisata edukasi melalui Pusat Latihan Gajah (PLG) dimana pengunjung dapat melihat langsung proses pelatihan dan perawatan gajah. Taman ini juga memiliki ekosistem yang beragam, termasuk hutan hujan tropis, rawa, dan padang rumput, menjadikannya habitat bagi ratusan spesies flora dan fauna.",
    facilities: ["Pusat Latihan Gajah", "Pusat Konservasi Badak Sumatera", "Jalur Ekowisata", "Penginapan", "Pusat Informasi"],
    operatingHours: "08:00 - 16:00 WIB",
    entryFee: "Rp 30.000 per orang (domestik), Rp 150.000 per orang (internasional)",
    bestTime: "Sepanjang tahun (hindari musim hujan lebat)",
    coordinates: {
      lat: -5.6204,
      lng: 105.7763
    }
  },
  {
    id: 7,
    name: "Pantai Mengkudu",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2940",
    location: "Rajabasa, Lampung Selatan",
    rating: 4.4,
    category: "Pantai",
    description: "Pantai yang menawarkan pemandangan sunset yang menakjubkan dengan tebing-tebing karang yang indah.",
    fullDescription: "Pantai Mengkudu adalah destinasi wisata bahari yang mempesona di Lampung Selatan dengan karakteristik unik berupa formasi batu karang besar yang menyerupai buah mengkudu. Pantai ini menawarkan pemandangan sunset yang spektakuler dengan latar belakang Gunung Rajabasa dan Pulau Krakatau di kejauhan. Air lautnya yang jernih cocok untuk berenang dan snorkeling, sementara hamparan pasir putihnya yang luas sempurna untuk bersantai. Pantai Mengkudu masih terjaga keasriannya, menawarkan pengalaman wisata yang tenang dan menyegarkan.",
    facilities: ["Area Parkir", "Gazebo", "Warung Makan Sederhana", "Toilet"],
    operatingHours: "06:00 - 18:00 WIB",
    entryFee: "Rp 10.000 per orang",
    bestTime: "Sore hari menjelang sunset",
    coordinates: {
      lat: -5.8023,
      lng: 105.5784
    }
  },
  {
    id: 8,
    name: "Bukit Kabut",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=3270",
    location: "Jati Agung, Lampung Selatan",
    rating: 4.3,
    category: "Bukit",
    description: "Bukit dengan pemandangan kabut pagi yang magis, menjadi tempat favorit fotografi dan camping.",
    fullDescription: "Bukit Kabut adalah destinasi wisata alam yang memesona di Lampung Selatan, mendapatkan namanya dari fenomena kabut tebal yang menyelimuti area bukit di pagi hari. Terletak di ketinggian sekitar 700 mdpl, bukit ini menawarkan panorama matahari terbit yang spektakuler dan pemandangan lautan kabut yang menghampar luas, menciptakan lanskap yang seolah dunia mimpi. Bukit Kabut menjadi surga bagi fotografer dan pecinta alam, dengan spot-spot foto yang instagramable. Area ini juga populer untuk kegiatan camping dan trekking ringan.",
    facilities: ["Jalur Trekking", "Area Camping", "Spot Foto", "Warung Sederhana"],
    operatingHours: "05:00 - 18:00 WIB (untuk melihat kabut pagi, pengunjung disarankan tiba sebelum matahari terbit)",
    entryFee: "Rp 10.000 per orang",
    bestTime: "Pagi hari (05:00 - 08:00 WIB)",
    coordinates: {
      lat: -5.5463,
      lng: 105.5123
    }
  }
];

const DestinationDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [destination, setDestination] = useState<(typeof allDestinations)[0] | null>(null);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const found = allDestinations.find(dest => dest.id === parseInt(id));
      if (found) {
        setDestination(found);
        // Set page title for better SEO
        document.title = `${found.name} - Lampung Selatan Wisata`;
      } else {
        navigate('/destinasi');
      }
    } else {
      navigate('/destinasi');
    }
  }, [searchParams, navigate]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleExpandImage = () => {
    setIsImageExpanded(!isImageExpanded);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Image Section */}
      <div className={`relative ${isImageExpanded ? 'h-[85vh]' : 'h-[40vh] md:h-[50vh]'} w-full transition-all duration-500`}>
        <img 
          src={destination.image} 
          alt={destination.name}
          className="h-full w-full object-cover"
          onClick={handleExpandImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <button 
          onClick={handleExpandImage}
          className="absolute bottom-4 right-4 rounded-full bg-white/20 p-2 text-sm text-white backdrop-blur-md transition hover:bg-white/30"
        >
          {isImageExpanded ? 'Tutup Gambar' : 'Perbesar Gambar'}
        </button>
        
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8">
          <div className="container mx-auto">
            <Button 
              variant="outline" 
              className="mb-4 border-white text-white hover:bg-white/20"
              onClick={() => navigate('/destinasi')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
            <Badge className="mb-2 bg-lamsel-blue">{destination.category}</Badge>
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl">{destination.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4 text-white" />
                <span className="text-sm text-white md:text-base">{destination.location}</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-white md:text-base">{destination.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            {/* About Section */}
            <section className="mb-10">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl">Tentang Destinasi</h2>
              <p className="mb-6 leading-relaxed text-gray-700">
                {destination.fullDescription}
              </p>
              
              {/* Facilities */}
              <h3 className="mb-3 text-xl font-semibold">Fasilitas</h3>
              <div className="mb-6 flex flex-wrap gap-2">
                {destination.facilities.map((facility, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700">
                    {facility}
                  </Badge>
                ))}
              </div>
              
              {/* Info Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100">
                  <h4 className="mb-2 font-semibold">Jam Operasional</h4>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-lamsel-blue" />
                    {destination.operatingHours}
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100">
                  <h4 className="mb-2 font-semibold">Biaya Masuk</h4>
                  <div className="flex items-center text-gray-700">
                    <span className="mr-2 text-lg font-bold text-lamsel-blue">Rp</span>
                    {destination.entryFee.replace('Rp ', '')}
                  </div>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-4 transition-all hover:bg-gray-100">
                  <h4 className="mb-2 font-semibold">Waktu Terbaik</h4>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="mr-2 h-4 w-4 text-lamsel-blue" />
                    {destination.bestTime}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Location Section */}
            <section className="mb-10">
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">Lokasi</h2>
              <MapLocation 
                longitude={destination.coordinates.lng}
                latitude={destination.coordinates.lat}
                locationName={destination.name}
              />
              <div className="mt-4 flex flex-col space-y-2 text-gray-700">
                <p className="flex items-start">
                  <MapPin className="mr-2 mt-1 h-4 w-4 shrink-0 text-lamsel-blue" />
                  <span>{destination.location}, Lampung Selatan, Lampung, Indonesia</span>
                </p>
                <p className="text-sm">
                  Koordinat GPS: {destination.coordinates.lat.toFixed(6)}, {destination.coordinates.lng.toFixed(6)}
                </p>
              </div>
            </section>
            
            {/* Reviews Section */}
            <section className="mb-10">
              <ReviewSection 
                destinationId={destination.id} 
                destinationName={destination.name}
                initialRating={destination.rating}
              />
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24 rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-bold">Rencanakan Kunjungan</h3>
              
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Tanggal Kunjungan</label>
                <input 
                  type="date" 
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-lamsel-blue focus:outline-none focus:ring-1 focus:ring-lamsel-blue"
                />
              </div>
              
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium">Jumlah Pengunjung</label>
                <div className="flex items-center rounded-md border border-gray-300 p-2">
                  <Users className="mr-2 h-4 w-4 text-gray-500" />
                  <select className="w-full bg-transparent focus:outline-none">
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5+">5+ Orang</option>
                  </select>
                </div>
              </div>
              
              <Button className="w-full bg-lamsel-blue hover:bg-lamsel-blue/80">
                Pesan Tiket
              </Button>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white">
                  Bergabung dengan Tur
                </Button>
              </div>

              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold">Tips Perjalanan</h4>
                <ul className="ml-5 list-disc text-sm text-gray-700">
                  <li className="mb-1">Sediakan uang tunai untuk masuk dan parkir</li>
                  <li className="mb-1">Bawa bekal air minum dan makanan</li>
                  <li className="mb-1">Gunakan pakaian yang nyaman</li>
                  <li className="mb-1">Perhatikan jam operasional lokasi</li>
                  <li>Jaga kebersihan area wisata</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DestinationDetail;
