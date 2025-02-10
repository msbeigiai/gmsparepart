import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchOrderByOrderId } from "@/features/order/orderSlice";
import { Separator } from "@radix-ui/react-separator";
import { ChevronRight, Clock, CreditCard, MapPin, Package } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import OrderItemCard from "./OrderItemCard";
import OrderStatusBadge from "../OrderStatusBadge";

const Order = () => {
  const dispatch = useAppDispatch();
  const { item: order } = useAppSelector((state) => state.order);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const params = useParams();

  useEffect(() => {
    isAuthenticated && dispatch(fetchOrderByOrderId(params.orderId!));
  }, [dispatch, isAuthenticated, params]);

  if (!order.orderId) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex justify-center items-center">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-8 text-center">
            <Package className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              No Order Found
            </h2>
            <p className="text-slate-500">
              Please check your order ID and try again
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 flex justify-center items-center">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Order ID</p>
              <CardTitle className="text-xl font-semibold text-slate-900">
                #{order.orderId.slice(0, 7).toUpperCase()}
              </CardTitle>
            </div>
            <OrderStatusBadge status={order.orderStatus} />
          </div>
          <div className="flex items-center text-sm text-slate-500">
            <Clock className="h-4 w-4 mr-2" />
            <span>Ordered on {new Date().toLocaleDateString()}</span>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Order Items
              </h3>
              <div className="space-y-2">
                {order.orderItemDTOS?.map((orderItem, index) => (
                  <OrderItemCard key={index} orderItem={orderItem} />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Delivery Details
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-slate-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Delivery Address
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">${order.totalOrderAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-base font-medium">Total</span>
                <span className="text-base font-bold">
                  ${order.totalOrderAmount}
                </span>
              </div>
            </div>

            {order.orderStatus === "PENDING" && (
              <div className="mt-6">
                <button
                  onClick={() => (window.location.href = "google.com")}
                  className="w-full bg-slate-900 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-slate-800 transition-colors"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Proceed to Payment</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Order;
