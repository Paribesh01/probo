export enum requestTypes {
  CREATESYMBOL = "createSymbol",
  CREATEUSER = "createUser",
  BUYOPTIONS = "buyOptions",
  SELLOPTIONS = "sellOptions",
  RESET = "reset",
  ONRAMPINR = "onrampInr",
  GETINRBALANCE = "getInrBalance",
  GETORDERBOOK = "getOrderbook",
  MINTTRADE = "mintTrade",
  GETSTOCKBALANCE = "getStockBalance",
  GETALLSYMBOL = "getAllSymbol",
}

export let ORDERBOOK: Record<string, OrderBook> = {};

export let INR_BALANCE: INR_BALANCE = {};
export let STOCK_BALANCE: Record<string, StockBalance> = {};

export interface INR_BALANCE {
  [key: string]: {
    balance: number;
    locked: number;
  };
}

export interface INRBalance {
  balance: number;
  locked: number;
}

export interface StockOption {
  quantity: number;
  locked: number;
}

export interface StockBalance {
  [stockSymbol: string]: {
    yes?: StockOption;
    no?: StockOption;
  };
}

export interface IndividualEntry {
  type: "sell" | "reverted";
  quantity: number;
}
export interface OrderEntry {
  total: number;
  orders: Record<string, IndividualEntry>;
}
export interface OrderBook {
  yes: Record<number, OrderEntry>;
  no: Record<number, OrderEntry>;
}
