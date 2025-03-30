import { INR_BALANCE, STOCK_BALANCE } from "../types";

export const createUser = async (userId: string) => {
  if (INR_BALANCE[userId]) {
    return {
      message: "User Already Exists",
      balance: INR_BALANCE[userId],
    };
  }
  INR_BALANCE[userId] = {
    balance: 0,
    locked: 0,
  };

  STOCK_BALANCE[userId] = {};

  return {
    message: "User Created",
    balance: INR_BALANCE[userId],
    stockBalance: STOCK_BALANCE[userId],
  };
};
