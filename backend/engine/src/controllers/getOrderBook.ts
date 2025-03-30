import { ORDERBOOK } from "../types";

export const getOrderbook = async (symbol: string) => {
  if (!ORDERBOOK[symbol]) {
    return { error: "Orderbook not found" };
  }
  return {
    ...ORDERBOOK[symbol],
  };
};
