import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleCreateMemorial = () => {
    if (user) {
      navigate("/criar-perfil");
    } else {
      navigate("/auth");
    }
  };

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
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4 mr-2" />
                      {user.email?.split('@')[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/criar-perfil")}>
                      Adicionar Pet
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/planos")}>
                      Planos
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-memorial"
                  onClick={handleCreateMemorial}
                >
                  Criar Memorial Grátis
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/auth")}>
                  Entrar
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-memorial"
                  onClick={handleCreateMemorial}
                >
                  Criar Memorial Grátis
                </Button>
              </>
            )}
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
                {user ? (
                  <>
                    <div className="text-sm text-muted-foreground px-2">
                      {user.email}
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsOpen(false);
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        handleCreateMemorial();
                        setIsOpen(false);
                      }}
                    >
                      Criar Memorial Grátis
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigate("/auth");
                        setIsOpen(false);
                      }}
                    >
                      Entrar
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-secondary"
                      onClick={() => {
                        handleCreateMemorial();
                        setIsOpen(false);
                      }}
                    >
                      Criar Memorial Grátis
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;