import { OrderItem } from "@/types";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

interface OrderItemCartProps {
  orderItem: OrderItem;
}
const OrderItemCard = ({ orderItem }: OrderItemCartProps) => {
  console.log("orderItem", orderItem);

  return (
    <div className="w-full flex justify-center bg-white">
      <Card className="w-full">
        <CardHeader>{orderItem.productName}</CardHeader>
        <CardContent>
          <p>Price: {orderItem.productPrice}</p>
          <p>Quantity: {orderItem.quantity}</p>
          <p>Subtotal: {orderItem.subtotalPrice}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderItemCard;
