import { INR_BALANCE, STOCK_BALANCE } from "../types";

export const onrampInr = async (userId: string, amount: number) => {
  INR_BALANCE[userId].balance += amount;

  if (!STOCK_BALANCE[userId]) {
    STOCK_BALANCE[userId] = {};
  }

  return {
    message: "INR ramped successfully with amount: " + amount,
  };
};
