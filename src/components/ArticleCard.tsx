
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const ArticleCard = ({ id, title, excerpt, image, author, date, readTime, category }: ArticleCardProps) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/informasi/detail?id=${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-lamsel-blue text-white px-3 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-lamsel-blue transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6">
        <Button 
          onClick={handleReadMore}
          className="w-full bg-lamsel-blue hover:bg-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg"
        >
          Baca Selengkapnya
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
