
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
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  ImagePlus, 
  CheckCircle, 
  XCircle
} from 'lucide-react';
import { toast } from "sonner";

// Dummy data for demonstration
const destinasiData = [
  { id: 1, name: 'Pantai Anggariska', category: 'Wisata Alam', location: 'Kec. Bakauheni', status: 'Aktif', visitors: 1250, image: '/placeholder.svg' },
  { id: 2, name: 'Air Terjun Way Kalam', category: 'Wisata Alam', location: 'Kec. Penengahan', status: 'Aktif', visitors: 870, image: '/placeholder.svg' },
  { id: 3, name: 'Menara Siger', category: 'Landmark', location: 'Kec. Bakauheni', status: 'Aktif', visitors: 2435, image: '/placeholder.svg' },
  { id: 4, name: 'Pulau Mengkudu', category: 'Wisata Alam', location: 'Kec. Rajabasa', status: 'Tidak Aktif', visitors: 0, image: '/placeholder.svg' },
  { id: 5, name: 'Museum Ketransmigrasian', category: 'Wisata Edukasi', location: 'Kec. Candipuro', status: 'Aktif', visitors: 534, image: '/placeholder.svg' },
];

const AdminDestinasi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    image: '/placeholder.svg',
    status: 'Aktif'
  });

  const filteredData = destinasiData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: '',
      location: '',
      description: '',
      image: '/placeholder.svg',
      status: 'Aktif'
    });
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const destinasi = destinasiData.find(item => item.id === id);
    if (destinasi) {
      setEditingId(id);
      setFormData({
        name: destinasi.name,
        category: destinasi.category,
        location: destinasi.location,
        description: 'Deskripsi destinasi wisata',
        image: destinasi.image,
        status: destinasi.status
      });
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`Destinasi dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      toast.success(`Destinasi "${formData.name}" berhasil diperbarui`);
    } else {
      toast.success(`Destinasi baru "${formData.name}" berhasil ditambahkan`);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kelola Destinasi Wisata</h1>
          <p className="text-muted-foreground">Kelola semua destinasi wisata di Lampung Selatan</p>
        </div>
        <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Tambah Destinasi
        </Button>
      </div>

      {showForm ? (
        <Card className="border shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit Destinasi' : 'Tambah Destinasi Baru'}</CardTitle>
            <CardDescription>
              {editingId 
                ? 'Perbarui informasi destinasi wisata yang sudah ada' 
                : 'Lengkapi informasi untuk menambahkan destinasi wisata baru'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Destinasi</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama destinasi" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input 
                    id="category" 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="Contoh: Wisata Alam, Wisata Budaya" 
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
                      placeholder="Contoh: Kec. Bakauheni" 
                      required 
                      className="flex-1" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select 
                    id="status" 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <textarea 
                    id="description" 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Deskripsi lengkap destinasi wisata" 
                    required
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="image">Foto Destinasi</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm font-medium">Klik untuk upload foto</p>
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
                  {editingId ? 'Perbarui Destinasi' : 'Tambah Destinasi'}
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
                  placeholder="Cari destinasi..."
                  className="pl-8 w-full md:w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-lg h-9">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <select 
                  className="h-9 rounded-lg border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">Semua Kategori</option>
                  <option value="alam">Wisata Alam</option>
                  <option value="budaya">Wisata Budaya</option>
                  <option value="edukasi">Wisata Edukasi</option>
                  <option value="landmark">Landmark</option>
                </select>
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
                      <TableHead className="w-16">Foto</TableHead>
                      <TableHead>Nama Destinasi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Pengunjung</TableHead>
                      <TableHead className="text-center w-28">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((destinasi) => (
                        <TableRow key={destinasi.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="text-center font-medium">{destinasi.id}</TableCell>
                          <TableCell>
                            <img 
                              src={destinasi.image} 
                              alt={destinasi.name} 
                              className="w-10 h-10 rounded-md object-cover border" 
                            />
                          </TableCell>
                          <TableCell className="font-medium">{destinasi.name}</TableCell>
                          <TableCell>{destinasi.category}</TableCell>
                          <TableCell>{destinasi.location}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              destinasi.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {destinasi.status === 'Aktif' ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {destinasi.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">{destinasi.visitors.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(destinasi.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(destinasi.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                          Tidak ditemukan data destinasi yang sesuai dengan pencarian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredData.length} dari {destinasiData.length} destinasi
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

export default AdminDestinasi;
