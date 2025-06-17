
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ArrowLeft, 
  Download, 
  MessageCircle, 
  Copy, 
  CheckCircle,
  CreditCard,
  Smartphone,
  User,
  Mail,
  Phone
} from 'lucide-react';
import jsPDF from 'jspdf';

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
      accountName: "UMKM Lampung Selatan"
    },
    {
      name: "Bank Mandiri", 
      accountNumber: "0987654321",
      accountName: "UMKM Lampung Selatan"
    },
    {
      name: "Bank BRI",
      accountNumber: "5555666677778888",
      accountName: "UMKM Lampung Selatan"
    }
  ]
};

const ProductPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<'qris' | 'bank'>('qris');
  const [selectedBank, setSelectedBank] = useState(0);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Get product data from URL params
  const productData = {
    umkmId: searchParams.get('umkmId') || '',
    productId: searchParams.get('productId') || '',
    productName: searchParams.get('productName') || '',
    productPrice: parseInt(searchParams.get('productPrice') || '0'),
    umkmName: searchParams.get('umkmName') || '',
    umkmPhone: searchParams.get('umkmPhone') || '',
    umkmLocation: searchParams.get('umkmLocation') || '',
    orderId: `PRD${Date.now()}`,
    orderDate: new Date().toLocaleDateString('id-ID')
  };

  const totalAmount = productData.productPrice * quantity;

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
    if (!customerName || !customerEmail || !customerPhone) {
      toast({
        title: "Data tidak lengkap",
        description: "Harap isi semua data pelanggan terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('INVOICE PRODUK UMKM', 20, 20);
    
    // Invoice details
    pdf.setFontSize(12);
    pdf.text(`No. Invoice: ${productData.orderId}`, 20, 40);
    pdf.text(`Tanggal: ${productData.orderDate}`, 20, 50);
    
    // Customer info
    pdf.text('DETAIL PEMBELI:', 20, 70);
    pdf.text(`Nama: ${customerName}`, 20, 80);
    pdf.text(`Email: ${customerEmail}`, 20, 90);
    pdf.text(`Telepon: ${customerPhone}`, 20, 100);
    
    // UMKM info
    pdf.text('DETAIL UMKM:', 20, 120);
    pdf.text(`Nama UMKM: ${productData.umkmName}`, 20, 130);
    pdf.text(`Lokasi: ${productData.umkmLocation}`, 20, 140);
    
    // Product info
    pdf.text('DETAIL PRODUK:', 20, 160);
    pdf.text(`Produk: ${productData.productName}`, 20, 170);
    pdf.text(`Harga per unit: Rp${productData.productPrice.toLocaleString('id-ID')}`, 20, 180);
    pdf.text(`Jumlah: ${quantity}`, 20, 190);
    
    // Pricing
    pdf.text('RINCIAN BIAYA:', 20, 210);
    pdf.text(`Subtotal: Rp${totalAmount.toLocaleString('id-ID')}`, 20, 220);
    pdf.text(`TOTAL: Rp${totalAmount.toLocaleString('id-ID')}`, 20, 230);
    
    // Notes
    if (notes) {
      pdf.text(`Catatan: ${notes}`, 20, 250);
    }
    
    // Footer
    pdf.text('Terima kasih atas kepercayaan Anda!', 20, 270);
    
    pdf.save(`Invoice-${productData.orderId}.pdf`);
    
    toast({
      title: "Invoice berhasil diunduh",
      description: "File PDF telah disimpan ke perangkat Anda",
    });
  };

  const handlePaymentConfirmation = () => {
    if (!customerName || !customerEmail || !customerPhone) {
      toast({
        title: "Data tidak lengkap",
        description: "Harap isi semua data pelanggan terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const message = `*Konfirmasi Pembayaran Produk UMKM*

No. Pesanan: ${productData.orderId}
Nama Pembeli: ${customerName}
Email: ${customerEmail}
Telepon: ${customerPhone}

Detail Pesanan:
- UMKM: ${productData.umkmName}
- Produk: ${productData.productName}
- Jumlah: ${quantity} unit
- Harga per unit: Rp${productData.productPrice.toLocaleString('id-ID')}
- Total Pembayaran: Rp${totalAmount.toLocaleString('id-ID')}

Metode Pembayaran: ${selectedPayment === 'qris' ? 'QRIS' : `Transfer Bank ${paymentMethods.bank[selectedBank].name}`}

${notes ? `Catatan: ${notes}` : ''}

*Saya telah melakukan pembayaran sesuai dengan jumlah di atas. Mohon konfirmasi pembayaran.*`;

    const encodedMessage = encodeURIComponent(message);
    const phone = productData.umkmPhone.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!productData.productName) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Data produk tidak ditemukan</h1>
            <Button 
              className="mt-4 bg-lamsel-green hover:bg-lamsel-green/80"
              onClick={() => navigate('/umkm')}
            >
              Kembali ke UMKM
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
            className="mb-6 border-lamsel-green text-lamsel-green hover:bg-lamsel-green hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form and Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  Detail Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Data Pembeli</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Masukkan nama lengkap"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Masukkan email"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="Masukkan nomor telepon"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Product Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informasi Produk</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>UMKM:</span>
                        <span className="font-medium">{productData.umkmName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Produk:</span>
                        <span className="font-medium">{productData.productName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Harga per unit:</span>
                        <span>Rp{productData.productPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Jumlah:</span>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          min="1"
                          className="w-20 text-center"
                        />
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-lamsel-green">Rp{totalAmount.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-1">Catatan (Opsional)</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tambahkan catatan untuk penjual..."
                    className="min-h-[80px]"
                  />
                </div>

                <Button 
                  onClick={generateInvoicePDF}
                  className="w-full bg-green-600 hover:bg-green-700"
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
                      <p className="text-xl font-bold text-lamsel-green">
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
                               selectedBank === index ? 'border-lamsel-green bg-lamsel-green/5' : 'border-gray-200'
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
                      <p className="text-xl font-bold text-lamsel-green mt-2">
                        Rp{totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Confirmation Button */}
                <Button 
                  onClick={handlePaymentConfirmation}
                  className="w-full bg-lamsel-green hover:bg-lamsel-green/80"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Konfirmasi Pembayaran via WhatsApp
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  Setelah melakukan pembayaran, klik tombol konfirmasi untuk mengirim bukti pembayaran ke produsen UMKM
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

export default ProductPaymentPage;
