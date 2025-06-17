
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp, Clock, Eye } from 'lucide-react';

const Informasi = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data artikel
  const articles = [
    {
      id: 1,
      title: "Festival Krakatau 2024 Siap Memukau Wisatawan",
      excerpt: "Festival Krakatau tahun ini menampilkan berbagai atraksi budaya dan kuliner khas Lampung Selatan yang akan memukau para wisatawan dari berbagai daerah.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500",
      author: "Admin Pariwisata",
      date: "15 Des 2024",
      readTime: "5 menit",
      category: "Event",
      views: "1.2k"
    },
    {
      id: 2,
      title: "Pembangunan Infrastruktur Wisata Pantai Tanjung Putus",
      excerpt: "Pemerintah daerah melakukan pembangunan infrastruktur untuk meningkatkan kenyamanan wisatawan di Pantai Tanjung Putus, termasuk fasilitas parkir dan jalan akses.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      author: "Dinas Pariwisata",
      date: "12 Des 2024",
      readTime: "4 menit",
      category: "Pembangunan",
      views: "890"
    },
    {
      id: 3,
      title: "UMKM Kopi Lamsel Meraih Penghargaan Nasional",
      excerpt: "Produk kopi robusta dari Lampung Selatan berhasil meraih penghargaan tingkat nasional dalam kompetisi produk unggulan daerah tahun 2024.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
      author: "Dinas Koperasi",
      date: "10 Des 2024",
      readTime: "3 menit",
      category: "UMKM",
      views: "2.1k"
    },
    {
      id: 4,
      title: "Program Digitalisasi Desa Wisata di Kalianda",
      excerpt: "Desa wisata di Kecamatan Kalianda mulai menerapkan sistem digitalisasi untuk memudahkan promosi dan reservasi bagi wisatawan yang ingin berkunjung.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500",
      author: "Tim Digital",
      date: "8 Des 2024",
      readTime: "6 menit",
      category: "Digital",
      views: "756"
    },
    {
      id: 5,
      title: "Pelestarian Budaya Lokal Melalui Seni Pertunjukan",
      excerpt: "Komunitas seni di Lampung Selatan aktif melestarikan budaya lokal melalui berbagai pertunjukan seni tradisional yang rutin diadakan setiap bulan.",
      image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=500",
      author: "Sanggar Seni",
      date: "5 Des 2024",
      readTime: "4 menit",
      category: "Budaya",
      views: "1.5k"
    },
    {
      id: 6,
      title: "Inovasi Produk Kerajinan Bambu dari Desa Wisata",
      excerpt: "Pengrajin bambu di desa wisata menciptakan inovasi produk kerajinan yang ramah lingkungan dan memiliki nilai ekonomi tinggi untuk meningkatkan kesejahteraan masyarakat.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      author: "Kelompok Tani",
      date: "3 Des 2024",
      readTime: "5 menit",
      category: "Kerajinan",
      views: "634"
    }
  ];

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'Event', label: 'Event' },
    { value: 'Pembangunan', label: 'Pembangunan' },
    { value: 'UMKM', label: 'UMKM' },
    { value: 'Digital', label: 'Digital' },
    { value: 'Budaya', label: 'Budaya' },
    { value: 'Kerajinan', label: 'Kerajinan' }
  ];

  // Filter articles based on search and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get trending articles (most viewed)
  const trendingArticles = [...articles].sort((a, b) => 
    parseFloat(b.views.replace('k', '000').replace('.', '')) - 
    parseFloat(a.views.replace('k', '000').replace('.', ''))
  ).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-lamsel-blue via-blue-600 to-blue-800 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-fade-in">
                <TrendingUp className="w-4 h-4 mr-2" />
                Berita Terkini Lampung Selatan
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight">
                Informasi & <span className="text-yellow-300">Berita</span>
              </h1>
              
              <p className="text-xl md:text-2xl opacity-90 animate-fade-in leading-relaxed">
                Ikuti perkembangan terbaru seputar pariwisata, pembangunan, dan kemajuan Lampung Selatan
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Update Harian</span>
                </div>
                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Terpercaya</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-lamsel-blue mb-2">{articles.length}</div>
                <div className="text-gray-600">Total Artikel</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lamsel-blue mb-2">{categories.length - 1}</div>
                <div className="text-gray-600">Kategori</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lamsel-blue mb-2">24/7</div>
                <div className="text-gray-600">Update</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-6 bg-white sticky top-20 z-40 border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Cari artikel berita..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-lamsel-blue focus:ring-lamsel-blue/20"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Filter size={18} className="text-gray-600" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 h-12 border-gray-300">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-600">
              Menampilkan {filteredArticles.length} dari {articles.length} artikel
            </div>
          </div>
        </section>

        {/* Trending Articles Section */}
        {searchQuery === '' && selectedCategory === 'all' && (
          <section className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-lamsel-blue" size={24} />
                <h2 className="text-2xl font-bold text-gray-900">Trending Hari Ini</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingArticles.map((article, index) => (
                  <div key={article.id} className="relative">
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-lamsel-blue text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    <ArticleCard {...article} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {filteredArticles.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredArticles.map((article, index) => (
                    <div 
                      key={article.id} 
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ArticleCard {...article} />
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {filteredArticles.length >= 6 && (
                  <div className="text-center mt-12">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white transition-all duration-300"
                    >
                      Muat Lebih Banyak
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">Artikel tidak ditemukan</h3>
                  <p className="text-gray-600 mb-6">
                    Maaf, kami tidak dapat menemukan artikel yang sesuai dengan pencarian Anda.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="bg-lamsel-blue hover:bg-blue-700"
                  >
                    Reset Pencarian
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-lamsel-blue to-blue-700">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-4">Jangan Lewatkan Berita Terbaru</h2>
              <p className="text-xl opacity-90 mb-8">
                Berlangganan newsletter kami untuk mendapatkan informasi terkini langsung di email Anda
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Masukkan email Anda"
                  className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                />
                <Button 
                  size="lg"
                  className="bg-white text-lamsel-blue hover:bg-gray-100 font-semibold px-8"
                >
                  Berlangganan
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Informasi;
