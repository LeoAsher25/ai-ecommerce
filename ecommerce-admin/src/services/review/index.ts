import { axios, withAxiosHandler } from '@/lib/axios';
import {
  GetReviewDetailResponse,
  GetReviewsRequest,
  GetReviewsResponse,
  UpsertReviewRequest,
  UpsertReviewsRequest,
} from './type';
import { approveReviewFilters, reviewFilters } from '@/mock/reviews';
import { commonService } from '../common';

export const reviewService = {
  getReviews: withAxiosHandler((params: GetReviewsRequest) =>
    axios.get<GetReviewsResponse>('/reviews', { params }),
  ),

  getReviewDetail: withAxiosHandler((id: number) =>
    axios.get<GetReviewDetailResponse>(`/reviews/${id}`),
  ),

  upsertReview: withAxiosHandler((payload: UpsertReviewRequest) =>
    payload.id
      ? axios.put(`/reviews/${payload.id}`, payload)
      : axios.post('/reviews', payload),
  ),

  updateReviews: withAxiosHandler((params: UpsertReviewsRequest) =>
    axios.put('/reviews', null, { params }),
  ),

  deleteReviews: withAxiosHandler((ids: number[]) =>
    axios.delete('/reviews', { params: { ids } }),
  ),
  getReviewFilter: async () => {
    const { success, data } = await commonService.getAllCategories({
      type: 'BASE',
    });
    if (!success) return { success, data };
    return { success, data: reviewFilters(data.data) };
  },
  getApproveReviewFilter: () => approveReviewFilters,
};
