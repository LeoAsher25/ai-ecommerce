import { axios, withAxiosHandler } from '@/lib/axios';
import { GetDashboardRequest, GetDashboardResponse } from './type';

export const dashboardService = {
  getDashboard: withAxiosHandler((params: GetDashboardRequest) =>
    axios.get<GetDashboardResponse>('/dashboard', { params }),
  ),
};
