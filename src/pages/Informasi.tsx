
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Informasi = () => {
  // Mock data artikel
  const [articles] = useState([
    {
      id: 1,
      title: 'Pembangunan Jalan Tol Lampung Selatan Dimulai',
      excerpt: 'Pembangunan infrastruktur jalan tol di Lampung Selatan resmi dimulai untuk meningkatkan konektivitas dan mendukung pertumbuhan ekonomi daerah.',
      image: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
      category: 'Infrastruktur',
      date: '2024-01-15',
      author: 'Tim Redaksi'
    },
    {
      id: 2,
      title: 'Festival Budaya Lampung Selatan 2024',
      excerpt: 'Festival budaya tahunan Lampung Selatan akan digelar dengan menampilkan berbagai kesenian tradisional dan kuliner khas daerah.',
      image: '/lovable-uploads/417ca5e8-2fd5-417a-b33b-2acc06d3986d.png',
      category: 'Budaya',
      date: '2024-01-12',
      author: 'Redaksi Budaya'
    },
    {
      id: 3,
      title: 'Program UMKM Berkelanjutan Lamsel',
      excerpt: 'Pemerintah Lampung Selatan meluncurkan program pemberdayaan UMKM berkelanjutan untuk meningkatkan kesejahteraan masyarakat.',
      image: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
      category: 'Ekonomi',
      date: '2024-01-10',
      author: 'Tim Ekonomi'
    },
    {
      id: 4,
      title: 'Wisata Bahari Lamsel Semakin Diminati',
      excerpt: 'Destinasi wisata bahari di Lampung Selatan mengalami peningkatan kunjungan wisatawan domestik dan mancanegara.',
      image: '/lovable-uploads/417ca5e8-2fd5-417a-b33b-2acc06d3986d.png',
      category: 'Pariwisata',
      date: '2024-01-08',
      author: 'Redaksi Pariwisata'
    },
    {
      id: 5,
      title: 'Inovasi Teknologi Pertanian Modern',
      excerpt: 'Petani Lampung Selatan mulai mengadopsi teknologi modern untuk meningkatkan produktivitas dan kualitas hasil pertanian.',
      image: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
      category: 'Pertanian',
      date: '2024-01-05',
      author: 'Tim Pertanian'
    },
    {
      id: 6,
      title: 'Pelestarian Lingkungan Hutan Mangrove',
      excerpt: 'Program pelestarian hutan mangrove di pesisir Lampung Selatan berhasil meningkatkan ekosistem dan mencegah abrasi pantai.',
      image: '/lovable-uploads/417ca5e8-2fd5-417a-b33b-2acc06d3986d.png',
      category: 'Lingkungan',
      date: '2024-01-03',
      author: 'Redaksi Lingkungan'
    }
  ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Informasi Terkini
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Dapatkan berita dan informasi terbaru seputar pembangunan, budaya, dan perkembangan Lampung Selatan
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
                      {article.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold line-clamp-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>{formatDate(article.date)}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 line-clamp-3 mb-4">
                      {article.excerpt}
                    </CardDescription>
                    <Link to={`/informasi/detail?id=${article.id}`}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Baca Selengkapnya
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Informasi;
