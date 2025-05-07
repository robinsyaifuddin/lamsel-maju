
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Search, 
  Plus, 
  Calendar, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  ImagePlus,
  Clock,
  Users,
  Info,
  DollarSign,
  Building,
  Phone,
  AlertCircle,
  WhatsApp
} from 'lucide-react';
import { toast } from "sonner";

// Dummy data for demonstration
const agendaData = [
  { 
    id: 1, 
    title: 'Festival Krakatau', 
    date: '2025-06-15', 
    time: '08:00', 
    location: 'Pantai Anggariska', 
    participants: 120, 
    image: '/placeholder.svg',
    description: 'Festival tahunan memperingati letusan Gunung Krakatau dengan berbagai pertunjukan seni dan budaya.',
    organizer: 'Dinas Pariwisata Lampung Selatan',
    cost: '75000',
    included: ['Transportasi', 'Makan siang', 'Tiket masuk'],
    contactWhatsApp: '6285712345678'
  },
  { 
    id: 2, 
    title: 'Lampung Selatan Expo', 
    date: '2025-07-10', 
    time: '09:00', 
    location: 'Taman Gisting', 
    participants: 250, 
    image: '/placeholder.svg',
    description: 'Pameran produk lokal dan pertunjukan seni budaya khas Lampung Selatan.',
    organizer: 'Pemda Lampung Selatan',
    cost: '50000',
    included: ['Welcome drink', 'Souvenir', 'Parkir gratis'],
    contactWhatsApp: '6285798765432'
  },
  { 
    id: 3, 
    title: 'Pesta Budaya Lampung', 
    date: '2025-08-05', 
    time: '16:00', 
    location: 'Menara Siger', 
    participants: 300, 
    image: '/placeholder.svg',
    description: 'Acara tahunan menampilkan keragaman budaya dan tradisi masyarakat Lampung.',
    organizer: 'Komunitas Budaya Lampung',
    cost: '100000',
    included: ['Transportasi', 'Makan malam', 'Pertunjukan'],
    contactWhatsApp: '6281234567890'
  },
  { 
    id: 4, 
    title: 'Festival Kuliner Lampung', 
    date: '2025-09-12', 
    time: '10:00', 
    location: 'Alun-alun Kalianda', 
    participants: 180, 
    image: '/placeholder.svg',
    description: 'Festival makanan khas Lampung dengan berbagai kuliner tradisional dan modern.',
    organizer: 'Asosiasi Kuliner Lampung',
    cost: '120000',
    included: ['Kupon makanan', 'Workshop memasak', 'Goodie bag'],
    contactWhatsApp: '6282187654321'
  },
  { 
    id: 5, 
    title: 'Lomba Perahu Nelayan', 
    date: '2025-10-20', 
    time: '07:30', 
    location: 'Pantai Anggariska', 
    participants: 90, 
    image: '/placeholder.svg',
    description: 'Kompetisi perahu tradisional yang diikuti oleh nelayan dari berbagai daerah di Lampung Selatan.',
    organizer: 'Asosiasi Nelayan Lampung Selatan',
    cost: '25000',
    included: ['Akses area penonton', 'Snack'],
    contactWhatsApp: '6289876543210'
  },
];

