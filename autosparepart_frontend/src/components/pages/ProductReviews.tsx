import React from 'react';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Review } from '@/types';

// interface ReviewType {
//   id: string;
//   userName: string;
//   userImage?: string;
//   rating: number;
//   date: string;
//   title: string;
//   content: string;
//   verifiedPurchase: boolean;
//   helpful: number;
// }

interface ProductReviewsProps {
  reviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  const getAverageRating = (reviews: Review[]) => {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingPercentage = (rating: number) => {
    const count = reviews.filter(review => Math.floor(review.rating) === rating).length;
    return (count / reviews.length) * 100;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        {/* Summary Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Customer Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Number(getAverageRating(reviews))
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xl font-semibold">{getAverageRating(reviews)}</span>
              <span className="text-gray-500">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm w-8">{rating} star</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round(getRatingPercentage(rating))}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Reviews List */}
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={""} alt={review.username} />
                      <AvatarFallback>
                        {review.username.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.username}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.verifiedPurchase && (
                    <Badge variant="secondary">Verified Purchase</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">{review.productId}</h4>
                  <p className="text-gray-600">{review.reviewText}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <button className="hover:text-gray-700">
                    {review.helpfulVotes} people found this helpful
                  </button>
                  <span>•</span>
                  <button className="hover:text-gray-700">Report</button>
                </div>

                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ProductReviews;