import { ORDERBOOK } from "../types";

export const getAllSymbol = async () => {
  return {
    message: "All Symbols",
    symbols: Object.keys(ORDERBOOK).map((symbol) => {
      const orderbook = ORDERBOOK[symbol];

      const yesPrices = Object.keys(orderbook.yes)
        .map(Number)
        .sort((a, b) => a - b);
      let yesPrice = yesPrices.length > 0 ? yesPrices[0] : null;

      const noPrices = Object.keys(orderbook.no)
        .map(Number)
        .sort((a, b) => a - b);
      let noPrice = noPrices.length > 0 ? noPrices[0] : null;

      if (yesPrice === null && noPrice === null) {
        return { symbol, yesPrice: null, noPrice: null };
      }

      if (yesPrice === null) {
        yesPrice = 10 - noPrice!;
      }

      if (noPrice === null) {
        noPrice = 10 - yesPrice!;
      }

      return {
        symbol,
        yesPrice,
        noPrice,
      };
    }),
  };
};
