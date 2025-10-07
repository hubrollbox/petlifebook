import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProfessionalRouteProps {
  children: ReactNode;
}

const ProfessionalRoute = ({ children }: ProfessionalRouteProps) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (userProfile?.user_type !== 'professional') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProfessionalRoute;
