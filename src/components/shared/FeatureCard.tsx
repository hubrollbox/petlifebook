import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconGradient?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  iconGradient = 'from-primary to-secondary'
}: FeatureCardProps) => {
  return (
    <Card className="text-center hover:shadow-memorial transition-all duration-300">
      <CardHeader>
        <div className={`mx-auto w-12 h-12 bg-gradient-to-r ${iconGradient} rounded-full flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
