import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';

/**
 * Custom hook để xử lý việc điều hướng với fallback route
 * @param fallbackRoute Route dự phòng khi không có history để quay lại
 * @returns Object chứa các hàm điều hướng
 */
export function useNavigation(fallbackRoute: string = APP_ROUTES.DASHBOARD) {
  const router = useRouter();

  /**
   * Hàm điều hướng quay lại với fallback route
   */
  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackRoute);
    }
  };

  return {
    goBack,
    router,
  };
}
