
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Share, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const InformasiDetail = () => {
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  const { toast } = useToast();
  
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Ahmad Santoso',
      date: '2024-01-16',
      comment: 'Informasi yang sangat bermanfaat! Semoga pembangunan ini dapat berjalan lancar.'
    },
    {
      id: 2,
      name: 'Sari Dewi',
      date: '2024-01-16',
      comment: 'Terima kasih atas informasinya. Ditunggu update selanjutnya.'
    }
  ]);
  
  const [newComment, setNewComment] = useState({
    name: '',
    comment: ''
  });

  // Mock data artikel
  const articles = {
    1: {
      id: 1,
      title: 'Pembangunan Jalan Tol Lampung Selatan Dimulai',
      content: `
        <p>Pembangunan infrastruktur jalan tol di Lampung Selatan resmi dimulai untuk meningkatkan konektivitas dan mendukung pertumbuhan ekonomi daerah. Proyek ambisius ini diharapkan dapat menjadi solusi untuk mengatasi kemacetan dan mempercepat distribusi barang serta jasa di wilayah Lampung Selatan.</p>
        
        <p>Gubernur Lampung dalam sambutannya menyatakan bahwa pembangunan jalan tol ini merupakan bagian dari rencana strategis pembangunan infrastruktur jangka panjang. "Jalan tol ini akan menjadi tulang punggung perekonomian Lampung Selatan dan akan memberikan dampak positif bagi masyarakat," ujarnya.</p>
        
        <p>Proyek jalan tol sepanjang 45 kilometer ini akan menghubungkan beberapa kecamatan penting di Lampung Selatan, termasuk Kalianda, Rajabasa, dan Bakauheni. Dengan adanya jalan tol ini, waktu tempuh antar kota akan berkurang signifikan, dari yang sebelumnya membutuhkan waktu 2 jam menjadi hanya 45 menit.</p>
        
        <p>Dari segi ekonomi, pembangunan jalan tol ini diperkirakan akan menciptakan ribuan lapangan kerja baru, baik selama masa konstruksi maupun setelah jalan tol beroperasi. Selain itu, aksesibilitas yang lebih baik akan mendorong investasi di sektor pariwisata, perdagangan, dan industri.</p>
        
        <p>Target penyelesaian proyek ini adalah dalam waktu 3 tahun, dengan anggaran yang berasal dari APBN dan kerjasama dengan pihak swasta. Pemerintah juga berkomitmen untuk memastikan bahwa pembangunan ini tidak merusak lingkungan dan tetap memperhatikan aspek sosial masyarakat setempat.</p>
      `,
      image: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
      category: 'Infrastruktur',
      date: '2024-01-15',
      author: 'Tim Redaksi'
    },
    2: {
      id: 2,
      title: 'Festival Budaya Lampung Selatan 2024',
      content: `
        <p>Festival budaya tahunan Lampung Selatan akan digelar dengan menampilkan berbagai kesenian tradisional dan kuliner khas daerah. Event yang ditunggu-tunggu ini akan berlangsung selama tiga hari penuh dengan berbagai pertunjukan menarik.</p>
        
        <p>Tahun ini, festival budaya mengangkat tema "Pelestarian Warisan Budaya untuk Generasi Masa Depan" dengan tujuan memperkenalkan kekayaan budaya Lampung Selatan kepada generasi muda dan wisatawan.</p>
        
        <p>Berbagai kesenian tradisional akan ditampilkan, mulai dari tari Melinting, tari Jangget, hingga pertunjukan musik tradisional menggunakan alat musik khas seperti talo balak dan cetik. Selain itu, akan ada pameran kerajinan tangan lokal dan demo pembuatan makanan tradisional.</p>
        
        <p>Bupati Lampung Selatan mengharapkan festival ini dapat menjadi ajang promosi budaya sekaligus meningkatkan kunjungan wisatawan. "Festival budaya ini adalah wujud komitmen kita untuk melestarikan warisan nenek moyang sambil mengembangkan industri pariwisata," katanya.</p>
        
        <p>Festival akan berlangsung di Pantai Mutun dengan berbagai fasilitas pendukung yang telah disiapkan. Masyarakat dapat menikmati pertunjukan secara gratis dan ikut serta dalam berbagai workshop budaya yang akan diselenggarakan.</p>
      `,
      image: '/lovable-uploads/417ca5e8-2fd5-417a-b33b-2acc06d3986d.png',
      category: 'Budaya',
      date: '2024-01-12',
      author: 'Redaksi Budaya'
    }
  };

  const currentArticle = articles[articleId as keyof typeof articles];
  
  // Related articles (exclude current article)
  const relatedArticles = [
    {
      id: 3,
      title: 'Program UMKM Berkelanjutan Lamsel',
      image: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
      category: 'Ekonomi'
    },
    {
      id: 4,
      title: 'Wisata Bahari Lamsel Semakin Diminati',
      image: '/lovable-uploads/417ca5e8-2fd5-417a-b33b-2acc06d3986d.png',
      category: 'Pariwisata'
    },
    {
      id: 5,
      title: 'Inovasi Teknologi Pertanian Modern',
      image: '/lovable-uploads/52981017-1492-4aa2-8101-27cb3682b072.png',
      category: 'Pertanian'
    }
  ].filter(article => article.id !== parseInt(articleId || '0'));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentArticle?.title,
        text: 'Baca artikel menarik ini dari Lamsel Maju',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link berhasil disalin!",
        description: "Link artikel telah disalin ke clipboard Anda.",
      });
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.comment) {
      const comment = {
        id: comments.length + 1,
        name: newComment.name,
        date: new Date().toISOString().split('T')[0],
        comment: newComment.comment
      };
      setComments([comment, ...comments]);
      setNewComment({ name: '', comment: '' });
      toast({
        title: "Komentar berhasil ditambahkan!",
        description: "Terima kasih atas partisipasi Anda.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!currentArticle) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8">Artikel yang Anda cari tidak tersedia.</p>
            <Link to="/informasi">
              <Button>Kembali ke Informasi</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Article Header */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link to="/informasi" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  ← Kembali ke Informasi
                </Link>
              </div>
              
              <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">
                {currentArticle.category}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {currentArticle.title}
              </h1>
              
              <div className="flex items-center justify-between mb-8 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{formatDate(currentArticle.date)}</span>
                  <span>•</span>
                  <span>{currentArticle.author}</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  className="flex items-center space-x-2"
                >
                  <Share size={16} />
                  <span>Bagikan</span>
                </Button>
              </div>
              
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <img 
                  src={currentArticle.image} 
                  alt={currentArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              />
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Komentar ({comments.length})</h2>
              
              {/* Comment Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Tambahkan Komentar</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <Input
                      placeholder="Nama Anda"
                      value={newComment.name}
                      onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                      required
                    />
                    <Textarea
                      placeholder="Tulis komentar Anda..."
                      value={newComment.comment}
                      onChange={(e) => setNewComment({...newComment, comment: e.target.value})}
                      rows={4}
                      required
                    />
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Kirim Komentar
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Berita Berikutnya</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
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
                      <CardTitle className="text-lg font-bold line-clamp-2 hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default InformasiDetail;
