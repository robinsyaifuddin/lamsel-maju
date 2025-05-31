
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
        ? "shadow-lg bg-white/95 backdrop-blur-sm" 
        : "bg-white border-b border-gray-100"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 card-3d" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="rounded-full bg-lamsel-blue p-2 card-3d-content transition-all duration-300 shadow-md">
                <span className="text-xl font-bold text-white">LM</span>
              </div>
              <span className="text-xl font-semibold text-lamsel-dark hidden sm:inline">Lamsel Maju</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Using Navigation Menu from shadcn/ui */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline ${location.pathname === '/' ? 'text-lamsel-blue' : ''}`}>
                    Beranda
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/destinasi" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline ${location.pathname === '/destinasi' ? 'text-lamsel-blue' : ''}`}>
                    Destinasi Wisata
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/agenda" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline ${location.pathname === '/agenda' ? 'text-lamsel-blue' : ''}`}>
                    Agenda Travel
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/umkm" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline ${location.pathname === '/umkm' ? 'text-lamsel-blue' : ''}`}>
                    UMKM
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/kecamatan" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline ${location.pathname === '/kecamatan' ? 'text-lamsel-blue' : ''}`}>
                    Kecamatan
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/kontak" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} link-underline ${location.pathname === '/kontak' ? 'text-lamsel-blue' : ''}`}>
                    Kontak
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-50" onClick={() => setIsSearchOpen(true)}>
              <Search className="text-lamsel-dark" size={20} />
            </Button>
            
            {/* Admin Login Button */}
            <Link to="/admin/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Button variant="outline" size="sm" className="rounded-full border-lamsel-blue hover:bg-lamsel-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[2px] button-3d">
                <User className="mr-2" size={16} />
                Admin Login
              </Button>
            </Link>
          </div>
          
          <Button variant="ghost" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="text-lamsel-dark" size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Enhanced with better contrast and colors for Android */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div 
            className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-lg animate-slide-in-right"
            style={{ animationDuration: '0.3s' }}
          >
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-lamsel-blue to-lamsel-purple">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-white p-2 shadow-md">
                  <span className="text-xl font-bold text-lamsel-blue">LM</span>
                </div>
                <span className="text-xl font-bold text-white">
                  Lamsel Maju
                </span>
              </div>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)} className="text-white hover:bg-white/20">
                <X size={24} />
              </Button>
            </div>
            
            <div className="p-4 mb-4 bg-gray-50">
              <Button variant="outline" className="w-full justify-start border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white" onClick={() => setIsSearchOpen(true)}>
                <Search className="mr-2" size={16} />
                Cari destinasi, UMKM, agenda...
              </Button>
            </div>
            
            <div className="flex flex-col space-y-1 px-2 animated-section">
              <Link 
                to="/" 
                className={`flex items-center px-4 py-4 mx-2 rounded-lg font-medium text-base transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-lamsel-blue to-lamsel-purple text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-lamsel-blue hover:to-lamsel-purple hover:text-white hover:shadow-md'
                }`} 
                onClick={() => handleNavigation('/')}
              >
                <span>Beranda</span>
              </Link>
              
              <Link 
                to="/destinasi" 
                className={`flex items-center px-4 py-4 mx-2 rounded-lg font-medium text-base transition-all duration-300 ${
                  location.pathname === '/destinasi' 
                    ? 'bg-gradient-to-r from-lamsel-blue to-lamsel-purple text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-lamsel-blue hover:to-lamsel-purple hover:text-white hover:shadow-md'
                }`}
                onClick={() => handleNavigation('/destinasi')}
              >
                <span>Destinasi Wisata</span>
              </Link>
              
              <Link 
                to="/agenda" 
                className={`flex items-center px-4 py-4 mx-2 rounded-lg font-medium text-base transition-all duration-300 ${
                  location.pathname === '/agenda' 
                    ? 'bg-gradient-to-r from-lamsel-blue to-lamsel-purple text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-lamsel-blue hover:to-lamsel-purple hover:text-white hover:shadow-md'
                }`}
                onClick={() => handleNavigation('/agenda')}
              >
                <span>Agenda Travel</span>
              </Link>
              
              <Link 
                to="/umkm" 
                className={`flex items-center px-4 py-4 mx-2 rounded-lg font-medium text-base transition-all duration-300 ${
                  location.pathname === '/umkm' 
                    ? 'bg-gradient-to-r from-lamsel-blue to-lamsel-purple text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-lamsel-blue hover:to-lamsel-purple hover:text-white hover:shadow-md'
                }`}
                onClick={() => handleNavigation('/umkm')}
              >
                <span>UMKM</span>
              </Link>
              
              <Link 
                to="/kecamatan" 
                className={`flex items-center px-4 py-4 mx-2 rounded-lg font-medium text-base transition-all duration-300 ${
                  location.pathname === '/kecamatan' 
                    ? 'bg-gradient-to-r from-lamsel-blue to-lamsel-purple text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-lamsel-blue hover:to-lamsel-purple hover:text-white hover:shadow-md'
                }`}
                onClick={() => handleNavigation('/kecamatan')}
              >
                <span>Kecamatan</span>
              </Link>
              
              <Link 
                to="/kontak" 
                className={`flex items-center px-4 py-4 mx-2 rounded-lg font-medium text-base transition-all duration-300 ${
                  location.pathname === '/kontak' 
                    ? 'bg-gradient-to-r from-lamsel-blue to-lamsel-purple text-white shadow-md' 
                    : 'text-gray-800 hover:bg-gradient-to-r hover:from-lamsel-blue hover:to-lamsel-purple hover:text-white hover:shadow-md'
                }`}
                onClick={() => handleNavigation('/kontak')}
              >
                <span>Kontak</span>
              </Link>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
              <Link to="/admin/login" onClick={() => handleNavigation('/admin/login')}>
                <Button className="w-full button-3d bg-gradient-to-r from-lamsel-blue to-lamsel-purple hover:from-lamsel-purple hover:to-lamsel-blue text-white font-medium shadow-md">
                  <User className="mr-2" size={16} />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog - Fixed by removing invalid className prop */}
      <CommandDialog 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen}
      >
        <Command>
          <CommandInput 
            placeholder="Cari destinasi, UMKM, agenda..." 
            value={searchQuery} 
            onValueChange={setSearchQuery}
            className="border-none focus:ring-0"
            autoFocus
          />
          <CommandList>
            <CommandEmpty>Pencarian tidak ditemukan</CommandEmpty>
            <CommandGroup heading="Hasil Pencarian">
              {filteredResults.map((result, index) => (
                <CommandItem 
                  key={result.id} 
                  onSelect={() => handleSearchSelect(result.url)} 
                  className="flex items-center stagger-item stagger-delay-1"
                >
                  <div className="flex flex-col">
                    <span>{result.name}</span>
                    <span className="text-xs text-muted-foreground">{result.category}</span>
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
