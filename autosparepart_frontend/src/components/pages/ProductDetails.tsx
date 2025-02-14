import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addToLocalCart } from "@/features/cart/localCartSlice";
import { fetchProductReviews } from "@/features/review/reviewSlice";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastAction } from "../ui/toast";
import ProductReviews from "./ProductReviews";

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
  const { item: pageContent } = useAppSelector((state) => state.reviews);
  const dispatch = useAppDispatch();

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductReviews({ productId: productId! }));
  }, [dispatch]);

  // Replace with your actual selector
  const product = useAppSelector((state) =>
    state.products.items.find((p) => p.productId === productId)
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
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative aspect-square">
                <img
                  src={product.imageUrls}
                  alt={product.name}
                  className="w-full h-full object-contain m-2 border-2 rounded-lg outline-none border-slate-100"
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae et adipisci eligendi ducimus debitis iste dolorem
                  placeat sed, delectus eveniet earum libero laboriosam nesciunt
                  perspiciatis, quidem fuga cum aliquam quaerat omnis excepturi
                  ea accusamus. Rerum repellendus deleniti quisquam et nobis
                  iste? Perspiciatis explicabo natus pariatur eum reprehenderit
                  et nulla, saepe delectus? Expedita dolor magni, non adipisci
                  dolorem facilis repudiandae totam id perferendis fugiat dicta
                  quod necessitatibus magnam modi, iure aperiam! Consequuntur
                  dolorum, quos accusamus reiciendis qui nisi placeat eveniet
                  atque nihil omnis molestiae sequi dolore quam, pariatur
                  officia illo, totam vero in corrupti veritatis! Quibusdam
                  repellat facilis atque magnam ducimus.
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
                <Button className="w-full" size="lg" onClick={handleAddToCart}>
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
