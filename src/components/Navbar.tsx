
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { 
  Menu, 
  Search, 
  User,
  X,
  ChevronDown,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Mock search results
  const searchResults = [
    { id: 1, category: 'Destinasi', name: 'Pantai Tanjung Putus', url: '/destinasi/detail?id=1' },
    { id: 2, category: 'Destinasi', name: 'Air Terjun Way Lalaan', url: '/destinasi/detail?id=2' },
    { id: 3, category: 'UMKM', name: 'Kopi Lamsel', url: '/umkm/detail?id=1' },
    { id: 4, category: 'UMKM', name: 'Batik Lamsel', url: '/umkm/detail?id=2' },
    { id: 5, category: 'Kecamatan', name: 'Kalianda', url: '/kecamatan?id=1' },
    { id: 6, category: 'Agenda', name: 'Festival Krakatau', url: '/agenda?id=1' }
  ];

  // Filter results based on search query
  const filteredResults = searchResults.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSelect = (url: string) => {
    setIsSearchOpen(false);
    navigate(url);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-lg bg-white border-b border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 card-3d">
              <div className="rounded-full bg-lamsel-blue p-2 card-3d-content transition-all duration-300 shadow-md">
                <span className="text-xl font-bold text-white">LM</span>
              </div>
              <span className="text-xl font-bold text-lamsel-dark group-hover:text-lamsel-blue transition-colors duration-300">
                Lamsel Maju
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Using Navigation Menu from shadcn/ui */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Beranda
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/destinasi">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Destinasi Wisata
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/agenda">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Agenda Travel
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/umkm">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    UMKM
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/kecamatan">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Kecamatan
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/kontak">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Kontak
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-blue-50"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="text-lamsel-dark" size={20} />
            </Button>
            
            {/* Admin Login Button */}
            <Link to="/admin/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-lamsel-blue hover:bg-lamsel-blue hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-[2px] button-3d"
              >
                <User className="mr-2" size={16} />
                Admin Login
              </Button>
            </Link>
          </div>
          
          <Button 
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="text-lamsel-dark" size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu - Improved with better animations and layout */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-lg animate-slide-in">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-lamsel-blue p-2">
                  <span className="text-xl font-bold text-white">LM</span>
                </div>
                <span className="text-xl font-bold text-lamsel-dark">
                  Lamsel Maju
                </span>
              </div>
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            
            <div className="p-4 mb-4">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="mr-2" size={16} />
                Cari destinasi, UMKM, agenda...
              </Button>
            </div>
            
            <div className="flex flex-col space-y-1 px-2">
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">Beranda</span>
              </Link>
              
              <Link 
                to="/destinasi" 
                className="flex items-center px-4 py-3 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">Destinasi Wisata</span>
              </Link>
              
              <Link 
                to="/agenda" 
                className="flex items-center px-4 py-3 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">Agenda Travel</span>
              </Link>
              
              <Link 
                to="/umkm" 
                className="flex items-center px-4 py-3 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">UMKM</span>
              </Link>
              
              <Link 
                to="/kecamatan" 
                className="flex items-center px-4 py-3 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">Kecamatan</span>
              </Link>
              
              <Link 
                to="/kontak" 
                className="flex items-center px-4 py-3 rounded-md hover:bg-blue-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-medium">Kontak</span>
              </Link>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
              <Link to="/admin/login">
                <Button className="w-full">
                  <User className="mr-2" size={16} />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <Command>
          <CommandInput 
            placeholder="Cari destinasi, UMKM, agenda..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>Pencarian tidak ditemukan</CommandEmpty>
            <CommandGroup heading="Hasil Pencarian">
              {filteredResults.map((result) => (
                <CommandItem 
                  key={result.id}
                  onSelect={() => handleSearchSelect(result.url)}
                  className="flex items-center"
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
