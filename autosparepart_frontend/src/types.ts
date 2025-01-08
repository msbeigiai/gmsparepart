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