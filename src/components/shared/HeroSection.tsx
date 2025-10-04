import { ReactNode } from 'react';

interface HeroSectionProps {
  title: string | ReactNode;
  subtitle: string;
  backgroundImage?: string;
  actions?: ReactNode;
  badge?: ReactNode;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  actions,
  badge 
}: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </>
      )}
      
      <div className="relative container mx-auto max-w-4xl text-center">
        {badge && <div className="mb-4">{badge}</div>}
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          {subtitle}
        </p>
        
        {actions && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
