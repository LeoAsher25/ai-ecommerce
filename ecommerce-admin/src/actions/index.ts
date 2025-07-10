import { userService } from '@/services';
import { reviewService } from '@/services/review';

export * from './revalidate';

export const getReviewDetail = async (id: number) => {
  const review = await reviewService.getReviewDetail(id);
  if (!review.success) return { review, count: 0 };
  const user = await userService.getUserDetail(review.data.user.id);
  if (!user.success) return { review, count: 0 };
  return { review, count: user.data.reviews.length };
};
