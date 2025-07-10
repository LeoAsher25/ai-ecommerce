import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server'

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '.'

const commonFilterParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(DEFAULT_PAGE),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  'phan-loai': parseAsString.withDefault(''),
  priceRange: parseAsString.withDefault(''),
  sort: parseAsString.withDefault(''),
  ratings: parseAsString.withDefault(''),
}

const loadCommonFilterParams = createLoader(commonFilterParams)

export { commonFilterParams, loadCommonFilterParams }
