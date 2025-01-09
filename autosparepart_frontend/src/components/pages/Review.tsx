import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchProductReviews } from '@/features/review/reviewSlice';
import { useEffect } from 'react';

const Review = () => {
  const { item: pageContent } = useAppSelector((state) => state.reviews)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductReviews({ productId: 'a111e7c8-b3b5-4b1d-84cf-98765ff00101' }));
  }, [dispatch])

  console.log('REVIEWS: ', pageContent);

  return (
    <div>{pageContent.content.map((review) => (
      <div key={review.id}>{review.createdAt}</div>
    ))}
    </div>
  )
}

export default Review