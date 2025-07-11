export enum EProductCategoryStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export type IProductCategory = {
  _id: string
  name: string
  status: EProductCategoryStatus
  parentId: string
  order: number
  slug: string
}
