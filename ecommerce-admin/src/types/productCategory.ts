export enum EProductCategoryStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export type IProductCategory = {
  _id: string;
  name: string;
  status: EProductCategoryStatus;
  parentId: string;
  parent: IProductCategory;
  order: number;
  slug: string;
};
