
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';

interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
  isVerified?: boolean;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: 1,
    name: "Budi Santoso",
    avatar: "BS",
    date: "20 April 2025",
    rating: 5,
    comment: "Tempat yang sangat indah! Pemandangannya luar biasa dan fasilitas sangat bersih. Pasti akan kembali lagi.",
    isVerified: true
  },
  {
    id: 2,
    name: "Siti Rahayu",
    avatar: "SR",
    date: "15 April 2025",
    rating: 4,
    comment: "Saya sangat menikmati kunjungan saya. Namun, area parkir sedikit terbatas. Secara keseluruhan pengalaman yang sangat baik.",
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    avatar: "AR",
    date: "10 April 2025",
    rating: 5,
    comment: "Spot foto yang luar biasa! Cocok untuk penggemar fotografi seperti saya. Akan membawa peralatan yang lebih baik saat kembali nanti."
  }
];

interface ReviewSectionProps {
  destinationId: number;
  destinationName: string;
  initialRating: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  destinationId, 
  destinationName,
  initialRating 
}) => {
  const isMobile = useIsMobile();
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [userName, setUserName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };
  
  const handleRatingHover = (rating: number) => {
    setHoverRating(rating);
  };
  
  const handleRatingLeave = () => {
    setHoverRating(0);
  };
  
  const handleSubmitReview = () => {
    if (!userRating) {
      toast.error("Silakan berikan rating terlebih dahulu");
      return;
    }
    
    if (!reviewText.trim()) {
      toast.error("Silakan tulis ulasan Anda");
      return;
    }
    
    if (!userName.trim()) {
      toast.error("Silakan masukkan nama Anda");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview: Review = {
        id: reviews.length + 1,
        name: userName,
        avatar: userName.split(' ').map(name => name[0]).join('').toUpperCase(),
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        rating: userRating,
        comment: reviewText
      };
      
      setReviews([newReview, ...reviews]);
      setUserRating(0);
      setReviewText('');
      setUserName('');
      setIsSubmitting(false);
      
      toast.success("Terima kasih! Ulasan Anda telah ditambahkan", {
        description: `Untuk ${destinationName}`
      });
    }, 1000);
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, initialRating) / (reviews.length + 1);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-2 text-2xl font-bold">Ulasan Pengunjung</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-lamsel-blue">{averageRating.toFixed(1)}</span>
            <span className="text-lg text-gray-500">/5</span>
          </div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-500">({reviews.length} ulasan)</span>
        </div>
      </div>
      
      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold">Berikan Ulasan Anda</h3>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Nama Anda</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full rounded-md border px-4 py-2 focus:border-lamsel-blue focus:outline-none focus:ring-1 focus:ring-lamsel-blue"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 cursor-pointer transition-all ${
                  star <= (hoverRating || userRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => handleRatingClick(star)}
                onMouseEnter={() => handleRatingHover(star)}
                onMouseLeave={handleRatingLeave}
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">Ulasan</label>
          <Textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Bagikan pengalaman Anda saat mengunjungi destinasi ini..."
            className="min-h-[100px]"
          />
        </div>
        <Button 
          onClick={handleSubmitReview} 
          className="w-full bg-lamsel-blue hover:bg-lamsel-blue/80"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </Button>
      </div>
      
      <div>
        <h3 className="mb-4 text-xl font-semibold">Ulasan Terbaru</h3>
        <div className={`grid gap-6 ${isMobile ? '' : 'grid-cols-2'}`}>
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} alt={review.name} />
                    <AvatarFallback>{review.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{review.name}</p>
                      {review.isVerified && (
                        <Badge className="ml-2 bg-green-500 hover:bg-green-600" variant="default">
                          <span className="text-[10px]">Verified</span>
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
