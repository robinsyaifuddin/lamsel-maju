
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Phone, User, Mail, CreditCard, Star, CheckCircle, Mountain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Enhanced sample data for events with simplified itinerary
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
    minParticipants: 5,
    originalPrice: 350000,
    price: 250000,
    rating: 4.8,
    duration: "1 hari",
    description: "Festival budaya tahunan untuk memperingati letusan Gunung Krakatau dengan berbagai pertunjukan seni dan budaya tradisional Lampung.",
    highlights: [
      "Pertunjukan tari tradisional Lampung",
      "Kuliner khas daerah",
      "Workshop kerajinan tapis",
      "Pameran sejarah Krakatau"
    ],
    itinerary: [
      "Registrasi peserta dan pembagian merchandise",
      "Pembukaan festival dengan tari tradisional",
      "Makan siang dengan kuliner khas Lampung",
      "Workshop membuat kerajinan tapis",
      "Pasar malam dan jajanan tradisional",
      "Penutupan dengan musik dan kembang api"
    ],
    facilities: [
      "Transportasi AC",
      "Makan siang",
      "Guide berpengalaman",
      "Asuransi perjalanan",
      "Merchandise",
      "Dokumentasi foto"
    ],
    provider: {
      name: "Lampung Travel",
      phone: "62887437525303"
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
    minParticipants: 3,
    originalPrice: 450000,
    price: 350000,
    rating: 4.6,
    duration: "1 hari",
    description: "Nikmati pengalaman mendaki Gunung Rajabasa dengan pemandu berpengalaman dan lihat keindahan Lampung Selatan dari ketinggian.",
    highlights: [
      "Pemandangan sunrise dari puncak",
      "Jalur hiking yang menantang",
      "Flora fauna endemik",
      "Spot foto Instagramable"
    ],
    itinerary: [
      "Persiapan dan sarapan ringan",
      "Perjalanan ke base camp dengan jeep",
      "Mulai pendakian menuju puncak",
      "Istirahat dan snack di pos 1",
      "Sampai puncak, foto dan makan siang",
      "Turun gunung kembali ke base camp"
    ],
    facilities: [
      "Transportasi jeep",
      "Guide pendakian",
      "Peralatan safety",
      "Makan siang & snack",
      "Asuransi",
      "P3K"
    ],
    provider: {
      name: "Explore Lampung",
      phone: "62887437525303"
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
    minParticipants: 4,
    originalPrice: 500000,
    price: 400000,
    rating: 4.9,
    duration: "1 hari",
    description: "Jelajahi keindahan bawah laut di sekitar Pulau Sebesi dengan kegiatan snorkeling yang dipandu oleh instruktur profesional.",
    highlights: [
      "Terumbu karang yang indah",
      "Ikan tropis beragam",
      "Air laut jernih",
      "Pantai pasir putih"
    ],
    itinerary: [
      "Berkumpul di dermaga dan briefing keselamatan",
      "Berangkat ke pulau dengan speedboat",
      "Snorkeling di spot terumbu karang pertama",
      "Makan siang seafood fresh di pulau",
      "Snorkeling di spot kedua dengan ikan beragam",
      "Kembali ke dermaga"
    ],
    facilities: [
      "Speedboat",
      "Peralatan snorkeling",
      "Life jacket",
      "Makan siang",
      "Guide underwater",
      "Dokumentasi underwater"
    ],
    provider: {
      name: "Lampung Bahari Tour",
      phone: "62887437525303"
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
    minParticipants: 8,
    originalPrice: 200000,
    price: 150000,
    rating: 4.5,
    duration: "6 jam",
    description: "Ikuti kegiatan panen kopi dan belajar tentang proses pembuatan kopi Lampung Selatan dari kebun hingga cangkir.",
    highlights: [
      "Panen kopi langsung",
      "Proses roasting tradisional",
      "Coffee tasting session",
      "Oleh-oleh kopi premium"
    ],
    itinerary: [
      "Tour kebun kopi dan pengenalan tanaman",
      "Praktik panen kopi bersama petani",
      "Proses pengolahan dari cherry ke green bean",
      "Roasting dan coffee tasting session"
    ],
    facilities: [
      "Transportasi lokal",
      "Pemandu ahli kopi",
      "Perlengkapan panen",
      "Makan siang",
      "Kopi take home",
      "Sertifikat"
    ],
    provider: {
      name: "Kopi Lamsel Tour",
      phone: "62887437525303"
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
    minParticipants: 6,
    originalPrice: 250000,
    price: 200000,
    rating: 4.7,
    duration: "5 jam",
    description: "Nikmati berbagai kuliner tradisional Lampung dalam tur keliling pusat kuliner di Kalianda dengan pemandu lokal.",
    highlights: [
      "5 kuliner tradisional",
      "Cerita sejarah makanan",
      "Cooking demo",
      "Recipe card take home"
    ],
    itinerary: [
      "Kunjungi warung pempek khas Lampung",
      "Cicipi sate bandeng legendaris",
      "Cooking demo masak tempoyak",
      "Dessert dengan kue tradisional Lampung"
    ],
    facilities: [
      "Food guide",
      "Transportasi antar lokasi",
      "Air mineral",
      "Recipe book",
      "Doggy bag",
      "Welcome drink"
    ],
    provider: {
      name: "Kuliner Lampung Tour",
      phone: "62887437525303"
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
    minParticipants: 5,
    originalPrice: 400000,
    price: 300000,
    rating: 4.8,
    duration: "6 jam",
    description: "Belajar membuat Batik Tapis, kerajinan tradisional Lampung, dengan bimbingan langsung dari pengrajin berpengalaman.",
    highlights: [
      "Hands-on workshop",
      "Motif tradisional",
      "Kain tapis take home",
      "Sertifikat keahlian"
    ],
    itinerary: [
      "Pengenalan sejarah dan budaya tapis Lampung",
      "Membuat desain motif dasar",
      "Istirahat makan siang",
      "Proses pewarnaan kain",
      "Finishing dan penyelesaian karya"
    ],
    facilities: [
      "Bahan workshop lengkap",
      "Master craftsman",
      "Peralatan modern",
      "Makan siang",
      "Karya take home",
      "Dokumentasi proses"
    ],
    provider: {
      name: "Tapis Lampung Workshop",
      phone: "62887437525303"
    }
  }
];

const AgendaJoin = () => {
  const [searchParams] = useSearchParams();
  const eventId = parseInt(searchParams.get('id') || '1');
  const [event, setEvent] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
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

  const handleBookingNow = (e: React.FormEvent) => {
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

    // Create URL params for payment page
    const params = new URLSearchParams({
      eventId: eventId.toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      participants: formData.participants.toString(),
      notes: formData.notes,
    });

    // Navigate to payment page
    navigate(`/payment?${params.toString()}`);
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
    
    // Create WhatsApp URL with unified admin number
    const whatsappUrl = `https://wa.me/62887437525303?text=${encodedMessage}`;
    
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
      
      {/* Tour Details Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image and Basic Info */}
            <Card className="overflow-hidden shadow-lg">
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute left-3 top-3 bg-lamsel-purple hover:bg-lamsel-purple/80">
                  {event.category}
                </Badge>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {event.duration}
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl md:text-3xl font-bold">{event.title}</h1>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{event.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span className="text-sm">Min {event.minParticipants} orang</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 line-through text-lg">
                      Rp{event.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-2xl font-bold text-lamsel-purple">
                      Rp{event.price.toLocaleString('id-ID')}
                    </span>
                    <span className="text-sm text-gray-500">/orang</span>
                  </div>
                  
                  {/* Basic Details */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.spots} spot tersedia</span>
                    </div>
                    <div className="flex items-center">
                      <Mountain className="mr-2 h-5 w-5 text-lamsel-purple" />
                      <span>{event.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Deskripsi & Aktivitas</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{event.description}</p>
              </CardContent>
            </Card>

            {/* Tour Highlights */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Highlight Tour</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Itinerary - Simplified to match highlights style */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Itinerary Lengkap</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {event.itinerary.map((item: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-lamsel-purple flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Fasilitas</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.facilities.map((facility: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{facility}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Booking Form (Sticky on desktop) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="w-full">
                <CardHeader>
                  <h2 className="text-xl font-bold">Booking Tour</h2>
                  <p className="text-gray-600 text-sm">Pilih tanggal dan isi data diri</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBookingNow} className="space-y-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Pilih Tanggal</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP", { locale: id }) : "Pilih tanggal"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

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
                        className="min-h-[80px]"
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
                <CardFooter className="flex flex-col space-y-3">
                  <Button 
                    type="button" 
                    onClick={handleBookingNow}
                    className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80 text-white"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Booking Sekarang
                  </Button>
                  <Button 
                    type="button" 
                    onClick={handleSubmit}
                    variant="outline"
                    className="w-full border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
                  >
                    Hubungi Penyedia Travel
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Lanjutkan ke pembayaran untuk mendapatkan invoice
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AgendaJoin;
