import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Download, 
  MessageCircle, 
  Copy, 
  CheckCircle,
  CreditCard,
  Smartphone
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Sample payment methods data
const paymentMethods = {
  qris: {
    name: "QRIS",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2340",
    code: "00020101021126580014ID.CO.QRIS.WWW0215ID20232923845270303UMI51440014ID.LINKAJA.WWW0215088812345678910303UMI52044899530336054041000540200000000000062210528ID123456789012345678901234634004A01A"
  },
  bank: [
    {
      name: "Bank BCA",
      accountNumber: "1234567890",
      accountName: "PT Lampung Travel Sejahtera"
    },
    {
      name: "Bank Mandiri", 
      accountNumber: "0987654321",
      accountName: "PT Lampung Travel Sejahtera"
    },
    {
      name: "Bank BRI",
      accountNumber: "5555666677778888",
      accountName: "PT Lampung Travel Sejahtera"
    }
  ]
};

// Sample events data (same as AgendaJoin)
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
  // ... other events would be here
];

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'bank'>('qris');
  const [selectedBank, setSelectedBank] = useState(0);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  
  // Get booking data from URL params
  const eventId = parseInt(searchParams.get('eventId') || '1');
  const bookingData = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
    participants: parseInt(searchParams.get('participants') || '1'),
    notes: searchParams.get('notes') || '',
    bookingId: `TRV${Date.now()}`,
    bookingDate: new Date().toLocaleDateString('id-ID')
  };

  const event = events.find(e => e.id === eventId);
  const totalAmount = event ? event.price * bookingData.participants : 0;

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(text);
      toast({
        title: "Berhasil disalin",
        description: `${type} telah disalin ke clipboard`,
      });
      setTimeout(() => setCopiedAccount(null), 2000);
    } catch (err) {
      toast({
        title: "Gagal menyalin",
        description: "Silakan salin secara manual",
        variant: "destructive"
      });
    }
  };

  const generateInvoicePDF = async () => {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('INVOICE TRAVEL', 20, 20);
    
    // Invoice details
    pdf.setFontSize(12);
    pdf.text(`No. Invoice: ${bookingData.bookingId}`, 20, 40);
    pdf.text(`Tanggal: ${bookingData.bookingDate}`, 20, 50);
    
    // Customer info
    pdf.text('DETAIL PEMESAN:', 20, 70);
    pdf.text(`Nama: ${bookingData.name}`, 20, 80);
    pdf.text(`Email: ${bookingData.email}`, 20, 90);
    pdf.text(`Telepon: ${bookingData.phone}`, 20, 100);
    
    // Event info
    pdf.text('DETAIL PESANAN:', 20, 120);
    pdf.text(`Event: ${event?.title}`, 20, 130);
    pdf.text(`Tanggal: ${event?.date}`, 20, 140);
    pdf.text(`Waktu: ${event?.time}`, 20, 150);
    pdf.text(`Lokasi: ${event?.location}`, 20, 160);
    pdf.text(`Jumlah Peserta: ${bookingData.participants}`, 20, 170);
    
    // Pricing
    pdf.text('RINCIAN BIAYA:', 20, 190);
    pdf.text(`Harga per orang: Rp${event?.price.toLocaleString('id-ID')}`, 20, 200);
    pdf.text(`Jumlah peserta: ${bookingData.participants}`, 20, 210);
    pdf.text(`TOTAL: Rp${totalAmount.toLocaleString('id-ID')}`, 20, 220);
    
    // Notes
    if (bookingData.notes) {
      pdf.text(`Catatan: ${bookingData.notes}`, 20, 240);
    }
    
    // Footer
    pdf.text('Terima kasih atas kepercayaan Anda!', 20, 260);
    pdf.text(`Penyedia: ${event?.provider.name}`, 20, 270);
    
    pdf.save(`Invoice-${bookingData.bookingId}.pdf`);
    
    toast({
      title: "Invoice berhasil diunduh",
      description: "File PDF telah disimpan ke perangkat Anda",
    });
  };

  const handlePaymentConfirmation = () => {
    const message = `*Konfirmasi Pembayaran - ${event?.title}*

No. Booking: ${bookingData.bookingId}
Nama Pemesan: ${bookingData.name}
Email: ${bookingData.email}
Telepon: ${bookingData.phone}

Detail Pesanan:
- Event: ${event?.title}
- Tanggal: ${event?.date}
- Jumlah Peserta: ${bookingData.participants}
- Total Pembayaran: Rp${totalAmount.toLocaleString('id-ID')}

Metode Pembayaran: ${selectedPayment === 'qris' ? 'QRIS' : `Transfer Bank ${paymentMethods.bank[selectedBank].name}`}

*Saya telah melakukan pembayaran sesuai dengan jumlah di atas. Mohon konfirmasi pembayaran.*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${event?.provider.phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Data tidak ditemukan</h1>
            <Button 
              className="mt-4 bg-lamsel-purple hover:bg-lamsel-purple/80"
              onClick={() => navigate('/agenda')}
            >
              Kembali ke Agenda
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Back button */}
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-6 border-lamsel-purple text-lamsel-purple hover:bg-lamsel-purple hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <Badge className="mt-1 bg-lamsel-purple hover:bg-lamsel-purple/80">
                    {event.category}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>No. Booking:</span>
                    <span className="font-medium">{bookingData.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal Booking:</span>
                    <span>{bookingData.bookingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nama Pemesan:</span>
                    <span>{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumlah Peserta:</span>
                    <span>{bookingData.participants} orang</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tanggal Event:</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu:</span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lokasi:</span>
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Harga per orang:</span>
                    <span>Rp{event.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jumlah peserta:</span>
                    <span>{bookingData.participants}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Pembayaran:</span>
                    <span className="text-lamsel-purple">Rp{totalAmount.toLocaleString('id-ID')}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={generateInvoicePDF}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice PDF
                </Button>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Pilih Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment method selector */}
                <div className="flex space-x-4">
                  <Button
                    variant={selectedPayment === 'qris' ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment('qris')}
                    className="flex-1"
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    QRIS
                  </Button>
                  <Button
                    variant={selectedPayment === 'bank' ? 'default' : 'outline'}
                    onClick={() => setSelectedPayment('bank')}
                    className="flex-1"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Transfer Bank
                  </Button>
                </div>

                {/* QRIS Payment */}
                {selectedPayment === 'qris' && (
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold">Scan QR Code untuk Pembayaran</h3>
                    <div className="flex justify-center">
                      <img 
                        src={paymentMethods.qris.image} 
                        alt="QR Code" 
                        className="w-64 h-64 border rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Scan menggunakan aplikasi e-wallet atau mobile banking Anda
                    </p>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-sm font-medium">Total Pembayaran:</p>
                      <p className="text-xl font-bold text-lamsel-purple">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Bank Transfer Payment */}
                {selectedPayment === 'bank' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Pilih Bank untuk Transfer</h3>
                    <div className="space-y-3">
                      {paymentMethods.bank.map((bank, index) => (
                        <div key={index} 
                             className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                               selectedBank === index ? 'border-lamsel-purple bg-lamsel-purple/5' : 'border-gray-200'
                             }`}
                             onClick={() => setSelectedBank(index)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{bank.name}</h4>
                              <p className="text-sm text-gray-600">{bank.accountName}</p>
                              <p className="font-mono text-lg font-bold mt-1">{bank.accountNumber}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(bank.accountNumber, 'Nomor rekening');
                              }}
                            >
                              {copiedAccount === bank.accountNumber ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Penting:</strong> Transfer sesuai dengan jumlah yang tertera dan simpan bukti transfer
                      </p>
                      <p className="text-xl font-bold text-lamsel-purple mt-2">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Confirmation Button */}
                <Button 
                  onClick={handlePaymentConfirmation}
                  className="w-full bg-lamsel-purple hover:bg-lamsel-purple/80"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Konfirmasi Pembayaran via WhatsApp
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Setelah melakukan pembayaran, klik tombol konfirmasi untuk mengirim bukti pembayaran ke penyedia travel
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
