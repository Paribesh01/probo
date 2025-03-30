import { ORDERBOOK, INR_BALANCE, STOCK_BALANCE } from "../types";

export const reset = async () => {
  Object.keys(ORDERBOOK).forEach((key) => delete ORDERBOOK[key]);
  Object.keys(INR_BALANCE).forEach((key) => delete INR_BALANCE[key]);
  Object.keys(STOCK_BALANCE).forEach((key) => delete STOCK_BALANCE[key]);

  return {
    message: "Reset successful",
  };
};
