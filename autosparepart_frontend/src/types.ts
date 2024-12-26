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