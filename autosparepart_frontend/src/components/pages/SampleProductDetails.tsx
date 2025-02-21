import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { keycloak } from "@/features/auth/authSlice";
import { addToLocalCart } from "@/features/cart/localCartSlice";
import {
  addToFavorite,
  removeFavorite,
} from "@/features/favorite/favoriteSlice";
import { fetchProductReviews } from "@/features/review/reviewSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  StarHalf,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [localWishlisted, setLocalWishlisted] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();
  const { item: review } = useAppSelector((state) => state.reviews);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const product = useAppSelector((state) =>
    state.products.items.find((p) => p.productId === productId)
  );

  useEffect(() => {
    const isItemWishlisted = favorites.some(
      (fav) => fav.productId === product?.productId
    );
    setLocalWishlisted(isItemWishlisted);
    dispatch(fetchProductReviews({ productId: productId! }));
  }, [dispatch, favorites, product?.productId]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-lg text-gray-500">Product not found</p>
      </div>
    );
  }

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
    const isCurrentlyWishlisted = localWishlisted; // Store current state

    try {
      if (isCurrentlyWishlisted) {
        setLocalWishlisted(!isCurrentlyWishlisted); // Optimistically update
        await dispatch(removeFavorite({ productId })).unwrap();
        toast({
          variant: "default",
          title: "Removed from favorites",
          description: "Product removed from your favorites list",
        });
      } else {
        setLocalWishlisted(!isCurrentlyWishlisted); // Optimistically update
        await dispatch(addToFavorite({ productId })).unwrap();
        toast({
          variant: "default",
          title: "Added to favorites",
          description: "Product added to your favorites list",
        });
      }
    } catch (error) {
      setLocalWishlisted(isCurrentlyWishlisted); // Revert to original state if error
      toast({
        variant: "destructive",
        title: "Action failed",
        description: "Failed to update favorites. Please try again.",
      });
    }
  };

  // Sample product data
  // const product: ProductDetails = {
  //   id: "1",
  //   name: "Premium Comfort Sneakers",
  //   price: 129.99,
  //   originalPrice: 159.99,
  //   description:
  //     "Experience ultimate comfort with our premium sneakers. Featuring advanced cushioning technology and breathable materials, these sneakers are perfect for both athletic activities and casual wear.",
  //   images: [
  //     { url: "/api/placeholder/500/500", alt: "Sneaker front view" },
  //     { url: "/api/placeholder/500/500", alt: "Sneaker side view" },
  //     { url: "/api/placeholder/500/500", alt: "Sneaker back view" },
  //   ],
  //   rating: 4.5,
  //   reviews: 128,
  //   sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
  //   colors: ["White", "Black", "Navy", "Red"],
  //   specifications: {
  //     Material: "Premium Mesh and Synthetic",
  //     Sole: "Rubber",
  //     Closure: "Lace-up",
  //     Weight: "280g",
  //   },
  //   stockCount: 50,
  // };

  const renderRatingStars = () => {
    const totalRating = review.content.reduce((acc, co) => acc + co.rating, 0);
    const stars = [];
    const fullStars = Math.floor(totalRating);
    const hasHalfStar = totalRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    return stars;
  };

  const handleAddToCart = () => {
    dispatch(addToLocalCart({ product, quantity: quantity }));
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

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {[1, 2, 3].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={product.imageUrls}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">{renderRatingStars()}</div>
              <span className="text-sm text-gray-600">
                ({review.content.length} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.price && (
              <span className="text-lg text-gray-500 line-through">
                ${product.price}
              </span>
            )}
            {product.price && (
              <Badge variant="destructive">
                {Math.round(
                  ((product.price - product.price) / product.price) * 100
                )}
                % OFF
              </Badge>
            )}
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className="w-16"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setQuantity(Math.min(product.stockQuantity, quantity + 1))
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleAddToFavorite(product.productId)}
            >
              <Heart
                className={`h-4 w-4 ${
                  localWishlisted && "fill-red-500 text-red-500"
                } `}
              />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              {/* <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex">
                    <dt className="font-medium w-32">{key}:</dt>
                    <dd className="text-gray-600">{value}</dd>
                  </div>
                ))}
              </dl> */}
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
              <p className="text-gray-600">
                Free shipping on orders over $100. Estimated delivery time: 3-5
                business days.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
