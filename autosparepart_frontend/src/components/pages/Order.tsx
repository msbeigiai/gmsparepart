import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchOrderByOrderId } from "@/features/order/orderSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import OrderItemCard from "./OrderItemCard";
import { Badge } from "../ui/badge";
import OrderStatusBadge from "./OrderStatusBadge";
import { OrderStatus } from "./Profile";
import ProceedToPay from "../ProceedToPay";
import { MapPinCheckInside } from "lucide-react";

const Order = () => {
  const dispatch = useAppDispatch();
  const { item: order } = useAppSelector((state) => state.order);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const params = useParams();

  useEffect(() => {
    isAuthenticated && dispatch(fetchOrderByOrderId(params.orderId!));
  }, [dispatch, isAuthenticated, params]);

  console.log("order", order);
  console.log("auth", isAuthenticated);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-300 to-indigo-100 p-8 flex justify-center items-center">
      <Card className="w-3/4 p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold border-b-2 pb-2 tracking-tight ">
            {order.orderId
              ? "Your order #" + order.orderId.slice(0, 7).toLocaleUpperCase()
              : "No order found"}
          </CardTitle>
        </CardHeader>
        <CardContent className="rounded-xl border-4 flex flex-col p-0 space-y-2 text-xl ">
          {order.orderItemDTOS &&
            order.orderItemDTOS.map((orderItem) => (
              <OrderItemCard orderItem={orderItem} />
            ))}
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start">
          <div className="flex items-center space-x-2 mb-2">
            <MapPinCheckInside size={32} className="mb-4" />
            <h2 className="text-2xl font-semibold py-2 mb-4">
              Delivery Address: {order.deliveryAddress}
            </h2>
          </div>
          <div className="w-1/4 flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl mr-2">Status: </span>
              {order.orderStatus === "PENDING" && (
                <ProceedToPay url={"google.com"} />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl mr-2">Total: </span>
              <Badge className="py-2 text-xl px-4">
                ${order.totalOrderAmount}
              </Badge>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Order;
