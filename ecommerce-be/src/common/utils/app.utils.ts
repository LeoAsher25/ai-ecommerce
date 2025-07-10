import { COMMON_CONST } from './../constants/app.constant';
import { QueryOptions } from 'mongoose';

export default class AppUtils {
  static getPagingData = (page: string, pageSize: string): Pick<QueryOptions, 'limit' | 'skip'> => {
    const pageInt = (parseInt(page) || COMMON_CONST.DEFAULT_PAGE) - 1;
    const limitInt = parseInt(pageSize) || COMMON_CONST.DEFAULT_PAGE_LIMIT;
    return {
      skip: pageInt * limitInt,
      limit: limitInt,
    };
  };
}
