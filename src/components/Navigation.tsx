import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:shadow-memorial transition-all duration-300">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              PetMemorial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Início
            </Link>
            <Link
              to="/demo"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/demo") ? "text-primary" : "text-foreground"
              }`}
            >
              Ver Exemplo
            </Link>
            <Link
              to="/planos"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/planos") ? "text-primary" : "text-foreground"
              }`}
            >
              Planos
            </Link>
            <Button variant="outline" size="sm">
              Entrar
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:shadow-memorial">
              Criar Memorial Grátis
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/demo"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/demo") ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Ver Exemplo
              </Link>
              <Link
                to="/planos"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/planos") ? "text-primary" : "text-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Planos
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                  Criar Memorial Grátis
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;