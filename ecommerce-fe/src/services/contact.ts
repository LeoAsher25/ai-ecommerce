import { axiosHandler, axiosInstance } from '@/utils/axiosHandler'

export interface IContactFormData {
  phoneNumber: string
  userHeight: string
  note: string
}

export const contactService = {
  sendContactForm: axiosHandler(async (data: IContactFormData) => {
    return axiosInstance.post('/contacts', data)
  }),
}
