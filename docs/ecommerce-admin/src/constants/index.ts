import { BadgeProps } from '@/components/ui';
import { TIME_FILTER } from '@/services/dashboard/type';
import { SORT_ORDER, STATUS } from '@/types';
import {
  createLoader,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

export const storageKeys = {
  accessToken: 'accessToken',
};

export const DEFAULT_PAGE_SIZE = 10;

export const getSortingKey = (columnKey: string) => {
  switch (columnKey) {
    case 'createdAt':
      return 'sortByCreatedAt';
    case 'rating':
      return 'sortByRating';
    case 'pendingReview':
      return 'sortByPendingReview';
    case 'totalReview':
      return 'sortByTotalReview';
    default:
      return '';
  }
};

export const getStatusBadgeProps = (status: STATUS): Partial<BadgeProps> => {
  switch (status) {
    case STATUS.PENDING:
      return { customColor: '#A98400', children: 'Chờ phê duyệt' };
    case STATUS.REJECTED:
      return { customColor: '#DE1515', children: 'Bị từ chối' };
    case STATUS.APPROVED:
      return { customColor: '#258D01', children: 'Đã phê duyệt' };
    default:
      return {};
  }
};

export const commonSearchParams = {
  search: parseAsString.withDefault(''),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions({
    clearOnDefault: false,
  }),
  page: parseAsInteger.withDefault(1).withOptions({
    clearOnDefault: false,
  }),
};

const sortOrder = Object.values(SORT_ORDER);
export const commonSortParams = {
  sortByCreatedAt: parseAsStringEnum(sortOrder).withDefault(SORT_ORDER.NONE),
  sortByRating: parseAsStringEnum(sortOrder).withDefault(SORT_ORDER.NONE),
  sortByPendingReview: parseAsStringEnum(sortOrder).withDefault(
    SORT_ORDER.NONE,
  ),
  sortByTotalReview: parseAsStringEnum(sortOrder).withDefault(SORT_ORDER.NONE),
};

export const commonFilterParams = {
  categoryies: parseAsArrayOf(parseAsInteger, ',').withDefault([]),
  statuses: parseAsArrayOf(parseAsString, ',').withDefault([]),
  categories: parseAsString,
  ratings: parseAsArrayOf(parseAsInteger, ',').withDefault([]),
  show: parseAsBoolean,
  isApproved: parseAsBoolean,
  isActive: parseAsBoolean,
  time: parseAsStringEnum(Object.values(TIME_FILTER)).withDefault(
    TIME_FILTER.WEEK,
  ),
};

export const loadCommonSearchParams = createLoader(commonSearchParams);
export const loadCommonSortParams = createLoader(commonSortParams);
export const loadCommonFilterParams = createLoader(commonFilterParams);
