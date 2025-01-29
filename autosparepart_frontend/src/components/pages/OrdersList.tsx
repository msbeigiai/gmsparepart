import { useAppSelector } from "@/app/hooks";
import { LocalCartItem, OrderItem } from "@/types";
import { Table, TableBody, TableCaption } from "../ui/table";
import OrderItemCard from "./OrderItemCard";

const OrdersList = () => {
  const { items: cartItems } = useAppSelector((state) => state.localCart);

  const mapToOrderItem = (cartItem: LocalCartItem): OrderItem => {
    const orderItem: OrderItem = {
      productId: cartItem.productId,
      productName: cartItem.product.name,
      productPrice: cartItem.product.price,
      quantity: cartItem.quantity,
      subtotalPrice: cartItem.product.price * cartItem.quantity,
    };
    return orderItem;
  };

  return (
    <Table className="w-full">
      <TableCaption>Orders</TableCaption>
      <TableBody>
        {cartItems.map((cartItem) => {
          const orderItem = mapToOrderItem(cartItem);
          return (
            <OrderItemCard key={cartItem.productId} orderItem={orderItem} />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default OrdersList;
