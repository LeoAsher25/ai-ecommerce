import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTES } from '@/constants/routes'
import { userActions } from '@/redux/features/user-slice'
import { store } from '@/redux/store'
import { IErrorResponse } from '@/types/common'

// export const handleError = (error: any) => {
//   if (error.response.data.message) {
//     toast.error(error.response.data.message)
//   }
// }

export default function handleError(error: unknown, router?: ReturnType<typeof useRouter>) {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    toast.error((error as IErrorResponse).message)

    if ((error as IErrorResponse).code && router) {
      router?.push(APP_ROUTES.HOME)
      store.dispatch(userActions.logout())
    }
  } else {
    toast.error('Có lỗi xảy ra, vui lòng thử lại sau')
  }
}
