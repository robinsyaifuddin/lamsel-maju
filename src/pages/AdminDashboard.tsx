
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Package, MapPin, Calendar, Users, TrendingUp, Eye, ArrowUpRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

// Mock data
const statsCards = [
  { title: 'Total Destinasi', value: '24', icon: MapPin, change: '+12%', color: 'bg-blue-500' },
  { title: 'Total UMKM', value: '48', icon: Package, change: '+18%', color: 'bg-green-500' },
  { title: 'Agenda', value: '12', icon: Calendar, change: '+5%', color: 'bg-orange-500' },
  { title: 'Pengunjung', value: '1.2K', icon: Users, change: '+24%', color: 'bg-purple-500' },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-sm text-muted-foreground">
          Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className="flex items-center mt-1 text-sm text-green-600">
                    <TrendingUp className="mr-1" size={14} />
                    {stat.change} bulan ini
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="text-white" size={22} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas terbaru di website Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { user: 'Admin', action: 'menambahkan destinasi baru', time: '2 jam yang lalu', icon: MapPin },
                { user: 'Admin', action: 'memperbarui agenda travel', time: '4 jam yang lalu', icon: Calendar },
                { user: 'Admin', action: 'menambahkan UMKM baru', time: '1 hari yang lalu', icon: Package },
                { user: 'Admin', action: 'memperbarui informasi kecamatan', time: '2 hari yang lalu', icon: MapPin },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <activity.icon size={18} className="text-lamsel-blue" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Gambaran Situs</CardTitle>
            <CardDescription>Statistik pengunjung situs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={18} />
                    <span className="text-sm font-medium">Halaman Populer</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Kunjungan</span>
                </div>
                <div className="space-y-3">
                  {[
                    { page: 'Destinasi Wisata', visits: 452, percentage: 35 },
                    { page: 'UMKM', visits: 321, percentage: 25 },
                    { page: 'Beranda', visits: 286, percentage: 22 },
                    { page: 'Agenda Travel', visits: 159, percentage: 12 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.page}</span>
                        <span className="font-medium">{item.visits}</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Tindakan Cepat</CardTitle>
          <CardDescription>Akses cepat ke berbagai bagian admin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Tambah Destinasi', description: 'Tambah destinasi wisata baru', icon: MapPin, link: '/admin/destinasi' },
              { title: 'Tambah UMKM', description: 'Tambah UMKM baru', icon: Package, link: '/admin/umkm' },
              { title: 'Analisis Pengunjung', description: 'Lihat statistik pengunjung', icon: BarChart3, link: '/admin/statistik' },
            ].map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-blue-50">
                      <action.icon className="text-lamsel-blue" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ArrowUpRight className="ml-auto text-muted-foreground" size={16} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
