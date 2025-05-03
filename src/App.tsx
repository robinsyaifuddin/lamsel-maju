
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
import Kecamatan from "./pages/Kecamatan";
import Kontak from "./pages/Kontak";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinasi" element={<Destinasi />} />
          <Route path="/destinasi/detail" element={<DestinationDetail />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/umkm" element={<UMKM />} />
          <Route path="/kecamatan" element={<Kecamatan />} />
          <Route path="/kontak" element={<Kontak />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
