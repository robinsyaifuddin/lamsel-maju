
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Destinasi from "./pages/Destinasi";
import DestinationDetail from "./pages/DestinationDetail";
import Agenda from "./pages/Agenda";
import AgendaJoin from "./pages/AgendaJoin";
import PaymentPage from "./pages/PaymentPage";
import UMKM from "./pages/UMKM";
import UMKMDetail from "./pages/UMKMDetail";
import ProductPaymentPage from "./pages/ProductPaymentPage";
import Kecamatan from "./pages/Kecamatan";
import Kontak from "./pages/Kontak";
import Informasi from "./pages/Informasi";
import InformasiDetail from "./pages/InformasiDetail";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDestinasi from "./pages/AdminDestinasi";
import AdminAgenda from "./pages/AdminAgenda";
import AdminUMKM from "./pages/AdminUMKM";
import AdminKontak from "./pages/AdminKontak";
import AdminKecamatan from "./pages/AdminKecamatan";
import AdminStatistik from "./pages/AdminStatistik";
import AdminPengaturan from "./pages/AdminPengaturan";
import AdminProfil from "./pages/AdminProfil";

const queryClient = new QueryClient();

// Get base path for GitHub Pages
const getBasePath = () => {
  if (process.env.NODE_ENV === 'production') {
    // For GitHub Pages, use the repository name as base path
    return '/lamsel-maju';
  }
  return '';
};

// ScrollToTop component to ensure page starts at the top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasePath()}>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/destinasi" element={<Destinasi />} />
          <Route path="/destinasi/detail" element={<DestinationDetail />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/agenda/join" element={<AgendaJoin />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/umkm" element={<UMKM />} />
          <Route path="/umkm/detail" element={<UMKMDetail />} />
          <Route path="/umkm/product-payment" element={<ProductPaymentPage />} />
          <Route path="/informasi" element={<Informasi />} />
          <Route path="/informasi/detail" element={<InformasiDetail />} />
          <Route path="/kecamatan" element={<Kecamatan />} />
          <Route path="/kontak" element={<Kontak />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="destinasi" element={<AdminDestinasi />} />
            <Route path="agenda" element={<AdminAgenda />} />
            <Route path="umkm" element={<AdminUMKM />} />
            <Route path="kecamatan" element={<AdminKecamatan />} />
            <Route path="kontak" element={<AdminKontak />} />
            <Route path="statistik" element={<AdminStatistik />} />
            <Route path="pengaturan" element={<AdminPengaturan />} />
            <Route path="profil" element={<AdminProfil />} />
          </Route>
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
