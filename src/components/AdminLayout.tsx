
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Button } from "@/components/ui/button";
import { Menu, Bell, User, Search, Settings, LogOut } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  
  // Mock notifications data
  const notificationsData = [
    { id: 1, type: 'info', title: 'Update sistem', message: 'Sistem telah diperbarui ke versi terbaru', time: '10 menit yang lalu', read: false },
    { id: 2, type: 'alert', title: 'Pesan baru', message: 'Ada pesan kontak baru yang perlu ditinjau', time: '30 menit yang lalu', read: false },
    { id: 3, type: 'success', title: 'Destinasi ditambahkan', message: 'Destinasi wisata baru berhasil ditambahkan', time: '2 jam yang lalu', read: false },
    { id: 4, type: 'info', title: 'Pembaruan UMKM', message: 'Data UMKM telah diperbarui oleh admin', time: '1 hari yang lalu', read: true },
    { id: 5, type: 'alert', title: 'Pengingat agenda', message: 'Agenda travel akan dimulai besok', time: '1 hari yang lalu', read: true },
  ];
  
  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const adminType = sessionStorage.getItem('adminType');
    
    if (!isLoggedIn) {
      toast.error('Anda harus login terlebih dahulu!');
      navigate('/admin/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    sessionStorage.removeItem('adminType');
    toast.success('Logout berhasil!');
    navigate('/admin/login');
  };

  const handleReadAllNotifications = () => {
    setNotificationCount(0);
    toast.success('Semua notifikasi telah ditandai sebagai dibaca');
  };

  const handleProfileSettings = () => {
    navigate('/admin/pengaturan');
  };

  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';
  const adminType = sessionStorage.getItem('adminType');
  const isUMKMAdmin = adminType === 'umkm';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} isUMKMAdmin={isUMKMAdmin} />
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white h-20 px-6 flex items-center justify-between shadow-sm border-b">
          <div className="flex items-center">
            {!sidebarOpen && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleSidebar}
                className="mr-4"
              >
                <Menu size={20} />
              </Button>
            )}
            <div className="flex items-center md:w-96">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <Input
                  placeholder="Cari..."
                  className="rounded-full border-gray-200 pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-[10px]">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[380px] p-0" align="end">
                <Tabs defaultValue="all">
                  <div className="flex items-center justify-between p-3 border-b">
                    <h4 className="font-medium">Notifikasi</h4>
                    <TabsList className="bg-transparent p-0">
                      <TabsTrigger value="all" className="text-xs px-2 py-1">Semua</TabsTrigger>
                      <TabsTrigger value="unread" className="text-xs px-2 py-1">Belum Dibaca</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="all" className="m-0">
                    <ScrollArea className="h-[300px]">
                      {notificationsData.map((notification) => (
                        <div key={notification.id} className={`p-3 border-b hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-1.5 rounded-full ${notification.type === 'info' ? 'bg-blue-500' : notification.type === 'alert' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{notification.title}</h5>
                              <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                              <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="unread" className="m-0">
                    <ScrollArea className="h-[300px]">
                      {notificationsData.filter(n => !n.read).map((notification) => (
                        <div key={notification.id} className="p-3 border-b hover:bg-gray-50 transition-colors bg-blue-50">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 mt-1.5 rounded-full ${notification.type === 'info' ? 'bg-blue-500' : notification.type === 'alert' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{notification.title}</h5>
                              <p className="text-xs text-gray-600 mt-0.5">{notification.message}</p>
                              <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                  <div className="p-2 border-t">
                    <Button variant="outline" size="sm" className="w-full text-xs" onClick={handleReadAllNotifications}>
                      Tandai Semua Telah Dibaca
                    </Button>
                  </div>
                </Tabs>
              </PopoverContent>
            </Popover>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-lamsel-blue flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                  <span className="hidden md:inline">{adminUsername}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  Akun Saya
                  {adminType && (
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded ${adminType === 'central' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {adminType === 'central' ? 'Admin Pusat' : 'Admin UMKM'}
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate('/admin/profil')}>
                  <User className="mr-2" size={16} />
                  Profil Saya
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleProfileSettings}>
                  <Settings className="mr-2" size={16} />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="mr-2" size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
