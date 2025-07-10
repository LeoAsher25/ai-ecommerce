export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: string;
  isActive: boolean;
  reviews: Review[];
}

export enum STATUS {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'reject',
}

export interface Review {
  id: number;
  user: User;
  cosmetic: Cosmetic;
  createdAt: Date;
  rating: number;
  content: string;
  imageUrl: string;
  show: boolean;
  status: STATUS;
}

export interface Cosmetic {
  id: number;
  status: STATUS;
  rating: string;
  totalReview: number;
  name: string;
  address: string;
  description: string;
  logo: string;
  code: string;
  linkWebsite: string;
  linkFacebook: string;
  createdAt: Date;
  updatedAt: Date;

  ranking: number;
  category: Category;
  reviews: Review[];
}

export interface Category {
  id: number;
  name: string;
  image: string | null;
  labelColor: string;
  type: 'BASE' | 'TAG';
  createdAt: Date;
}
