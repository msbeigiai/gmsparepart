import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { AppDispatch } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { keycloak } from "@/features/auth/authSlice";
import { addToLocalCart } from "@/features/cart/localCartSlice";
import {
  addToFavorite,
  fetchFavorites,
  removeFavorite,
} from "@/features/favorite/favoriteSlice";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { ToastAction } from "./ui/toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [localWishlisted, setLocalWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch: AppDispatch = useAppDispatch();
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const { toast } = useToast();
  const navigate = useNavigate();

  const discount = Math.round(product.price / 100);

  // Convert single image to array or use existing array
  const images = Array.isArray(product.imageUrls)
    ? product.imageUrls
    : [product.imageUrls];

  useEffect(() => {
    const isItemWishlisted = favorites.some(
      (fav) => fav.productId === product.productId
    );
    setLocalWishlisted(isItemWishlisted);
  }, [favorites, product.productId]);

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
      action: (
        <ToastAction altText="Go to cart" onClick={() => navigate("/checkout")}>
          Go to cart
        </ToastAction>
      ),
    });
  };

  const handleAddToFavorite = async (productId: string) => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to add items to favorites",
        action: (
          <ToastAction altText="Login" onClick={() => keycloak.login()}>
            Login
          </ToastAction>
        ),
      });
      return;
    }

    const isCurrentlyWishlisted = localWishlisted;

    try {
      if (isCurrentlyWishlisted) {
        setLocalWishlisted(false);
        await dispatch(removeFavorite({ productId })).unwrap();
        toast({
          variant: "default",
          title: "Removed from favorites",
          description: "Product removed from your favorites list",
        });
      } else {
        setLocalWishlisted(true);
        await dispatch(addToFavorite({ productId })).unwrap();
        toast({
          variant: "default",
          title: "Added to favorites",
          description: "Product added to your favorites list",
        });
      }
    } catch (error) {
      setLocalWishlisted(isCurrentlyWishlisted);
      toast({
        variant: "destructive",
        title: "Action failed",
        description: "Failed to update favorites. Please try again.",
      });
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
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
          src={images[currentImageIndex]}
          alt={`${product.name} - Image ${currentImageIndex + 1}`}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />

        {/* Image Navigation - Only show if multiple images exist */}
        {images.length > 1 && isHovered && (
          <>
            <Button
              size="icon"
              variant="secondary"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100 z-10"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100 z-10"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  currentImageIndex === index
                    ? "bg-white scale-110"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
          {true && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
          {discount !== 0 && (
            <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2
            transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={() => handleAddToFavorite(product.productId)}
          >
            <Heart
              className={`h-4 w-4 ${
                localWishlisted ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full">
            <Link to={`/products/${product.productId}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category */}
        <div className="text-sm text-gray-500 mb-1">{product.categoryName}</div>

        {/* Title */}
        <div className="flex justify-between">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            <Link to={`/products/${product.productId}`}>{product.name}</Link>
          </h3>
          <Badge variant="outline" className="rounded-md">
            {product.stockQuantity} in stock
          </Badge>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl text-red-500 font-bold">
            ${product.price}
          </span>
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
            {"Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
