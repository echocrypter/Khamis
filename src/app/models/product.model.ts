export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women' | 'leather-goods' | 'high-jewelry';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  edition: string;
  description: string;
  material: string;
  imageUrl: string;
  additionalImages?: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface FittingRequest {
  fullName: string;
  email: string;
  preferredCity: string;
  preferredDate: string;
  notes?: string;
  productId?: string;
}
