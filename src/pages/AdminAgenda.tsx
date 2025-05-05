
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Search, 
  Plus, 
  Calendar, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  ImagePlus,
  Clock,
  Users
} from 'lucide-react';
import { toast } from "sonner";

// Dummy data for demonstration
const agendaData = [
  { id: 1, title: 'Festival Krakatau', date: '2025-06-15', time: '08:00', location: 'Pantai Anggariska', participants: 120, image: '/placeholder.svg' },
  { id: 2, title: 'Lampung Selatan Expo', date: '2025-07-10', time: '09:00', location: 'Taman Gisting', participants: 250, image: '/placeholder.svg' },
  { id: 3, title: 'Pesta Budaya Lampung', date: '2025-08-05', time: '16:00', location: 'Menara Siger', participants: 300, image: '/placeholder.svg' },
  { id: 4, title: 'Festival Kuliner Lampung', date: '2025-09-12', time: '10:00', location: 'Alun-alun Kalianda', participants: 180, image: '/placeholder.svg' },
  { id: 5, title: 'Lomba Perahu Nelayan', date: '2025-10-20', time: '07:30', location: 'Pantai Anggariska', participants: 90, image: '/placeholder.svg' },
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
    image: '/placeholder.svg'
  });

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
      image: '/placeholder.svg'
    });
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
        description: 'Deskripsi acara.',
        participants: agenda.participants.toString(),
        image: agenda.image
      });
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`Agenda dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Agenda</h1>
          <p className="text-muted-foreground">Kelola semua agenda event di Lampung Selatan</p>
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Nama Agenda</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Masukkan nama agenda" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
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
                  <Label htmlFor="date">Tanggal</Label>
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
                  <Label htmlFor="time">Waktu</Label>
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
                  <Label htmlFor="participants">Target Peserta</Label>
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
                
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Deskripsi lengkap agenda" 
                    required
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="image">Poster Agenda</Label>
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
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={handleCancel}>
                  Batal
                </Button>
                <Button type="submit" className="shadow-md">
                  {editingId ? 'Perbarui Agenda' : 'Tambah Agenda'}
                </Button>
              </div>
            </form>
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
                      <TableHead className="text-right">Target Peserta</TableHead>
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
                          <TableCell>{agenda.location}</TableCell>
                          <TableCell className="text-right">{agenda.participants}</TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(agenda.id)}>
                                <Edit className="h-4 w-4" />
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
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
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
