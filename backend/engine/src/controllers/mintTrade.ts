import { STOCK_BALANCE } from "../types";

export const mintTrade = async (
  userId: string,
  stockSymbol: string,
  quantity: number
) => {
  if (!STOCK_BALANCE[userId]) {
    STOCK_BALANCE[userId] = {};
  }
  if (!STOCK_BALANCE[userId][stockSymbol]) {
    STOCK_BALANCE[userId][stockSymbol] = {
      yes: { quantity: 0, locked: 0 },
      no: { quantity: 0, locked: 0 },
    };
  }
  if (STOCK_BALANCE[userId][stockSymbol].yes) {
    STOCK_BALANCE[userId][stockSymbol].yes.quantity += quantity;
  }
  if (STOCK_BALANCE[userId][stockSymbol].no) {
    STOCK_BALANCE[userId][stockSymbol].no.quantity += quantity;
  }
  return {
    ...STOCK_BALANCE[userId][stockSymbol],
  };
};
