
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Phone, User, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sample data for events (this would ideally come from your database)
const events = [
  {
    id: 1,
    title: "Festival Krakatau",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?q=80&w=2960",
    date: "15 Juni 2023",
    time: "09:00 - 21:00",
    location: "Kalianda, Lampung Selatan",
    category: "Festival",
    spots: 25,
    price: 250000,
    description: "Festival budaya tahunan untuk memperingati letusan Gunung Krakatau dengan berbagai pertunjukan seni dan budaya tradisional Lampung.",
    provider: {
      name: "Lampung Travel",
      phone: "6287437525303"
    }
  },
  {
    id: 2,
    title: "Tour Gunung Rajabasa",
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=3270",
    date: "22 Juni 2023",
    time: "07:00 - 17:00",
    location: "Rajabasa, Lampung Selatan",
    category: "Pendakian",
    spots: 15,
    price: 350000,
    description: "Nikmati pengalaman mendaki Gunung Rajabasa dengan pemandu berpengalaman dan lihat keindahan Lampung Selatan dari ketinggian.",
    provider: {
      name: "Explore Lampung",
      phone: "6287437525303"
    }
  },
  {
    id: 3,
    title: "Snorkeling Pulau Sebesi",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=3270",
    date: "30 Juni 2023",
    time: "08:00 - 16:00",
    location: "Rajabasa, Lampung Selatan",
    category: "Bahari",
    spots: 20,
    price: 400000,
    description: "Jelajahi keindahan bawah laut di sekitar Pulau Sebesi dengan kegiatan snorkeling yang dipandu oleh instruktur profesional.",
    provider: {
      name: "Lampung Bahari Tour",
      phone: "6287437525303"
    }
  },
  {
    id: 4,
    title: "Panen Raya Kopi Lamsel",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?q=80&w=3270",
    date: "5 Juli 2023",
    time: "08:00 - 14:00",
    location: "Jati Agung, Lampung Selatan",
    category: "Agrowisata",
    spots: 30,
    price: 150000,
    description: "Ikuti kegiatan panen kopi dan belajar tentang proses pembuatan kopi Lampung Selatan dari kebun hingga cangkir.",
    provider: {
      name: "Kopi Lamsel Tour",
      phone: "6287437525303"
    }
  },
  {
    id: 5,
    title: "Wisata Kuliner Tradisional",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=3270",
    date: "12 Juli 2023",
    time: "16:00 - 21:00",
    location: "Kalianda, Lampung Selatan",
    category: "Kuliner",
    spots: 25,
    price: 200000,
    description: "Nikmati berbagai kuliner tradisional Lampung dalam tur keliling pusat kuliner di Kalianda dengan pemandu lokal.",
    provider: {
      name: "Kuliner Lampung Tour",
      phone: "6287437525303"
    }
  },
  {
    id: 6,
    title: "Workshop Batik Tapis",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?q=80&w=2880",
    date: "18 Juli 2023",
    time: "09:00 - 15:00",
    location: "Natar, Lampung Selatan",
    category: "Budaya",
    spots: 15,
    price: 300000,
    description: "Belajar membuat Batik Tapis, kerajinan tradisional Lampung, dengan bimbingan langsung dari pengrajin berpengalaman.",
    provider: {
      name: "Tapis Lampung Workshop",
      phone: "6287437525303"
    }
  }
];

const AgendaJoin = () => {
  const [searchParams] = useSearchParams();
  const eventId = parseInt(searchParams.get('id') || '1');
  const [event, setEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participants: 1,
    notes: '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Find the event based on the ID from URL
    const foundEvent = events.find(e => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [eventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleParticipantsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= (event?.spots || 1)) {
      setFormData({
        ...formData,
        participants: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Form tidak lengkap",
        description: "Harap isi semua kolom yang diperlukan",
        variant: "destructive"
      });
      return;
    }

    // Format the WhatsApp message
    const message = `*Bergabung Agenda Travel - ${event?.title}*
    
Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Jumlah Peserta: ${formData.participants}
Tanggal: ${event?.date}
Waktu: ${event?.time}
Lokasi: ${event?.location}
Catatan: ${formData.notes || '-'}

Total Biaya: Rp${(event?.price * formData.participants).toLocaleString('id-ID')}`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${event?.provider.phone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Berhasil mengirim permintaan",
      description: "Anda akan diarahkan ke WhatsApp untuk menghubungi penyedia travel",
    });
  };

  const handleBackToAgenda = () => {
    navigate('/agenda');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Agenda tidak ditemukan</h1>
            <Button 
              className="mt-4 bg-lamsel-purple hover:bg-lamsel-purple/80"
              onClick={handleBackToAgenda}
            >
              Kembali ke Daftar Agenda
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back button and Header */}
      <div className="pt-16 bg-lamsel-purple/10">
        <div className="container mx-auto p-4">
          <Button 
            variant="outline" 
            onClick={handleBackToAgenda}
            className="mb-4 flex items-center border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali ke Daftar Agenda
          </Button>
        </div>
      </div>
      
      {/* Join Form Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div>
            <Card className="overflow-hidden shadow-lg">
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  {event.category}
                </Badge>
              </div>
              <CardHeader>
                <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-lamsel-purple" />
                  <span><span className="font-medium">{event.spots}</span> spot tersedia</span>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
                  <p className="text-gray-700">{event.description}</p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Biaya</h3>
                  <p className="text-xl font-bold text-lamsel-purple">
                    Rp{event.price.toLocaleString('id-ID')}<span className="text-sm font-normal text-gray-500">/orang</span>
                  </p>
                </div>
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Penyelenggara</h3>
                  <p className="font-medium">{event.provider.name}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Registration Form */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Formulir Pendaftaran</h2>
                <p className="text-gray-600">Isi data diri untuk bergabung dengan agenda travel</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nama Lengkap *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <User className="h-4 w-4 text-gray-500" />
                      </span>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap"
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <Mail className="h-4 w-4 text-gray-500" />
                      </span>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Masukkan alamat email"
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Nomor Telepon *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <Phone className="h-4 w-4 text-gray-500" />
                      </span>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukkan nomor telepon"
                        className="rounded-l-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium mb-1">Jumlah Peserta</label>
                    <Input
                      id="participants"
                      name="participants"
                      type="number"
                      min="1"
                      max={event.spots}
                      value={formData.participants}
                      onChange={handleParticipantsChange}
                    />
                    <p className="text-xs text-gray-500 mt-1">Maksimal {event.spots} peserta</p>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium mb-1">Catatan Tambahan</label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Jika ada permintaan khusus atau pertanyaan"
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Subtotal ({formData.participants} peserta)</span>
                      <span className="font-medium">Rp{(event.price * formData.participants).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg mt-2">
                      <span>Total</span>
                      <span className="text-lamsel-purple">Rp{(event.price * formData.participants).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80"
                >
                  Hubungi Penyedia Travel
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AgendaJoin;
