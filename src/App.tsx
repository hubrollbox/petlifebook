import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Auth from "./pages/Auth";
import CreateProfile from "./pages/CreateProfile";
import PetProfile from "./pages/PetProfile";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import About from "./pages/About";
import Plans from "./pages/Plans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/criar-perfil" element={<CreateProfile />} />
                <Route path="/perfil/:id" element={<PetProfile />} />
                <Route path="/loja" element={<Shop />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/comunidade" element={<Community />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/planos" element={<Plans />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
