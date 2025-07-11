import { axios, withAxiosHandler } from '@/lib/axios';
import {
  GetCosmeticDetailResponse,
  GetCosmeticsRequest,
  GetCosmeticsResponse,
  GetTopCosmeticRequest,
  GetTopCosmeticResponse,
  UpsertCosmeticRequest,
  UpsertCosmeticsStatus,
  UpsertTopCosmeticRankingRequest,
} from './type';
import { cosmeticFilters } from '@/mock/cosmetics';
import { commonService } from '../common';

export const cosmeticService = {
  getCosmetics: withAxiosHandler((params: GetCosmeticsRequest) =>
    axios.get<GetCosmeticsResponse>('/cosmetics', { params }),
  ),

  getTopCosmetics: withAxiosHandler((params: GetTopCosmeticRequest) =>
    axios.get<GetTopCosmeticResponse>('/cosmetics/top-ranked', { params }),
  ),

  getCosmeticDetail: withAxiosHandler((id: number) =>
    axios.get<GetCosmeticDetailResponse>(`/cosmetics/${id}`),
  ),

  upsertCosmetic: withAxiosHandler(
    ({ id, ...payload }: UpsertCosmeticRequest) =>
      id
        ? axios.put(`/cosmetics/${id}`, payload)
        : axios.post('/cosmetics', payload),
  ),

  upsertCosmeticsStatus: withAxiosHandler((payload: UpsertCosmeticsStatus) =>
    axios.put('/cosmetics/update-status', payload),
  ),

  deleteCosmetics: withAxiosHandler((ids: number[]) =>
    axios.delete('/cosmetics', { params: { ids } }),
  ),

  getCosmeticFilters: async () => {
    const { success, data, message } = await commonService.getAllCategories({
      type: 'BASE',
    });
    if (!success) return { success, message, data };
    return { success, data: cosmeticFilters(data.data), message: '' };
  },

  upsertCosmeticRanking: withAxiosHandler(
    (payload: UpsertTopCosmeticRankingRequest) =>
      axios.put('/cosmetics/update-ranking', payload),
  ),
};
