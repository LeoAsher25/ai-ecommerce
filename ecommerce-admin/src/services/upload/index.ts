import { axios, withAxiosHandler } from '@/lib/axios';
import { FileResponse } from './type';

export const uploadService = {
  upload: withAxiosHandler(async (file: File) => {
    return axios.postForm<FileResponse>('/files/upload', {
      file: file,
    });
  }),

  //updateExistingFile: withAxiosHandler((payload: UpdateExistingFileRequest) =>
  //  axios.put('/upload/update', payload),
  //),
};
