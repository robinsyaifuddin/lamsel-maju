
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin,
  Users,
  Building,
  Landmark,
  Phone,
  Mail,
  Globe,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Sample data for districts
const districts = [
  {
    id: 1,
    name: "Kalianda",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2940",
    totalVillages: 27,
    population: "98,245",
    area: "161.4 km²",
    description: "Kalianda adalah ibu kota Kabupaten Lampung Selatan, terletak di ujung selatan Pulau Sumatera. Dikenal dengan pantai-pantai indahnya dan merupakan pusat pemerintahan dan ekonomi di Lampung Selatan.",
    leader: "H. Ahmad Yani, S.H.",
    address: "Jl. Raya Kalianda No. 1, Kalianda, Lampung Selatan",
    phone: "(0727) 322013",
    email: "kecamatan.kalianda@lampungselatan.go.id",
    website: "kalianda.lampungselatan.go.id",
    attractions: [
      "Pantai Kalianda", 
      "Pantai Way Belerang", 
      "Taman Kota Kalianda",
      "Pasar Tradisional Kalianda"
    ],
    products: [
      "Keripik Pisang",
      "Kopi Kalianda",
      "Olahan Hasil Laut",
      "Batik Tapis"
    ]
  },
  {
    id: 2,
    name: "Rajabasa",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2940",
    totalVillages: 16,
    population: "54,123",
    area: "100.8 km²",
    description: "Rajabasa terletak di kaki Gunung Rajabasa, dengan pemandangan yang indah dan udara yang sejuk. Kecamatan ini berbatasan langsung dengan Selat Sunda.",
    leader: "Drs. Sutrisno",
    address: "Jl. Raya Rajabasa No. 15, Rajabasa, Lampung Selatan",
    phone: "(0727) 322014",
    email: "kecamatan.rajabasa@lampungselatan.go.id",
    website: "rajabasa.lampungselatan.go.id",
    attractions: [
      "Gunung Rajabasa", 
      "Pantai Wartawan", 
      "Pulau Sebesi",
      "Mata Air Panas"
    ],
    products: [
      "Anyaman Bambu",
      "Madu Hutan",
      "Gula Aren",
      "Kerajinan Kayu"
    ]
  },
  {
    id: 3,
    name: "Way Panji",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=3270",
    totalVillages: 8,
    population: "32,654",
    area: "38.5 km²",
    description: "Way Panji adalah kecamatan terkecil di Lampung Selatan, terkenal dengan pertanian padi yang subur dan air terjun indah yang tersembunyi di antara pepohonan.",
    leader: "H. Suparman, M.M.",
    address: "Jl. Way Panji No. 7, Way Panji, Lampung Selatan",
    phone: "(0727) 322015",
    email: "kecamatan.waypanji@lampungselatan.go.id",
    website: "waypanji.lampungselatan.go.id",
    attractions: [
      "Air Terjun Way Kalam", 
      "Taman Agrowisata", 
      "Bendungan Way Panji",
      "Hutan Bambu"
    ],
    products: [
      "Beras Way Panji",
      "Kerajinan Bambu",
      "Madu Kelulut",
      "Olahan Pisang"
    ]
  },
  {
    id: 4,
    name: "Natar",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2940",
    totalVillages: 22,
    population: "87,521",
    area: "213.8 km²",
    description: "Natar adalah kecamatan terbesar dan terpadat di Lampung Selatan, berbatasan langsung dengan Kota Bandar Lampung. Memiliki area industri dan pertanian yang luas.",
    leader: "Dra. Hj. Siti Aminah",
    address: "Jl. Raya Natar No. 101, Natar, Lampung Selatan",
    phone: "(0727) 322016",
    email: "kecamatan.natar@lampungselatan.go.id",
    website: "natar.lampungselatan.go.id",
    attractions: [
      "Taman Wisata Lembah Hijau", 
      "Monumen Krakatau", 
      "Taman Budaya Natar",
      "Tugu Integrasi"
    ],
    products: [
      "Batik Tapis",
      "Aneka Keripik",
      "Ikan Asap",
      "Olahan Singkong"
    ]
  },
  {
    id: 5,
    name: "Jati Agung",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    totalVillages: 21,
    population: "76,321",
    area: "164.5 km²",
    description: "Jati Agung terkenal dengan Kampus ITERA (Institut Teknologi Sumatera) dan merupakan kecamatan yang berkembang pesat dengan banyak perumahan dan kawasan pendidikan.",
    leader: "H. Fathoni, S.IP.",
    address: "Jl. Raya Jati Agung No. 28, Jati Agung, Lampung Selatan",
    phone: "(0727) 322017",
    email: "kecamatan.jatiagung@lampungselatan.go.id",
    website: "jatiagung.lampungselatan.go.id",
    attractions: [
      "Kampus ITERA", 
      "Bukit Kabut", 
      "Waduk Jati Agung",
      "Taman Teknologi"
    ],
    products: [
      "Kerajinan Tangan",
      "Makanan Olahan",
      "Produk Pertanian",
      "Kopi"
    ]
  },
  {
    id: 6,
    name: "Sidomulyo",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=2880",
    totalVillages: 16,
    population: "45,876",
    area: "122.6 km²",
    description: "Sidomulyo dikenal sebagai sentra produksi keripik pisang terbesar di Lampung Selatan. Memiliki lahan pertanian dan perkebunan yang luas dan subur.",
    leader: "Drs. Haryanto",
    address: "Jl. Sidomulyo No. 42, Sidomulyo, Lampung Selatan",
    phone: "(0727) 322018",
    email: "kecamatan.sidomulyo@lampungselatan.go.id",
    website: "sidomulyo.lampungselatan.go.id",
    attractions: [
      "Agrowisata Pisang", 
      "Pasar Oleh-oleh", 
      "Taman Bunga",
      "Peternakan Sapi Perah"
    ],
    products: [
      "Keripik Pisang",
      "Dodol Sidomulyo",
      "Kopi Robusta",
      "Susu dan Olahannya"
    ]
  }
];

