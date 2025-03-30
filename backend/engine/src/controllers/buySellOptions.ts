import {
  buyNoOption,
  buyYesOption,
  sellNoOption,
  sellYesOption,
} from "../utill/exchangeStock";

export const buyOptions = async (
  userId: string,
  stockSymbol: string,
  quantity: number,
  price: number,
  orderType: string
) => {
  let response;
  if (orderType === "yes") {
    response = await buyYesOption(userId, stockSymbol, quantity, price);
  } else {
    response = await buyNoOption(userId, stockSymbol, quantity, price);
  }
  return response;
};

export const sellOptions = async (
  userId: string,
  stockSymbol: string,
  quantity: number,
  price: number,
  orderType: string
) => {
  let response;
  if (orderType === "yes") {
    response = await sellYesOption(userId, stockSymbol, quantity, price);
  } else {
    response = await sellNoOption(userId, stockSymbol, quantity, price);
  }
  return response;
};
