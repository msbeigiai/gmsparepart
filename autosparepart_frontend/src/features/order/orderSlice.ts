import { Order } from "@/types";

interface OrderState {
  item: Order;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrderState = {
  item: {} as Order,
  status: "idle",
  error: null,
};
