import { OrderItem } from "@/types";
import { Package } from "lucide-react";

interface OrderItemCartProps {
  orderItem: OrderItem;
}
const OrderItemCard = ({ orderItem }: OrderItemCartProps) => (
  <div className="flex items-center space-x-4 p-4 hover:bg-slate-50 transition-colors rounded-lg">
    <div className="h-24 w-24 bg-slate-100 rounded-lg flex items-center justify-center">
      <Package className="h-12 w-12 text-slate-400" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-slate-900 truncate">
        {orderItem.productName}
      </p>
      <p className="text-sm text-slate-500">Quantity: {orderItem.quantity}</p>
      <p className="text-sm text-slate-500">
        Price per item: ${orderItem.subTotal}
      </p>
    </div>
    <div className="text-right">
      <p className="text-lg font-semibold text-slate-900">
        ${(orderItem.quantity * orderItem.subTotal).toFixed(2)}
      </p>
    </div>
  </div>
);

export default OrderItemCard;
