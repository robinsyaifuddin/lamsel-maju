
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Map, Edit, Trash, MoreHorizontal, Plus, Upload, Search, MapPin } from 'lucide-react';

// Mock data for kecamatan
const kecamatanData = [
  { id: 1, name: 'Kalianda', description: 'Kecamatan Kalianda adalah kecamatan yang berada di Kabupaten Lampung Selatan, Lampung. Kecamatan ini merupakan ibu kota kabupaten ini.', image: 'kalianda.jpg', landmarks: 10, villages: 25, population: 92450, area: 161.4 },
  { id: 2, name: 'Rajabasa', description: 'Kecamatan Rajabasa adalah sebuah kecamatan di Kabupaten Lampung Selatan, Lampung, Indonesia.', image: 'rajabasa.jpg', landmarks: 8, villages: 16, population: 31245, area: 100.8 },
  { id: 3, name: 'Penengahan', description: 'Penengahan adalah sebuah kecamatan di Kabupaten Lampung Selatan, Lampung, Indonesia.', image: 'penengahan.jpg', landmarks: 7, villages: 22, population: 41150, area: 132.2 },
  { id: 4, name: 'Sidomulyo', description: 'Sidomulyo adalah sebuah kecamatan di Kabupaten Lampung Selatan, Lampung, Indonesia.', image: 'sidomulyo.jpg', landmarks: 6, villages: 16, population: 55628, area: 122.5 },
  { id: 5, name: 'Candipuro', description: 'Candipuro adalah sebuah kecamatan di Kabupaten Lampung Selatan, Lampung, Indonesia.', image: 'candipuro.jpg', landmarks: 5, villages: 14, population: 62384, area: 117.3 },
];

const AdminKecamatan = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingKecamatan, setEditingKecamatan] = useState<null | typeof kecamatanData[0]>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [kecamatanToDelete, setKecamatanToDelete] = useState<null | typeof kecamatanData[0]>(null);

  // Filter kecamatan based on search query
  const filteredKecamatan = kecamatanData.filter(kecamatan => 
    kecamatan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    kecamatan.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setIsAddDialogOpen(false);
    toast.success('Kecamatan berhasil ditambahkan!');
  };

  const handleEdit = (kecamatan: typeof kecamatanData[0]) => {
    setEditingKecamatan(kecamatan);
  };

  const handleUpdate = () => {
    setEditingKecamatan(null);
    toast.success('Kecamatan berhasil diperbarui!');
  };

  const handleDelete = (kecamatan: typeof kecamatanData[0]) => {
    setKecamatanToDelete(kecamatan);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteDialogOpen(false);
    setKecamatanToDelete(null);
    toast.success('Kecamatan berhasil dihapus!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Map className="mr-2" size={24} />
          Kelola Kecamatan
        </h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" size={16} />
              Tambah Kecamatan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Kecamatan Baru</DialogTitle>
              <DialogDescription>
                Isi detail kecamatan baru di bawah ini. Pastikan data yang dimasukkan sudah benar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="kecamatan-name">Nama Kecamatan</Label>
                <Input id="kecamatan-name" placeholder="Masukkan nama kecamatan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-villages">Jumlah Desa</Label>
                <Input id="total-villages" type="number" placeholder="Masukkan jumlah desa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Luas Wilayah (km²)</Label>
                <Input id="area" type="number" step="0.1" placeholder="Masukkan luas wilayah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="population">Jumlah Penduduk</Label>
                <Input id="population" type="number" placeholder="Masukkan jumlah penduduk" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Masukkan deskripsi kecamatan"
                  rows={4}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="image">Foto Kecamatan</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-500">Drag & drop file di sini atau klik untuk memilih file</p>
                  <p className="text-xs text-gray-400 mt-1">Mendukung: JPG, PNG, WEBP (Maks. 2MB)</p>
                  <Input id="image" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    Pilih File
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAdd}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Kecamatan</CardTitle>
              <CardDescription>Kelola semua kecamatan di Kabupaten Lampung Selatan</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari kecamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">Tampilan Daftar</TabsTrigger>
              <TabsTrigger value="map">Tampilan Peta</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Kecamatan</TableHead>
                      <TableHead>Desa</TableHead>
                      <TableHead>Luas (km²)</TableHead>
                      <TableHead>Penduduk</TableHead>
                      <TableHead>Landmark</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKecamatan.length > 0 ? (
                      filteredKecamatan.map((kecamatan) => (
                        <TableRow key={kecamatan.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-md bg-gray-100 mr-2 relative overflow-hidden">
                                <MapPin className="absolute inset-1.5 text-gray-400" />
                              </div>
                              {kecamatan.name}
                            </div>
                          </TableCell>
                          <TableCell>{kecamatan.villages}</TableCell>
                          <TableCell>{kecamatan.area}</TableCell>
                          <TableCell>{kecamatan.population.toLocaleString()}</TableCell>
                          <TableCell>{kecamatan.landmarks}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onSelect={() => handleEdit(kecamatan)}>
                                  <Edit className="mr-2" size={14} />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onSelect={() => handleDelete(kecamatan)} 
                                  className="text-red-600"
                                >
                                  <Trash className="mr-2" size={14} />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          Tidak ada kecamatan yang ditemukan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="map">
              <div className="border rounded-md p-4">
                <div className="aspect-[16/9] bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center p-8">
                    <Map size={48} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Peta Kecamatan</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                      Lihat persebaran kecamatan di Kabupaten Lampung Selatan dengan peta interaktif.
                    </p>
                    <Button variant="outline">
                      Muat Peta Interaktif
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingKecamatan} onOpenChange={(open) => !open && setEditingKecamatan(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Kecamatan</DialogTitle>
            <DialogDescription>
              Perbarui informasi untuk kecamatan ini.
            </DialogDescription>
          </DialogHeader>
          {editingKecamatan && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama Kecamatan</Label>
                <Input id="edit-name" defaultValue={editingKecamatan.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-villages">Jumlah Desa</Label>
                <Input id="edit-villages" type="number" defaultValue={editingKecamatan.villages} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-area">Luas Wilayah (km²)</Label>
                <Input id="edit-area" type="number" step="0.1" defaultValue={editingKecamatan.area} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-population">Jumlah Penduduk</Label>
                <Input id="edit-population" type="number" defaultValue={editingKecamatan.population} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Deskripsi</Label>
                <Textarea 
                  id="edit-description" 
                  defaultValue={editingKecamatan.description}
                  rows={4}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-image">Foto Kecamatan</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-sm text-gray-500">Drag & drop file di sini atau klik untuk memilih file</p>
                  <p className="text-xs text-gray-400 mt-1">Mendukung: JPG, PNG, WEBP (Maks. 2MB)</p>
                  <Input id="edit-image" type="file" className="hidden" />
                  <Button variant="outline" size="sm" className="mt-4">
                    Pilih File
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingKecamatan(null)}>
              Batal
            </Button>
            <Button onClick={handleUpdate}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kecamatan <strong>{kecamatanToDelete?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminKecamatan;
