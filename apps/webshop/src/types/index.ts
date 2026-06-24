export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  stock: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type ProductCategory = 'Tools' | 'Fasteners' | 'Safety Equipment' | 'Power Tools';

export type PartiallyRequired<Type, RequiredFields extends keyof Type> = Required<
  Pick<Type, RequiredFields>
> &
  Partial<Omit<Type, RequiredFields>>;
