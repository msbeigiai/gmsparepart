import { OrderItem } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ShoppingBasket } from "lucide-react";

interface OrderItemCartProps {
  orderItem: OrderItem;
}
const OrderItemCard = ({ orderItem }: OrderItemCartProps) => {
  return (
    <div className="bg-slate-300 flex justify-between items-center w-full py-4 px-3 rounded-md">
      <div className="flex items-center ">
        <ShoppingBasket size={32} className="text-slate-700 ml-2" />
        <Button variant="link" size="lg" className="text-xl">
          <Link to={`/products/${orderItem.productId}`}>
            {orderItem.productName}
          </Link>
        </Button>
      </div>
      <span>Price: {orderItem.subTotal}$</span>
      <span>Quantity: {orderItem.quantity}</span>
    </div>
  );
};

export default OrderItemCard;
