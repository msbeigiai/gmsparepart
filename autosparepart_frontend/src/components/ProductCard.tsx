import React from 'react';
import { Card, CardImage, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="w-full max-w-sm mx-auto border rounded-lg shadow-lg overflow-hidden">
      <CardImage src={product.image} alt={product.name} />
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
      </CardHeader>
      <CardContent>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};


export default ProductCard;
