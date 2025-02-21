export const API_BASE_URL = "http://localhost:8081/api/v1";
export const API_ADMIN_BASE_URL = "http://localhost:8081/api/v1/admin";

export interface Product {
  productId: string;
  name: string;
  price: number;
  description: string;
  imageUrls: string | string[];
  defaultImage: string;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
  brand: string;
  manufacturer: string;
  compatibility: string;
}

export interface LocalProduct {
  productId: string;
  name: string;
  price: number;
  defaultImage: string;
}

export interface LocalCartItem {
  productId: string;
  quantity: number;
  product: LocalProduct;
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

// export type Role = "ADMIN" | "CUSTOMER";

// export interface User {
//   given_name: string;
//   family_name: string;
//   name: string;
//   preferred_username: string;
//   roles: Role[];
// }

export type User = Keycloak.KeycloakTokenParsed;

export interface UploadResponse {
  successCount: number[];
  errorCount: number[];
  errors: string[];
}
