
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DestinationCardProps {
  id: number;
  name: string;
  image: string;
  location: string;
  rating: number;
  category: string;
  description: string;
  onViewDetails?: () => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  id,
  name,
  image,
  location,
  rating,
  category,
  description,
  onViewDetails
}) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/destinasi/detail?id=${id}`);
    }
  };

  return (
    <Card className="destination-card overflow-hidden">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <Badge className="absolute left-3 top-3 bg-lamsel-blue hover:bg-lamsel-blue/80">
          {category}
        </Badge>
      </div>
      <CardHeader className="pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{name}</h3>
          <div className="flex items-center">
            <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{location}</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-gray-600">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          className="w-full border-lamsel-blue text-lamsel-blue hover:bg-lamsel-blue hover:text-white"
          onClick={handleViewDetails}
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
