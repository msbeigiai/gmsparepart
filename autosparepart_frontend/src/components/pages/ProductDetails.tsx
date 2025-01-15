import React, { useEffect, useState } from 'react';
import { Heart, Share2, ShoppingCart, Minus, Plus, Star, StarHalf } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToLocalCart } from '@/features/cart/localCartSlice';
import { ToastAction } from '../ui/toast';
import { useToast } from '@/hooks/use-toast';
import { fetchProductReviews } from '@/features/review/reviewSlice';
import ProductReviews from './ProductReviews';

// Type definitions
interface ProductImage {
  url: string;
  alt: string;
}

interface ProductDetails {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: ProductImage[];
  rating: number;
  reviews: number;
  sizes: string[];
  colors: string[];
  specifications: Record<string, string>;
  stockCount: number;
}

export const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { items } = useAppSelector((state) => state.localCart);
  const{item: pageContent} = useAppSelector((state)=>state.reviews)
  const dispatch = useAppDispatch();

  const { toast } = useToast();
  const navigate  = useNavigate();

  useEffect(()=>{
    dispatch(fetchProductReviews({productId: productId!}));
  },[dispatch])


  // Replace with your actual selector
  const product = useAppSelector((state) =>
    state.products.items.find(p => p.productId === productId)
  );


  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToLocalCart({ product, quantity: quantity }));
    toast({
      variant: "destructive",
      title: "Product added to cart",
      description: "You can review your cart and proceed to checkout",
      action: <ToastAction altText="Go to cart" onClick={() => navigate('/checkout')}>Go to cart</ToastAction>,
    });
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Product Info */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-semibold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <p className="text-gray-600">
                  {product.description}
                </p>
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {/* Add to Cart Button */}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
        <ProductReviews reviews={pageContent.content} />
    </div>
  );
};

export default ProductDetails;