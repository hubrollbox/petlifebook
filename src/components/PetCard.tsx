import { Heart, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PetCardProps {
  name: string;
  breed: string;
  birthDate: string;
  deathDate?: string;
  location: string;
  image: string;
  description: string;
  isPremium?: boolean;
}

const PetCard = ({ 
  name, 
  breed, 
  birthDate, 
  deathDate, 
  location, 
  image, 
  description, 
  isPremium = false 
}: PetCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-memorial transition-all duration-300 group">
      <div className="relative">
        <img 
          src={image} 
          alt={`Foto de ${name}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {isPremium && (
          <Badge className="absolute top-3 right-3 bg-memorial-gold text-black">
            Premium
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <Heart className="w-5 h-5 text-primary fill-primary/20" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">{breed}</p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {birthDate} {deathDate && `- ${deathDate}`}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location}</span>
        </div>
        
        <p className="text-sm text-foreground/80 line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
};

export default PetCard;