const AdminAgenda = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    participants: '',
    image: '/placeholder.svg',
    organizer: '',
    cost: '',
    included: [''],
    contactWhatsApp: ''
  });
  const [activeTab, setActiveTab] = useState('general');
  const [newIncludedItem, setNewIncludedItem] = useState('');

  const filteredData = agendaData.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      participants: '',
      image: '/placeholder.svg',
      organizer: '',
      cost: '',
      included: [''],
      contactWhatsApp: ''
    });
    setActiveTab('general');
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const agenda = agendaData.find(item => item.id === id);
    if (agenda) {
      setEditingId(id);
      setFormData({
        title: agenda.title,
        date: agenda.date,
        time: agenda.time,
        location: agenda.location,
        description: agenda.description,
        participants: agenda.participants.toString(),
        image: agenda.image,
        organizer: agenda.organizer,
        cost: agenda.cost,
        included: agenda.included,
        contactWhatsApp: agenda.contactWhatsApp
      });
      setActiveTab('general');
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`Agenda dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.title || !formData.date || !formData.location || !formData.description) {
      toast.error("Harap isi semua field yang diperlukan");
      return;
    }

    // Validate WhatsApp number format
    const whatsappRegex = /^628\d{8,11}$/;
    if (formData.contactWhatsApp && !whatsappRegex.test(formData.contactWhatsApp)) {
      toast.error("Format nomor WhatsApp tidak valid. Gunakan format 628xxxxxxxxxx");
      return;
    }

    if (editingId) {
      toast.success(`Agenda "${formData.title}" berhasil diperbarui`);
    } else {
      toast.success(`Agenda baru "${formData.title}" berhasil ditambahkan`);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };
  
  // Format the date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount);
  };

  const handleAddIncludedItem = () => {
    if (newIncludedItem.trim()) {
      setFormData({
        ...formData,
        included: [...formData.included, newIncludedItem.trim()]
      });
      setNewIncludedItem('');
    }
  };

  const handleRemoveIncludedItem = (index: number) => {
    const updatedIncluded = [...formData.included];
    updatedIncluded.splice(index, 1);
    setFormData({
      ...formData,
      included: updatedIncluded
    });
  };

  const handleOpenWhatsApp = (phoneNumber: string) => {
    // Open WhatsApp with the specified phone number
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Agenda Travel</h1>
          <p className="text-muted-foreground">Kelola semua agenda event dan program travel di Lampung Selatan</p>
        </div>
        <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Tambah Agenda
        </Button>
      </div>

      {showForm ? (
        <Card className="border shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Agenda' : 'Tambah Agenda Baru'}</CardTitle>
            <CardDescription>
              {editingId 
                ? 'Perbarui informasi agenda event yang sudah ada' 
                : 'Lengkapi informasi untuk menambahkan agenda event baru'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="general" className="flex items-center gap-2">
                  <Info size={16} />
                  Umum
                </TabsTrigger>
                <TabsTrigger value="description" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Deskripsi
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center gap-2">
                  <DollarSign size={16} />
                  Biaya
                </TabsTrigger>
                <TabsTrigger value="organizer" className="flex items-center gap-2">
                  <Building size={16} />
                  Penyelenggara
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-6">
                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="font-medium">Nama Agenda</Label>
                      <Input 
                        id="title" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Masukkan nama agenda" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="font-medium">Lokasi</Label>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-400" />
                        <Input 
                          id="location" 
                          value={formData.location} 
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          placeholder="Tempat pelaksanaan" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date" className="font-medium">Tanggal</Label>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <Input 
                          id="date" 
                          type="date"
                          value={formData.date} 
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time" className="font-medium">Waktu</Label>
                      <div className="flex items-center space-x-2">
                        <Clock size={16} className="text-gray-400" />
                        <Input 
                          id="time" 
                          type="time"
                          value={formData.time} 
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="participants" className="font-medium">Target Peserta</Label>
                      <div className="flex items-center space-x-2">
                        <Users size={16} className="text-gray-400" />
                        <Input 
                          id="participants" 
                          type="number"
                          value={formData.participants} 
                          onChange={(e) => setFormData({...formData, participants: e.target.value})}
                          placeholder="Jumlah peserta" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image" className="font-medium">Poster Agenda</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm font-medium">Klik untuk upload poster</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG (maks. 2MB)</p>
                        </div>
                        <input id="image" type="file" className="hidden" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="description" className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="description" className="font-medium">Deskripsi Agenda</Label>
                    <Textarea 
                      id="description" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Deskripsi lengkap agenda" 
                      required
                      className="min-h-[200px]"
                    />
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={18} className="text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-700">Tips Menulis Deskripsi yang Baik</p>
                          <ul className="text-sm text-blue-600 mt-1 list-disc pl-5 space-y-1">
                            <li>Jelaskan secara detail tentang kegiatan yang akan dilakukan</li>
                            <li>Sebutkan keunggulan atau keunikan dari agenda travel ini</li>
                            <li>Berikan informasi tentang durasi dan hal yang perlu dipersiapkan peserta</li>
                            <li>Gunakan bahasa yang mudah dipahami dan menarik</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cost" className="font-medium">Biaya Partisipasi</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <DollarSign size={16} className="text-gray-400" />
                        <Input 
                          id="cost" 
                          type="number"
                          value={formData.cost} 
                          onChange={(e) => setFormData({...formData, cost: e.target.value})}
                          placeholder="Masukkan biaya dalam Rupiah" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.cost ? `Ditampilkan sebagai: ${formatCurrency(formData.cost)}` : ''}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-medium">Fasilitas Yang Termasuk</Label>
                      
                      <div className="space-y-2">
                        {formData.included.map((item, index) => (
                          item && (
                            <div key={index} className="flex items-center gap-2">
                              <Checkbox id={`included-${index}`} checked />
                              <Input 
                                value={item}
                                onChange={(e) => {
                                  const updated = [...formData.included];
                                  updated[index] = e.target.value;
                                  setFormData({...formData, included: updated});
                                }}
                                className="flex-1"
                              />
                              <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveIncludedItem(index)}
                                className="h-8 w-8 text-red-500"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          )
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          placeholder="Tambah fasilitas baru" 
                          value={newIncludedItem}
                          onChange={(e) => setNewIncludedItem(e.target.value)}
                        />
                        <Button 
                          type="button"
                          onClick={handleAddIncludedItem}
                          variant="outline"
                        >
                          Tambah
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="organizer" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizer" className="font-medium">Nama Penyelenggara</Label>
                      <div className="flex items-center space-x-2">
                        <Building size={16} className="text-gray-400" />
                        <Input 
                          id="organizer" 
                          value={formData.organizer} 
                          onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                          placeholder="Nama penyelenggara atau provider travel" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactWhatsApp" className="font-medium">Nomor WhatsApp</Label>
                      <div className="flex items-center space-x-2">
                        <WhatsApp size={16} className="text-green-500" />
                        <Input 
                          id="contactWhatsApp" 
                          value={formData.contactWhatsApp} 
                          onChange={(e) => setFormData({...formData, contactWhatsApp: e.target.value})}
                          placeholder="Format: 628xxxxxxxxxx" 
                          required 
                          className="flex-1" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Contoh: 6281234567890 (tanpa tanda + atau spasi)
                      </p>
                    </div>

                    <div className="md:col-span-2 p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-start gap-3">
                        <WhatsApp size={20} className="text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-700">Integrasi WhatsApp</p>
                          <p className="text-sm text-green-600 mt-1">
                            Nomor WhatsApp ini akan digunakan sebagai kontak untuk tombol "Hubungi Penyedia" pada 
                            halaman detail agenda. Pengunjung akan diarahkan ke chat WhatsApp dengan penyelenggara secara langsung.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" type="button" onClick={handleCancel}>
                    Batal
                  </Button>
                  <Button type="submit" className="shadow-md">
                    {editingId ? 'Perbarui Agenda' : 'Tambah Agenda'}
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari agenda..."
                  className="pl-8 w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg h-9">
                  <Calendar className="mr-2 h-4 w-4" /> Filter Tanggal
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12 text-center">ID</TableHead>
                      <TableHead className="w-16">Poster</TableHead>
                      <TableHead>Nama Agenda</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Waktu</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Penyelenggara</TableHead>
                      <TableHead>Biaya</TableHead>
                      <TableHead className="text-center w-28">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((agenda) => (
                        <TableRow key={agenda.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="text-center font-medium">{agenda.id}</TableCell>
                          <TableCell>
                            <img 
                              src={agenda.image} 
                              alt={agenda.title} 
                              className="w-10 h-10 rounded-md object-cover border" 
                            />
                          </TableCell>
                          <TableCell className="font-medium">{agenda.title}</TableCell>
                          <TableCell>{formatDate(agenda.date)}</TableCell>
                          <TableCell>{agenda.time}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{agenda.location}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{agenda.organizer}</TableCell>
                          <TableCell>
                            {formatCurrency(agenda.cost)}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(agenda.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-green-500"
                                onClick={() => handleOpenWhatsApp(agenda.contactWhatsApp)}
                              >
                                <WhatsApp className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(agenda.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                          Tidak ditemukan data agenda yang sesuai dengan pencarian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredData.length} dari {agendaData.length} agenda
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  Selanjutnya
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminAgenda;
