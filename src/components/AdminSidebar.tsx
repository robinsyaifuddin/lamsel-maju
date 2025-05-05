
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Home,
  LogOut,
  Map,
  Menu,
  MessageSquare,
  Package,
  Settings,
  User,
  Calendar,
  Image,
} from 'lucide-react';
import { toast } from "sonner";

interface SidebarLinkProps {
  icon: React.ElementType;
  href: string;
  label: string;
  active?: boolean;
}

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isUMKMAdmin?: boolean;
}

const SidebarLink = ({ icon: Icon, href, label, active }: SidebarLinkProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start my-1 ${
          active 
            ? 'bg-lamsel-blue text-white hover:bg-blue-600 hover:text-white' 
            : 'hover:bg-blue-50 text-slate-600 hover:text-lamsel-blue'
        }`}
      >
        <Icon className="mr-2" size={18} />
        {label}
      </Button>
    </Link>
  );
};

const AdminSidebar = ({ isOpen, toggleSidebar, isUMKMAdmin = false }: AdminSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUsername');
    sessionStorage.removeItem('adminType');
    toast.success('Logout berhasil!');
    navigate('/admin/login');
  };

  const adminUsername = sessionStorage.getItem('adminUsername') || 'Admin';

  return (
    <aside
      className={`bg-white h-screen fixed left-0 top-0 shadow-lg transition-all duration-300 z-40 border-r ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b h-20">
        <div className={`flex items-center space-x-2 ${!isOpen && 'justify-center w-full'}`}>
          <div className="rounded-full bg-lamsel-blue p-2 shadow-md">
            <span className="text-xl font-bold text-white">LM</span>
          </div>
          {isOpen && (
            <span className="text-xl font-bold text-lamsel-dark">Admin</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={!isOpen ? 'hidden' : ''}
        >
          <Menu />
        </Button>
      </div>

      <div className="p-4">
        {isOpen && (
          <div className="mb-6 text-center p-2 bg-gray-50 rounded-lg">
            <User className="mx-auto text-lamsel-blue mb-2" size={32} />
            <p className="text-sm font-medium">{adminUsername}</p>
            <p className="text-xs text-muted-foreground">
              {isUMKMAdmin ? 'Admin UMKM' : 'Administrator'}
            </p>
          </div>
        )}

        <nav className={`space-y-1 ${!isOpen && 'flex flex-col items-center'}`}>
          {!isOpen ? (
            // Icons only when sidebar is collapsed
            <>
              <Button
                variant={location.pathname === '/admin/dashboard' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1"
              >
                <Link to="/admin/dashboard">
                  <Home size={20} />
                </Link>
              </Button>
              <Button
                variant={location.pathname === '/admin/destinasi' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1"
              >
                <Link to="/admin/destinasi">
                  <Map size={20} />
                </Link>
              </Button>
              
              {/* Show/hide menu items based on admin type */}
              {!isUMKMAdmin && (
                <>
                  <Button
                    variant={location.pathname === '/admin/agenda' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1"
                  >
                    <Link to="/admin/agenda">
                      <Calendar size={20} />
                    </Link>
                  </Button>
                </>
              )}
              
              <Button
                variant={location.pathname === '/admin/umkm' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1"
              >
                <Link to="/admin/umkm">
                  <Package size={20} />
                </Link>
              </Button>
              
              {!isUMKMAdmin && (
                <>
                  <Button
                    variant={location.pathname === '/admin/kecamatan' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1"
                  >
                    <Link to="/admin/kecamatan">
                      <Image size={20} />
                    </Link>
                  </Button>
                  <Button
                    variant={location.pathname === '/admin/kontak' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1"
                  >
                    <Link to="/admin/kontak">
                      <MessageSquare size={20} />
                    </Link>
                  </Button>
                  <Button
                    variant={location.pathname === '/admin/statistik' ? 'default' : 'ghost'}
                    size="icon"
                    asChild
                    className="my-1"
                  >
                    <Link to="/admin/statistik">
                      <BarChart3 size={20} />
                    </Link>
                  </Button>
                </>
              )}
              
              <Button
                variant={location.pathname === '/admin/pengaturan' ? 'default' : 'ghost'}
                size="icon"
                asChild
                className="my-1"
              >
                <Link to="/admin/pengaturan">
                  <Settings size={20} />
                </Link>
              </Button>
              
              <div className="mt-auto pt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut size={20} />
                </Button>
              </div>
            </>
          ) : (
            // Full links when sidebar is expanded
            <>
              <SidebarLink
                icon={Home}
                href="/admin/dashboard"
                label="Dashboard"
                active={location.pathname === '/admin/dashboard'}
              />
              <SidebarLink
                icon={Map}
                href="/admin/destinasi"
                label="Destinasi Wisata"
                active={location.pathname === '/admin/destinasi'}
              />
              
              {/* Show/hide menu items based on admin type */}
              {!isUMKMAdmin && (
                <SidebarLink
                  icon={Calendar}
                  href="/admin/agenda"
                  label="Agenda Travel"
                  active={location.pathname === '/admin/agenda'}
                />
              )}
              
              <SidebarLink
                icon={Package}
                href="/admin/umkm"
                label="UMKM"
                active={location.pathname === '/admin/umkm'}
              />
              
              {!isUMKMAdmin && (
                <>
                  <SidebarLink
                    icon={Image}
                    href="/admin/kecamatan"
                    label="Kecamatan"
                    active={location.pathname === '/admin/kecamatan'}
                  />
                  <SidebarLink
                    icon={MessageSquare}
                    href="/admin/kontak"
                    label="Pesan Kontak"
                    active={location.pathname === '/admin/kontak'}
                  />
                  <SidebarLink
                    icon={BarChart3}
                    href="/admin/statistik"
                    label="Statistik"
                    active={location.pathname === '/admin/statistik'}
                  />
                </>
              )}
              
              <SidebarLink
                icon={Settings}
                href="/admin/pengaturan"
                label="Pengaturan"
                active={location.pathname === '/admin/pengaturan'}
              />
              
              <div className="mt-6 pt-6 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2" size={18} />
                  Logout
                </Button>
              </div>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
