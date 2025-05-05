
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Destinasi from "./pages/Destinasi";
import DestinationDetail from "./pages/DestinationDetail";
import Agenda from "./pages/Agenda";
import UMKM from "./pages/UMKM";
import UMKMDetail from "./pages/UMKMDetail";
import Kecamatan from "./pages/Kecamatan";
import Kontak from "./pages/Kontak";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDestinasi from "./pages/AdminDestinasi";
import AdminAgenda from "./pages/AdminAgenda";
import AdminUMKM from "./pages/AdminUMKM";
import AdminKontak from "./pages/AdminKontak";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/destinasi" element={<Destinasi />} />
          <Route path="/destinasi/detail" element={<DestinationDetail />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/umkm" element={<UMKM />} />
          <Route path="/umkm/detail" element={<UMKMDetail />} />
          <Route path="/kecamatan" element={<Kecamatan />} />
          <Route path="/kontak" element={<Kontak />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="destinasi" element={<AdminDestinasi />} />
            <Route path="agenda" element={<AdminAgenda />} />
            <Route path="umkm" element={<AdminUMKM />} />
            <Route path="kecamatan" element={<div className="p-4 text-xl">Halaman Kelola Kecamatan</div>} />
            <Route path="kontak" element={<AdminKontak />} />
            <Route path="statistik" element={<div className="p-4 text-xl">Halaman Statistik</div>} />
            <Route path="pengaturan" element={<div className="p-4 text-xl">Halaman Pengaturan</div>} />
          </Route>
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
