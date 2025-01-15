import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addToLocalCart } from "@/features/cart/localCartSlice";
import { addToFavorite, fetchFavorites, removeFavorite } from "@/features/favorite/favoriteSlice";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { ToastAction } from "./ui/toast";

interface ProductCardProps {
  product: Product;
}


const ProductCard = ({ product }: ProductCardProps) => {
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch: AppDispatch = useAppDispatch();
  const { items: favorites, error, status } = useAppSelector((state) => state.favorites);
  const { toast } = useToast();
  const navigate = useNavigate();

  const discount = Math.round(product.price / 100);

  const isWishlisted = favorites.some(fav => fav.productId === product.productId);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated]);



  const handleAddToLocalCart = () => {
    dispatch(addToLocalCart({ product, quantity: 1 }));
    toast({
      variant: "default",
      title: "Product added to cart",
      description: "You can review your cart and proceed to checkout",
      action: <ToastAction altText="Go to cart" onClick={() => navigate('/checkout')}>Go to cart</ToastAction>,
    });
  }

  const handleAddToFavorite = (productId: string) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to add items to favorites",
        action: <ToastAction altText="Login" onClick={() => navigate('/login')}>Login</ToastAction>,
      });
      return;
    }

    if (isWishlisted) {
      dispatch(removeFavorite({ productId }))
        .then(() => {
          toast({
            variant: "default",
            title: "Removed from favorites",
            description: "Product removed from your favorites list",
          });
        });
    } else {
      dispatch(addToFavorite({ productId }))
        .then(() => {
          toast({
            variant: "default",
            title: "Added to favorites",
            description: "Product added to your favorites list",
          });
        });
    }
  };

  return (
    <Card
      className="relative group overflow-hidden transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Badges */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {true && (
            <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
          )}
          {discount !== 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2
            transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={() => handleAddToFavorite(product.productId)}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>

        {/* Title */}
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          <Badge variant='outline' className="rounded-full">
            {product.stockQuantity} in stock
          </Badge>
        </div>

        {/* Rating */}
        {/* <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(3)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300'
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({3})
          </span>
        </div> */}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl text-red-500 font-bold">${product.price}</span>
          {true && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price + 20}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={!true}
            onClick={handleAddToLocalCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};


export default ProductCard;
