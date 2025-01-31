import React, { useEffect, useState } from "react";
import { OrderStatus } from "./Profile";

interface OrderStatusProps {
  orderStatus: OrderStatus;
}

const OrderStatusBadge = ({ orderStatus }: OrderStatusProps) => {
  const [textColor, setTextColor] = useState("");
  const [statusText, setStatusText] = useState<OrderStatus>(
    OrderStatus.PENDING
  );

  const handleTextColor = () => {
    switch (orderStatus) {
      case OrderStatus.PENDING: {
        setStatusText(OrderStatus.PENDING);
        return setTextColor("bg-yellow-100 text-yellow-800");
      }

      case OrderStatus.COMPLETED: {
        setStatusText(OrderStatus.COMPLETED);
        return setTextColor("bg-green-100 text-green-800");
      }
      default:
        break;
    }
  };

  useEffect(() => {
    handleTextColor();
  }, [orderStatus]);

  return (
    <span
      className={
        textColor &&
        "inline-flex items-center px-2 py-1 mt-1 text-xs rounded-full " +
          `${textColor}`
      }
    >
      {statusText}
    </span>
  );
};

export default OrderStatusBadge;
