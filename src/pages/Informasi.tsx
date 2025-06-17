
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from 'lucide-react';

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
      category: "Event"
    },
    {
      id: 2,
      title: "Pembangunan Infrastruktur Wisata Pantai Tanjung Putus",
      excerpt: "Pemerintah daerah melakukan pembangunan infrastruktur untuk meningkatkan kenyamanan wisatawan di Pantai Tanjung Putus, termasuk fasilitas parkir dan jalan akses.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
      author: "Dinas Pariwisata",
      date: "12 Des 2024",
      readTime: "4 menit",
      category: "Pembangunan"
    },
    {
      id: 3,
      title: "UMKM Kopi Lamsel Meraih Penghargaan Nasional",
      excerpt: "Produk kopi robusta dari Lampung Selatan berhasil meraih penghargaan tingkat nasional dalam kompetisi produk unggulan daerah tahun 2024.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500",
      author: "Dinas Koperasi",
      date: "10 Des 2024",
      readTime: "3 menit",
      category: "UMKM"
    },
    {
      id: 4,
      title: "Program Digitalisasi Desa Wisata di Kalianda",
      excerpt: "Desa wisata di Kecamatan Kalianda mulai menerapkan sistem digitalisasi untuk memudahkan promosi dan reservasi bagi wisatawan yang ingin berkunjung.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500",
      author: "Tim Digital",
      date: "8 Des 2024",
      readTime: "6 menit",
      category: "Digital"
    },
    {
      id: 5,
      title: "Pelestarian Budaya Lokal Melalui Seni Pertunjukan",
      excerpt: "Komunitas seni di Lampung Selatan aktif melestarikan budaya lokal melalui berbagai pertunjukan seni tradisional yang rutin diadakan setiap bulan.",
      image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=500",
      author: "Sanggar Seni",
      date: "5 Des 2024",
      readTime: "4 menit",
      category: "Budaya"
    },
    {
      id: 6,
      title: "Inovasi Produk Kerajinan Bambu dari Desa Wisata",
      excerpt: "Pengrajin bambu di desa wisata menciptakan inovasi produk kerajinan yang ramah lingkungan dan memiliki nilai ekonomi tinggi untuk meningkatkan kesejahteraan masyarakat.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
      author: "Kelompok Tani",
      date: "3 Des 2024",
      readTime: "5 menit",
      category: "Kerajinan"
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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-lamsel-blue to-blue-700 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Informasi & Berita
              </h1>
              <p className="text-xl opacity-90 animate-fade-in">
                Ikuti perkembangan terbaru seputar pariwisata, pembangunan, dan kemajuan Lampung Selatan
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Cari artikel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-600" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
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
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <div key={article.id} className="animate-on-scroll">
                    <ArticleCard {...article} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Artikel tidak ditemukan</h3>
                <p className="text-gray-500">Coba gunakan kata kunci yang berbeda atau pilih kategori lain</p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Informasi;
