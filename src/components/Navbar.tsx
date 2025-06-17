import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Menu, Search, User, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // Update scrolled state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Reset mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Mock search results
  const searchResults = [{
    id: 1,
    category: 'Destinasi',
    name: 'Pantai Tanjung Putus',
    url: '/destinasi/detail?id=1'
  }, {
    id: 2,
    category: 'Destinasi',
    name: 'Air Terjun Way Lalaan',
    url: '/destinasi/detail?id=2'
  }, {
    id: 3,
    category: 'UMKM',
    name: 'Kopi Lamsel',
    url: '/umkm/detail?id=1'
  }, {
    id: 4,
    category: 'UMKM',
    name: 'Batik Lamsel',
    url: '/umkm/detail?id=2'
  }, {
    id: 5,
    category: 'Kecamatan',
    name: 'Kalianda',
    url: '/kecamatan?id=1'
  }, {
    id: 6,
    category: 'Agenda',
    name: 'Festival Krakatau',
    url: '/agenda?id=1'
  }];

  // Filter results based on search query
  const filteredResults = searchResults.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const handleSearchSelect = (url: string) => {
    setIsSearchOpen(false);
    navigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top when navigating
  };

  // Function to handle navigation and scroll to top
  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "shadow-lg bg-white/98 backdrop-blur-md border-b border-gray-200/50" 
        : "bg-white border-b border-gray-100"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 card-3d" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="rounded-full bg-white p-2 card-3d-content transition-all duration-300 shadow-md border border-gray-200">
                <img 
                  src="/lovable-uploads/a5067f5c-96bf-49cc-a948-8415e3f53e19.png" 
                  alt="Logo Lampung Selatan" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-semibold text-gray-900 hidden sm:inline">Lamsel Maju</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Using Navigation Menu from shadcn/ui */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline text-gray-800 hover:text-lamsel-blue hover:bg-blue-50/80 font-medium transition-all duration-200 ${location.pathname === '/' ? 'text-lamsel-blue bg-blue-50/50' : ''}`}>
                    Beranda
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/destinasi" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline text-gray-800 hover:text-lamsel-blue hover:bg-blue-50/80 font-medium transition-all duration-200 ${location.pathname === '/destinasi' ? 'text-lamsel-blue bg-blue-50/50' : ''}`}>
                    Destinasi Wisata
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/agenda" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline text-gray-800 hover:text-lamsel-blue hover:bg-blue-50/80 font-medium transition-all duration-200 ${location.pathname === '/agenda' ? 'text-lamsel-blue bg-blue-50/50' : ''}`}>
                    Agenda Travel
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/umkm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline text-gray-800 hover:text-lamsel-blue hover:bg-blue-50/80 font-medium transition-all duration-200 ${location.pathname === '/umkm' ? 'text-lamsel-blue bg-blue-50/50' : ''}`}>
                    UMKM
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/kecamatan" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline text-gray-800 hover:text-lamsel-blue hover:bg-blue-50/80 font-medium transition-all duration-200 ${location.pathname === '/kecamatan' ? 'text-lamsel-blue bg-blue-50/50' : ''}`}>
                    Kecamatan
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/kontak" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline text-gray-800 hover:text-lamsel-blue hover:bg-blue-50/80 font-medium transition-all duration-200 ${location.pathname === '/kontak' ? 'text-lamsel-blue bg-blue-50/50' : ''}`}>
                    Kontak
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-200" onClick={() => setIsSearchOpen(true)}>
              <Search className="text-gray-700 hover:text-lamsel-blue transition-colors" size={20} />
            </Button>
            
            {/* Admin Login Button */}
            <Link to="/admin/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button variant="outline" size="sm" className="rounded-full border-gray-300 text-gray-800 hover:bg-lamsel-blue hover:text-white hover:border-lamsel-blue transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[1px] button-3d font-medium">
                <User className="mr-2" size={16} />
                Admin Login
              </Button>
            </Link>
          </div>
          
          <Button variant="ghost" className="md:hidden text-gray-800 hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Reset and Rebuilt */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw] bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/a5067f5c-96bf-49cc-a948-8415e3f53e19.png" 
                  alt="Logo Lampung Selatan" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-semibold text-gray-900">Lamsel Maju</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X size={20} className="text-gray-600" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <Button 
                variant="outline" 
                className="w-full justify-start text-gray-600 border-gray-200"
                onClick={() => {
                  setIsSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
              >
                <Search className="mr-2" size={16} />
                Cari destinasi, UMKM, agenda...
              </Button>
            </div>
            
            {/* Menu Items */}
            <div className="flex flex-col p-2">
              <Link 
                to="/" 
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation('/')}
              >
                Beranda
              </Link>
              
              <Link 
                to="/destinasi" 
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${
                  location.pathname === '/destinasi' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation('/destinasi')}
              >
                Destinasi Wisata
              </Link>
              
              <Link 
                to="/agenda" 
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${
                  location.pathname === '/agenda' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation('/agenda')}
              >
                Agenda Travel
              </Link>
              
              <Link 
                to="/umkm" 
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${
                  location.pathname === '/umkm' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation('/umkm')}
              >
                UMKM
              </Link>
              
              <Link 
                to="/kecamatan" 
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${
                  location.pathname === '/kecamatan' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation('/kecamatan')}
              >
                Kecamatan
              </Link>
              
              <Link 
                to="/kontak" 
                className={`flex items-center px-4 py-3 mx-2 my-1 rounded-lg text-gray-900 font-medium transition-colors ${
                  location.pathname === '/kontak' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleNavigation('/kontak')}
              >
                Kontak
              </Link>
            </div>
            
            {/* Admin Login Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
              <Link to="/admin/login" onClick={() => handleNavigation('/admin/login')}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <User className="mr-2" size={16} />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog - Keep existing */}
      <CommandDialog 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
      >
        <Command className="rounded-lg border border-gray-200 shadow-xl">
          <div className="border-b border-gray-100 bg-gray-50/50">
            <CommandInput 
              placeholder="Cari destinasi, UMKM, agenda..." 
              value={searchQuery} 
              onValueChange={setSearchQuery}
              className="border-none focus:ring-0 text-gray-800 placeholder:text-gray-500 bg-transparent h-12"
              autoFocus
            />
          </div>
          <CommandList className="max-h-80 overflow-y-auto bg-white">
            <CommandEmpty className="py-8 text-center text-gray-500">
              <div className="flex flex-col items-center space-y-2">
                <Search className="w-8 h-8 text-gray-300" />
                <span>Pencarian tidak ditemukan</span>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Hasil Pencarian" className="p-2">
              {filteredResults.map((result, index) => (
                <CommandItem 
                  key={result.id} 
                  onSelect={() => handleSearchSelect(result.url)} 
                  className="flex items-center p-3 m-1 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 stagger-item stagger-delay-1 border border-transparent hover:border-blue-100"
                >
                  <div className="flex flex-col w-full">
                    <span className="font-medium text-gray-900">{result.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit mt-1">{result.category}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
