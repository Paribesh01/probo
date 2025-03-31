import { INR_BALANCE, STOCK_BALANCE } from "../types";

export const createUser = async (userId: string) => {
  if (INR_BALANCE[userId]) {
    return {
      error: true,
      message: "User Already Exists",
      balance: INR_BALANCE[userId],
    };
  }
  INR_BALANCE[userId] = {
    balance: 10000,
    locked: 0,
  };

  STOCK_BALANCE[userId] = {};

  return {
    message: "User Created",
    balance: INR_BALANCE[userId],
    stockBalance: STOCK_BALANCE[userId],
  };
};
