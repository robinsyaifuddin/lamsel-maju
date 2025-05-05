
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
  Phone,
  User,
  Tag,
  ImagePlus,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { toast } from "sonner";

// Dummy data for demonstration
const umkmData = [
  { id: 1, name: 'Kerajinan Lamsel', category: 'Kerajinan', owner: 'Haryanto', contact: '08123456789', location: 'Kec. Jati Agung', status: 'Aktif', image: '/placeholder.svg' },
  { id: 2, name: 'Kopi Lampung', category: 'Makanan & Minuman', owner: 'Sutrisno', contact: '08234567890', location: 'Kec. Merbau Mataram', status: 'Aktif', image: '/placeholder.svg' },
  { id: 3, name: 'Batik Lamsel', category: 'Fashion', owner: 'Siti Aminah', contact: '08345678901', location: 'Kec. Natar', status: 'Aktif', image: '/placeholder.svg' },
  { id: 4, name: 'Souvenir LampSel', category: 'Kerajinan', owner: 'Joko Widodo', contact: '08456789012', location: 'Kec. Tanjung Bintang', status: 'Tidak Aktif', image: '/placeholder.svg' },
  { id: 5, name: 'Tapis Lampung', category: 'Fashion', owner: 'Dewi Safitri', contact: '08567890123', location: 'Kec. Jati Agung', status: 'Aktif', image: '/placeholder.svg' },
];

const AdminUMKM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    owner: '',
    contact: '',
    location: '',
    description: '',
    image: '/placeholder.svg',
    status: 'Aktif'
  });

  const filteredData = umkmData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: '',
      owner: '',
      contact: '',
      location: '',
      description: '',
      image: '/placeholder.svg',
      status: 'Aktif'
    });
    setShowForm(true);
  };

  const handleEdit = (id: number) => {
    const umkm = umkmData.find(item => item.id === id);
    if (umkm) {
      setEditingId(id);
      setFormData({
        name: umkm.name,
        category: umkm.category,
        owner: umkm.owner,
        contact: umkm.contact,
        location: umkm.location,
        description: 'Deskripsi produk UMKM.',
        image: umkm.image,
        status: umkm.status
      });
      setShowForm(true);
    }
  };

  const handleDelete = (id: number) => {
    toast.success(`UMKM dengan ID ${id} berhasil dihapus`);
    // In a real application, you would make an API call to delete the item
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      toast.success(`UMKM "${formData.name}" berhasil diperbarui`);
    } else {
      toast.success(`UMKM baru "${formData.name}" berhasil ditambahkan`);
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
          <h1 className="text-2xl font-bold">Kelola UMKM</h1>
          <p className="text-muted-foreground">Kelola semua UMKM di Lampung Selatan</p>
        </div>
        <Button onClick={handleAddNew} className="shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" /> Tambah UMKM
        </Button>
      </div>

      {showForm ? (
        <Card className="border shadow-lg animate-fade-in">
          <CardHeader>
            <CardTitle>{editingId ? 'Edit UMKM' : 'Tambah UMKM Baru'}</CardTitle>
            <CardDescription>
              {editingId 
                ? 'Perbarui informasi UMKM yang sudah ada' 
                : 'Lengkapi informasi untuk menambahkan UMKM baru'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama UMKM</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama UMKM" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <div className="flex items-center space-x-2">
                    <Tag size={16} className="text-gray-400" />
                    <Input 
                      id="category" 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Contoh: Kerajinan, Makanan & Minuman" 
                      required 
                      className="flex-1" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="owner">Nama Pemilik</Label>
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <Input 
                      id="owner" 
                      value={formData.owner} 
                      onChange={(e) => setFormData({...formData, owner: e.target.value})}
                      placeholder="Masukkan nama pemilik" 
                      required 
                      className="flex-1" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Kontak</Label>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <Input 
                      id="contact" 
                      value={formData.contact} 
                      onChange={(e) => setFormData({...formData, contact: e.target.value})}
                      placeholder="Nomor telepon / WhatsApp" 
                      required 
                      className="flex-1" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <Input 
                      id="location" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Contoh: Kec. Jati Agung" 
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
                    placeholder="Deskripsi produk dan UMKM" 
                    required
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
                
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <Label htmlFor="image">Foto Produk</Label>
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
                  {editingId ? 'Perbarui UMKM' : 'Tambah UMKM'}
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
                  placeholder="Cari UMKM..."
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
                  <option value="kerajinan">Kerajinan</option>
                  <option value="makanan">Makanan & Minuman</option>
                  <option value="fashion">Fashion</option>
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
                      <TableHead>Nama UMKM</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Pemilik</TableHead>
                      <TableHead>Kontak</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center w-28">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.length > 0 ? (
                      filteredData.map((umkm) => (
                        <TableRow key={umkm.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="text-center font-medium">{umkm.id}</TableCell>
                          <TableCell>
                            <img 
                              src={umkm.image} 
                              alt={umkm.name} 
                              className="w-10 h-10 rounded-md object-cover border" 
                            />
                          </TableCell>
                          <TableCell className="font-medium">{umkm.name}</TableCell>
                          <TableCell>{umkm.category}</TableCell>
                          <TableCell>{umkm.owner}</TableCell>
                          <TableCell>{umkm.contact}</TableCell>
                          <TableCell>{umkm.location}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              umkm.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {umkm.status === 'Aktif' ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {umkm.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(umkm.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDelete(umkm.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                          Tidak ditemukan data UMKM yang sesuai dengan pencarian
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredData.length} dari {umkmData.length} UMKM
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

export default AdminUMKM;
