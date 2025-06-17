
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, Share2, MessageCircle, ArrowLeft, Facebook, Twitter, Send, Heart } from 'lucide-react';
import { toast } from "sonner";

const InformasiDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const articleId = searchParams.get('id');
  
  const [comment, setComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);

  // Mock article data
  const article = {
    id: 1,
    title: "Festival Krakatau 2024 Siap Memukau Wisatawan",
    content: `
      <p>Festival Krakatau 2024 akan segera digelar di Lampung Selatan dengan menghadirkan berbagai atraksi budaya dan kuliner khas yang akan memukau para wisatawan dari berbagai daerah. Festival tahunan ini telah menjadi salah satu agenda pariwisata unggulan yang ditunggu-tunggu.</p>

      <p>Tahun ini, Festival Krakatau mengusung tema "Pesona Budaya Nusantara di Ujung Sumatera" yang menampilkan kekayaan budaya lokal Lampung Selatan sekaligus memperkenalkan keragaman budaya nusantara kepada wisatawan.</p>

      <h3>Program Acara yang Menarik</h3>
      <p>Festival Krakatau 2024 akan berlangsung selama 5 hari dengan berbagai program menarik, antara lain:</p>
      <ul>
        <li>Pertunjukan tari tradisional Lampung</li>
        <li>Pameran kerajinan tangan lokal</li>
        <li>Festival kuliner khas Lampung Selatan</li>
        <li>Kompetisi fotografi wisata</li>
        <li>Pagelaran musik tradisional dan modern</li>
      </ul>

      <p>Kepala Dinas Pariwisata Lampung Selatan, Bapak Ahmad Susanto, mengungkapkan bahwa festival ini diharapkan dapat meningkatkan kunjungan wisatawan dan memberikan dampak ekonomi positif bagi masyarakat lokal.</p>

      <h3>Lokasi dan Waktu Pelaksanaan</h3>
      <p>Festival Krakatau 2024 akan diselenggarakan di Pantai Tanjung Putus, Kecamatan Kalianda, pada tanggal 20-24 Desember 2024. Lokasi ini dipilih karena keindahan alamnya yang eksotis dan mudah diakses oleh wisatawan.</p>

      <p>Seluruh rangkaian acara festival dapat dinikmati secara gratis oleh pengunjung. Panitia juga telah menyiapkan berbagai fasilitas pendukung seperti area parkir yang luas, toilet umum, dan pos kesehatan.</p>
    `,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    author: "Admin Pariwisata",
    date: "15 Desember 2024",
    readTime: "5 menit",
    category: "Event"
  };

  // Mock related articles
  const relatedArticles = [
    {
      id: 2,
      title: "Pembangunan Infrastruktur Wisata Pantai Tanjung Putus",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
      date: "12 Des 2024"
    },
    {
      id: 3,
      title: "UMKM Kopi Lamsel Meraih Penghargaan Nasional",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300",
      date: "10 Des 2024"
    },
    {
      id: 4,
      title: "Program Digitalisasi Desa Wisata di Kalianda",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300",
      date: "8 Des 2024"
    }
  ];

  // Mock comments
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Sari Wulandari",
      date: "16 Des 2024",
      comment: "Wah seru banget nih festivalnya! Sudah tidak sabar untuk datang dan menikmati budaya Lampung Selatan."
    },
    {
      id: 2,
      name: "Budi Santoso",
      date: "16 Des 2024",
      comment: "Acara seperti ini sangat bagus untuk memperkenalkan potensi wisata daerah. Semoga sukses!"
    }
  ]);

  const handleBack = () => {
    navigate('/informasi');
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link berhasil disalin!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    toast.success(isLiked ? 'Like dibatalkan' : 'Artikel disukai!');
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentName.trim() || !comment.trim()) {
      toast.error('Nama dan komentar harus diisi!');
      return;
    }

    const newComment = {
      id: comments.length + 1,
      name: commentName,
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      comment: comment
    };

    setComments([newComment, ...comments]);
    setComment('');
    setCommentName('');
    setCommentEmail('');
    toast.success('Komentar berhasil ditambahkan!');
  };

  const handleRelatedArticleClick = (id: number) => {
    navigate(`/informasi/detail?id=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="mb-6 hover:bg-gray-100 text-gray-600"
            >
              <ArrowLeft className="mr-2" size={20} />
              Kembali ke Informasi
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="bg-lamsel-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={handleLike}
                  className={`${isLiked ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  <Heart className="mr-2" size={16} fill={isLiked ? "white" : "none"} />
                  {likes} Suka
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Share2 size={16} />
                    Bagikan:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Facebook size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="text-blue-400 hover:bg-blue-50"
                  >
                    <Twitter size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('copy')}
                  >
                    Salin Link
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Image */}
            <div className="mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose max-w-none mb-12">
              <div 
                className="text-gray-800 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            <Separator className="my-12" />

            {/* Comments Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle size={24} />
                Komentar ({comments.length})
              </h3>

              {/* Comment Form */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Tinggalkan Komentar</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitComment} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Nama Anda"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email (opsional)"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Tulis komentar Anda..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      required
                    />
                    <Button type="submit" className="bg-lamsel-blue hover:bg-blue-700">
                      <Send className="mr-2" size={16} />
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
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-lamsel-blue rounded-full flex items-center justify-center text-white font-semibold">
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold text-gray-900">{comment.name}</span>
                            <span className="text-gray-500 text-sm">{comment.date}</span>
                          </div>
                          <p className="text-gray-700">{comment.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator className="my-12" />

            {/* Related Articles */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Berita Berikutnya</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Card 
                    key={relatedArticle.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => handleRelatedArticleClick(relatedArticle.id)}
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={relatedArticle.image} 
                        alt={relatedArticle.title}
                        className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-lamsel-blue transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-gray-500 text-sm">{relatedArticle.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InformasiDetail;
