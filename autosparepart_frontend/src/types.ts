export const API_BASE_URL = "http://localhost:8081/api/v1";

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

export interface LocalCartItem {
  productId: string;
  quantity: number;
  product: {
    productId: string;
    name: string;
    price: number;
    image: string;
  };
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  items: LocalCartItem[];
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
  default: boolean;
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
  productPrice: number;
  productImageUrl: string;
}

export interface UserProfile {
  userId: number;
  email: string;
  firstName?: string;
  lastName?: string;
  createdDate?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  subTotal: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  orderStatus: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  creationDate: string;
  deliveryAddress: string;
  totalOrderAmount: number;
  orderItemDTOS: OrderItem[];
}
