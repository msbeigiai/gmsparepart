import { Order } from "@/types";
import { ExternalLink, Package } from "lucide-react";
import { Button } from "./ui/button";
import OrderStatusBadge from "./OrderStatusBadge";
import { Link } from "react-router-dom";

interface OrdersListProps {
  orders: Order[];
}

const ProfileOrdersList = ({ orders }: OrdersListProps) => {
  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="border-b last:border-0 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">
                    Order #{order.orderId.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on {order.creationDate}, 2024
                  </p>
                  <OrderStatusBadge status={order.orderStatus} />
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.totalOrderAmount}</p>
                <Link to={`/orders/${order.orderId}`}>
                  <Button variant="ghost" size="sm" className="mt-2">
                    View Details
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-gray-500 text-center text-xl">You have no order</h2>
      )}
    </div>
  );
};

export default ProfileOrdersList;
