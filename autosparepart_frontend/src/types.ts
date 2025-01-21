export interface Product {
  productId: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: {
    productId: string;
    name: string;
    price: number;
    description: string;
    image: string;
  };
}

export interface Cart {
  items: CartItem[];
}

export interface Review {
  id: number;
  productId: string;
  username: string;
  rating: number;
  reviewText: string;
  verifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
  helpfulVotes: number;
}

export interface Category {
  id: number;
  name: string;
  productCount: number;
}

export interface Address {
  addressId: number;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface BaseAddressRequest {
  city: string;
  postalCode: string;
  addressLine1: string;
}

export interface AddAddressRequest extends BaseAddressRequest {
  addressId?: number;
}

export interface UpdateAddressRequest extends BaseAddressRequest {
  addressId: number;
}

export interface Favorite {
  favoriteId: number;
  productId: string;
  productName: string;
  productPrice: string;
  productImageUrl: string;
}