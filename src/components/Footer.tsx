
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lamsel-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="rounded-full bg-lamsel-blue p-2">
                <span className="text-xl font-bold text-white">LM</span>
              </div>
              <span className="text-xl font-bold text-white">
                Lamsel Maju
              </span>
            </Link>
            <p className="mb-6 text-gray-300">
              Platform resmi Pemerintah Lampung Selatan untuk memajukan pariwisata dan mendukung UMKM lokal.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-lamsel-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-lamsel-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-lamsel-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="rounded-full bg-white/10 p-2 hover:bg-lamsel-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Navigasi</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/destinasi" className="text-gray-300 hover:text-white transition-colors">
                  Destinasi Wisata
                </Link>
              </li>
              <li>
                <Link to="/agenda" className="text-gray-300 hover:text-white transition-colors">
                  Agenda Travel
                </Link>
              </li>
              <li>
                <Link to="/umkm" className="text-gray-300 hover:text-white transition-colors">
                  UMKM
                </Link>
              </li>
              <li>
                <Link to="/kecamatan" className="text-gray-300 hover:text-white transition-colors">
                  Kecamatan
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="text-gray-300 hover:text-white transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-lamsel-blue" />
                <span className="text-gray-300">Jl. Raya Lampung Selatan No. 123, Kalianda, Lampung Selatan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-lamsel-blue" />
                <span className="text-gray-300">(0000) 000-0000</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-lamsel-blue" />
                <span className="text-gray-300">info@lamselmaju.go.id</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Dapatkan informasi terbaru tentang pariwisata dan acara di Lampung Selatan.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400" 
              />
              <Button className="bg-lamsel-blue hover:bg-lamsel-blue/80">
                Kirim
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-400">
          <p>© {currentYear} Lamsel Maju. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
