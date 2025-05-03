
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Search, 
  User,
  X
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 shadow-md backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-full bg-lamsel-blue p-2">
                <span className="text-xl font-bold text-white">LM</span>
              </div>
              <span className={`text-xl font-bold transition-colors ${
                isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
              }`}>
                Lamsel Maju
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`navbar-item font-medium transition-colors ${
              isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
            }`}>
              Beranda
            </Link>
            <Link to="/destinasi" className={`navbar-item font-medium transition-colors ${
              isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
            }`}>
              Destinasi Wisata
            </Link>
            <Link to="/agenda" className={`navbar-item font-medium transition-colors ${
              isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
            }`}>
              Agenda Travel
            </Link>
            <Link to="/umkm" className={`navbar-item font-medium transition-colors ${
              isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
            }`}>
              UMKM
            </Link>
            <Link to="/kecamatan" className={`navbar-item font-medium transition-colors ${
              isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
            }`}>
              Kecamatan
            </Link>
            <Link to="/kontak" className={`navbar-item font-medium transition-colors ${
              isScrolled ? 'text-lamsel-dark' : 'text-white hero-shadow'
            }`}>
              Kontak
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className={isScrolled ? 'text-lamsel-dark' : 'text-white'} size={20} />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full border-white bg-transparent hover:bg-white/20 hover:text-white">
              <User className="mr-2" size={16} />
              Login
            </Button>
          </div>
          
          <Button 
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className={isScrolled ? 'text-lamsel-dark' : 'text-white'} size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-lamsel-dark bg-opacity-50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-lg animate-slide-in">
            <div className="flex justify-end p-4">
              <Button variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="text-lg font-medium py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                Beranda
              </Link>
              <Link to="/destinasi" className="text-lg font-medium py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                Destinasi Wisata
              </Link>
              <Link to="/agenda" className="text-lg font-medium py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                Agenda Travel
              </Link>
              <Link to="/umkm" className="text-lg font-medium py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                UMKM
              </Link>
              <Link to="/kecamatan" className="text-lg font-medium py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                Kecamatan
              </Link>
              <Link to="/kontak" className="text-lg font-medium py-2 border-b" onClick={() => setMobileMenuOpen(false)}>
                Kontak
              </Link>
              
              <div className="pt-4">
                <Button className="w-full">
                  <User className="mr-2" size={16} />
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