const Kecamatan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDistrict, setActiveDistrict] = useState(districts[0]);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredDistricts(districts);
    } else {
      const filtered = districts.filter(district => 
        district.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDistricts(filtered);
    }
  };

  const handleDistrictClick = (district: any) => {
    setActiveDistrict(district);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-20 bg-lamsel-red text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Kecamatan di Lampung Selatan</h1>
          <p className="max-w-2xl">
            Kenali lebih dekat kecamatan-kecamatan di Kabupaten Lampung Selatan, mulai dari profil, potensi wisata, dan produk unggulan.
          </p>
        </div>
      </div>
      
      {/* District Detail Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side - District Detail */}
          <div className="lg:col-span-2">
            <div className="relative mb-6 h-64 overflow-hidden rounded-xl">
              <img 
                src={activeDistrict.image} 
                alt={activeDistrict.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white">Kecamatan {activeDistrict.name}</h2>
              </div>
            </div>
            
            <Tabs defaultValue="profile">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="contact">Kontak</TabsTrigger>
                <TabsTrigger value="attractions">Wisata</TabsTrigger>
                <TabsTrigger value="products">Produk</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Kecamatan</CardTitle>
                    <CardDescription>
                      Informasi umum tentang Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      {activeDistrict.description}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center">
                        <Users className="mb-2 h-8 w-8 text-lamsel-red" />
                        <span className="text-sm text-gray-500">Populasi</span>
                        <span className="text-lg font-semibold">{activeDistrict.population}</span>
                      </div>
                      
                      <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center">
                        <Building className="mb-2 h-8 w-8 text-lamsel-red" />
                        <span className="text-sm text-gray-500">Jumlah Desa</span>
                        <span className="text-lg font-semibold">{activeDistrict.totalVillages}</span>
                      </div>
                      
                      <div className="flex flex-col items-center rounded-lg bg-gray-50 p-4 text-center">
                        <MapPin className="mb-2 h-8 w-8 text-lamsel-red" />
                        <span className="text-sm text-gray-500">Luas Wilayah</span>
                        <span className="text-lg font-semibold">{activeDistrict.area}</span>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center">
                        <Landmark className="mr-2 h-5 w-5 text-lamsel-red" />
                        <span className="font-medium">Camat:</span>
                        <span className="ml-2">{activeDistrict.leader}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Kontak</CardTitle>
                    <CardDescription>
                      Hubungi Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-5 w-5 shrink-0 text-lamsel-red" />
                      <span>{activeDistrict.address}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-lamsel-red" />
                      <span>{activeDistrict.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-lamsel-red" />
                      <span>{activeDistrict.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-lamsel-red" />
                      <span>{activeDistrict.website}</span>
                    </div>
                    
                    <div className="mt-4">
                      <Button className="bg-lamsel-red hover:bg-lamsel-red/80">
                        Hubungi Kecamatan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="attractions">
                <Card>
                  <CardHeader>
                    <CardTitle>Destinasi Wisata</CardTitle>
                    <CardDescription>
                      Tempat wisata terkenal di Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeDistrict.attractions.map((attraction, index) => (
                        <div key={index} className="flex items-center rounded-lg border p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lamsel-red/10 text-lamsel-red">
                            {index + 1}
                          </div>
                          <span className="ml-3">{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <CardTitle>Produk Unggulan</CardTitle>
                    <CardDescription>
                      Produk khas dan unggulan dari Kecamatan {activeDistrict.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {activeDistrict.products.map((product, index) => (
                        <div key={index} className="flex items-center rounded-lg border p-3">
                          <div className="h-3 w-3 rounded-full bg-lamsel-red"></div>
                          <span className="ml-3">{product}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Side - District List */}
          <div>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text"
                  placeholder="Cari kecamatan..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              {filteredDistricts.map(district => (
                <Card 
                  key={district.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    activeDistrict.id === district.id ? 'border-lamsel-red' : ''
                  }`}
                  onClick={() => handleDistrictClick(district)}
                >
                  <CardContent className="flex items-center p-4">
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img 
                        src={district.image} 
                        alt={district.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium">Kecamatan {district.name}</h3>
                      <p className="text-sm text-gray-500">{district.totalVillages} desa</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredDistricts.length === 0 && (
                <div className="rounded-lg border p-6 text-center">
                  <p>Tidak ada kecamatan yang ditemukan.</p>
                  <Button 
                    variant="link" 
                    className="mt-2 text-lamsel-red"
                    onClick={() => setSearchTerm('')}
                  >
                    Reset pencarian
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Kecamatan;
