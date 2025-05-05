
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Calendar,
  Send,
  Share2,
  Heart,
  ShoppingBag,
  ChevronLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define TypeScript interfaces for our data structures
interface SocialMedia {
  instagram?: string;
  facebook?: string;
  website?: string;
  [key: string]: string | undefined;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface Review {
  id: number;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  userImage: string;
}

interface UMKM {
  id: number;
  name: string;
  image: string;
  category: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  establishedYear: number;
  ownerName: string;
  totalEmployees: number;
  socialMedia: SocialMedia;
  products: Product[];
  reviews: Review[];
}

// Sample data for UMKM details
const umkmData: UMKM[] = [
  {
    id: 1,
    name: "Kopi Lamsel",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=3270",
    category: "Kuliner",
    location: "Kalianda, Lampung Selatan",
    address: "Jl. Sultan Hasanuddin No. 45, Kalianda",
    phone: "+62 812-3456-7890",
    email: "kopilamsel@example.com",
    description: "Produsen kopi lokal dengan berbagai varian kopi khas Lampung Selatan yang diproses dengan metode tradisional.",
    establishedYear: 2015,
    ownerName: "Ahmad Sutrisno",
    totalEmployees: 12,
    socialMedia: {
      instagram: "@kopilamsel",
      facebook: "Kopi Lamsel Official",
      website: "www.kopilamsel.com"
    },
    products: [
      {
        id: 101,
        name: "Kopi Robusta Lampung",
        price: 45000,
        image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=3270",
        description: "Kopi Robusta premium dari pegunungan Lampung Selatan dengan cita rasa khas dan aroma yang kuat.",
        inStock: true
      },
      {
        id: 102,
        name: "Kopi Luwak Lampung",
        price: 120000,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=3270",
        description: "Kopi luwak asli dengan proses fermentasi alami yang menghasilkan rasa halus dan tidak pahit.",
        inStock: true
      },
      {
        id: 103,
        name: "Kopi Arabica Lampung",
        price: 65000,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=3729",
        description: "Kopi Arabica dari dataran tinggi Lampung dengan rasa fruity dan sedikit keasaman.",
        inStock: false
      }
    ],
    reviews: [
      {
        id: 201,
        userName: "Budi Santoso",
        rating: 5,
        date: "2023-05-15",
        comment: "Kopinya sangat enak dan aromanya kuat. Pengiriman cepat dan pelayanan ramah.",
        userImage: "https://i.pravatar.cc/150?img=1"
      },
      {
        id: 202,
        userName: "Dewi Lestari",
        rating: 4,
        date: "2023-04-22",
        comment: "Saya suka kopi robustanya, tapi pengemasan bisa lebih ditingkatkan lagi.",
        userImage: "https://i.pravatar.cc/150?img=5"
      },
      {
        id: 203,
        userName: "Hendro Wibowo",
        rating: 5,
        date: "2023-03-10",
        comment: "Kopi luwaknya luar biasa! Tidak terlalu asam dan sangat cocok untuk pencinta kopi seperti saya.",
        userImage: "https://i.pravatar.cc/150?img=3"
      }
    ]
  },
  {
    id: 2,
    name: "Batik Tapis Lamsel",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=2880",
    category: "Kerajinan",
    location: "Natar, Lampung Selatan",
    address: "Jl. Raya Natar No. 78, Natar",
    phone: "+62 812-3456-7891",
    email: "batiktapis@example.com",
    description: "Pengrajin batik tapis tradisional Lampung yang menggabungkan motif khas daerah dengan teknik modern.",
    establishedYear: 2010,
    ownerName: "Siti Nurhaliza",
    totalEmployees: 25,
    socialMedia: {
      instagram: "@batiktapislamsel",
      facebook: "Batik Tapis Lamsel",
      website: "www.batiktapislamsel.com"
    },
    products: [
      {
        id: 201,
        name: "Kain Tapis Motif Kapal",
        price: 550000,
        image: "https://images.unsplash.com/photo-1603454045079-97a80b0333f2?q=80&w=3271",
        description: "Kain tapis dengan motif kapal khas Lampung yang dibuat dengan benang emas asli.",
        inStock: true
      },
      {
        id: 202,
        name: "Selendang Tapis",
        price: 250000,
        image: "https://images.unsplash.com/photo-1611911813383-67769b37a149?q=80&w=3270",
        description: "Selendang dengan sulaman tapis yang elegan, cocok untuk acara formal.",
        inStock: true
      },
      {
        id: 203,
        name: "Kemeja Motif Tapis",
        price: 325000,
        image: "https://images.unsplash.com/photo-1480881683242-1b5f74a53def?q=80&w=3338",
        description: "Kemeja modern dengan aplikasi motif tapis yang stylish dan nyaman dipakai.",
        inStock: true
      }
    ],
    reviews: [
      {
        id: 301,
        userName: "Ratna Dewi",
        rating: 5,
        date: "2023-05-20",
        comment: "Kualitas kain tapisnya sangat bagus dan detail motifnya rapi. Saya sangat puas dengan pembelian ini.",
        userImage: "https://i.pravatar.cc/150?img=10"
      },
      {
        id: 302,
        userName: "Agus Purnomo",
        rating: 5,
        date: "2023-04-05",
        comment: "Kemeja motif tapisnya sangat bagus dan nyaman dipakai. Banyak yang tanya dimana belinya.",
        userImage: "https://i.pravatar.cc/150?img=11"
      }
    ]
  },
  // ... other UMKM data the same as defined in UMKM.tsx
];

const UMKMDetail = () => {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get('id') || '1');
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [userName, setUserName] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Fetch UMKM data based on ID
    const foundUmkm = umkmData.find(item => item.id === id);
    if (foundUmkm) {
      setUmkm(foundUmkm);
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = (productId: number) => {
    toast({
      title: "Produk ditambahkan ke keranjang",
      description: "Anda dapat melihat keranjang belanja Anda untuk checkout",
    });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !review.trim()) {
      toast({
        title: "Tidak dapat mengirim ulasan",
        description: "Harap isi nama dan ulasan Anda",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Ulasan terkirim!",
      description: "Terima kasih atas ulasan Anda",
    });
    
    // Reset form
    setReview('');
    setUserName('');
    setRating(5);
  };
  
  const handleBackToList = () => {
    navigate('/umkm');
  };
  
  const handleShareUMKM = () => {
    if (navigator.share) {
      navigator.share({
        title: umkm?.name || '',
        text: `Lihat UMKM ${umkm?.name || ''} di Lampung Selatan`,
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

  const handleLikeUMKM = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Dihapus dari favorit" : "Ditambahkan ke favorit",
      description: isLiked ? "UMKM dihapus dari daftar favorit Anda" : "UMKM ditambahkan ke daftar favorit Anda",
    });
  };

  if (!umkm) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">UMKM tidak ditemukan</h1>
            <Button 
              className="mt-4 bg-lamsel-green hover:bg-lamsel-green/80"
              onClick={handleBackToList}
            >
              Kembali ke Daftar UMKM
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < count ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back button and header */}
      <div className="pt-16 bg-lamsel-green/10">
        <div className="container mx-auto p-4">
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="mb-4 flex items-center border-lamsel-green text-lamsel-green hover:bg-lamsel-green hover:text-white"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar UMKM
          </Button>
        </div>
      </div>
      
      {/* UMKM Header */}
      <section className="bg-lamsel-green/10">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* UMKM Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl h-[300px] md:h-[400px]">
                <img 
                  src={umkm.image} 
                  alt={umkm.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-lamsel-green text-white">
                  {umkm.category}
                </Badge>
              </div>
            </div>
            
            {/* UMKM Info */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{umkm.name}</h1>
                  <div className="flex items-center mt-2">
                    {renderStars(
                      umkm.reviews.reduce((acc: number, r: Review) => acc + r.rating, 0) / umkm.reviews.length
                    )}
                    <span className="ml-2 text-sm text-gray-600">
                      ({umkm.reviews.length} ulasan)
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={handleShareUMKM}
                    className="border-lamsel-green text-lamsel-green hover:bg-lamsel-green hover:text-white"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleLikeUMKM}
                    className={`${isLiked ? 'bg-red-100 text-red-500 border-red-200' : 'border-lamsel-green text-lamsel-green hover:bg-lamsel-green hover:text-white'}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start">
                  <MapPin className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <div>
                    <div className="font-medium">Alamat</div>
                    <div>{umkm.address}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <div>
                    <div className="font-medium">Telepon</div>
                    <div>{umkm.phone}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div>{umkm.email}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="mr-2 h-5 w-5 shrink-0 text-lamsel-green" />
                  <div>
                    <div className="font-medium">Tahun Berdiri</div>
                    <div>{umkm.establishedYear}</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h2 className="text-xl font-semibold">Deskripsi</h2>
                <p className="mt-2 text-gray-700">{umkm.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-4">
                {umkm.socialMedia && Object.entries(umkm.socialMedia).map(([key, value]) => (
                  <Badge key={key} variant="outline" className="text-sm">
                    {key}: {value || ''}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tabs section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full mb-8 bg-gray-100 p-1">
              <TabsTrigger value="products" className="flex-1">Produk</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">Ulasan</TabsTrigger>
              <TabsTrigger value="about" className="flex-1">Tentang UMKM</TabsTrigger>
            </TabsList>
            
            {/* Products Tab */}
            <TabsContent value="products" className="mt-4">
              <h2 className="text-2xl font-bold mb-6">Produk dari {umkm.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {umkm.products.map((product: Product) => (
                  <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold px-3 py-1 bg-red-500 rounded-full">Stok Habis</span>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="text-lamsel-green font-bold">
                          Rp{product.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      <Button 
                        className="w-full bg-lamsel-green hover:bg-lamsel-green/80"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        {product.inStock ? 'Tambah ke Keranjang' : 'Stok Habis'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold mb-6">Ulasan Pelanggan</h2>
                
                {/* Review Form */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Tambahkan Ulasan</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nama</label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full p-2 border rounded-md"
                          placeholder="Nama Anda"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-6 w-6 cursor-pointer ${
                                star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                              }`}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Ulasan</label>
                        <Textarea
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Bagikan pengalaman Anda dengan produk ini..."
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="bg-lamsel-green hover:bg-lamsel-green/80"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Ulasan
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                {/* Review List */}
                <div className="space-y-4">
                  {umkm.reviews.map((review: Review) => (
                    <Card key={review.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <img 
                            src={review.userImage} 
                            alt={review.userName}
                            className="w-10 h-10 rounded-full mr-4 object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">{review.userName}</h4>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex mt-1 mb-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* About Tab */}
            <TabsContent value="about">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Tentang {umkm.name}</h2>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Profil UMKM</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Nama UMKM:</span>
                        <span>{umkm.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Kategori:</span>
                        <span>{umkm.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Pemilik:</span>
                        <span>{umkm.ownerName}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Tahun Berdiri:</span>
                        <span>{umkm.establishedYear}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Jumlah Karyawan:</span>
                        <span>{umkm.totalEmployees} orang</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Lokasi:</span>
                        <span>{umkm.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Deskripsi</h3>
                  <p className="text-gray-700 leading-relaxed">{umkm.description}</p>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    UMKM ini telah beroperasi sejak tahun {umkm.establishedYear} dan telah menjadi bagian penting dari ekonomi lokal Lampung Selatan. 
                    Dengan fokus pada kualitas dan pelestarian budaya lokal, {umkm.name} terus berkembang dan memberikan produk terbaik untuk pelanggan.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Kontak dan Media Sosial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Phone className="mr-2 h-5 w-5 text-lamsel-green" />
                        <span>{umkm.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="mr-2 h-5 w-5 text-lamsel-green" />
                        <span>{umkm.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {umkm.socialMedia && Object.entries(umkm.socialMedia).map(([key, value]) => (
                        <div key={key} className="flex items-center">
                          <span className="capitalize font-medium w-24">{key}:</span>
                          <span>{value || ''}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UMKMDetail;
