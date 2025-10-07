import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfessionalRoute from "./components/ProfessionalRoute";
import { Loader2 } from "lucide-react";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Demo = lazy(() => import("./pages/Demo"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ProfessionalDashboard = lazy(() => import("./pages/ProfessionalDashboard"));
const DashboardRedirect = lazy(() => import("./components/DashboardRedirect"));
const CreateProfile = lazy(() => import("./pages/CreateProfile"));
const PetProfile = lazy(() => import("./pages/PetProfile"));
const Shop = lazy(() => import("./pages/Shop"));
const Blog = lazy(() => import("./pages/Blog"));
const Community = lazy(() => import("./pages/Community"));
const About = lazy(() => import("./pages/About"));
const Plans = lazy(() => import("./pages/Plans"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background">
                  <Navigation />
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/como-funciona" element={<Demo />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/pro/dashboard" 
                        element={
                          <ProfessionalRoute>
                            <ProfessionalDashboard />
                          </ProfessionalRoute>
                        } 
                      />
                      <Route 
                        path="/auto-dashboard" 
                        element={
                          <ProtectedRoute>
                            <DashboardRedirect />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/criar-perfil" 
                        element={
                          <ProtectedRoute>
                            <CreateProfile />
                          </ProtectedRoute>
                        } 
                      />
                      <Route path="/pet/:id" element={<PetProfile />} />
                      <Route path="/loja" element={<Shop />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/comunidade" element={<Community />} />
                      <Route path="/sobre" element={<About />} />
                      <Route path="/planos" element={<Plans />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
              </BrowserRouter>
            </SubscriptionProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
