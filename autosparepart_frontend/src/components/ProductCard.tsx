// ProductCard.tsx
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto border rounded-lg shadow-lg overflow-hidden">
      <CardHeader>
        <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{product.description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
