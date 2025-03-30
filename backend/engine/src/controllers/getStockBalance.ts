import { STOCK_BALANCE } from "../types";

export const getStockBalance = async (userId: string) => {
  if (!STOCK_BALANCE[userId]) {
    return { error: "User not found" };
  }
  if (!STOCK_BALANCE[userId]) {
    return { error: "Stock not found" };
  }

  console.log("the stock balance is ", STOCK_BALANCE[userId]);
  return {
    ...STOCK_BALANCE[userId],
  };
};
