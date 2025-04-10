import { sub } from "..";
import { buyOptions, sellOptions } from "../controllers/buySellOptions";
import { createSymbol } from "../controllers/createSymbol";
import { createUser } from "../controllers/createUser";
import { getAllSymbol } from "../controllers/getAllSymbol";
import { getInrBalance } from "../controllers/getInrBalance";
import { getOrderbook } from "../controllers/getOrderBook";
import { getStockBalance } from "../controllers/getStockBalance";
import { mintTrade } from "../controllers/mintTrade";
import { onrampInr } from "../controllers/rampInr";
import { reset } from "../controllers/reset";
import { requestTypes } from "../types";

export const processOrder = async (request: any) => {
  console.log("Processing order:", request);

  switch (request.type) {
    case requestTypes.CREATESYMBOL:
      console.log("Creating symbol:", request.payload.symbol);
      const result = await createSymbol(request.payload.symbol);
      await sub.publish(request.id, JSON.stringify(result));
      console.log("Published to channel:", request.id);
      break;
    case requestTypes.CREATEUSER:
      console.log("Creating user:", request.payload.userId);
      const result2 = await createUser(request.payload.userId);
      await sub.publish(request.id, JSON.stringify(result2));
      console.log("Published to channel:", request.id);
      break;
    case requestTypes.BUYOPTIONS:
      console.log("Buying options:", request.payload);
      const result3 = await buyOptions(
        request.payload.userId,
        request.payload.stockSymbol,
        request.payload.quantity,
        request.payload.price,
        request.payload.stockType
      );
      await sub.publish(request.id, JSON.stringify(result3));
      console.log("Published to channel:", request.id);

      break;
    case requestTypes.SELLOPTIONS:
      console.log("Selling options:", request.payload);
      const result4 = await sellOptions(
        request.payload.userId,
        request.payload.stockSymbol,
        request.payload.quantity,
        request.payload.price,
        request.payload.stockType
      );
      await sub.publish(request.id, JSON.stringify(result4));
      break;

    case requestTypes.RESET:
      console.log("Resetting");
      const result5 = await reset();
      console.log(result5);
      await sub.publish(request.id, JSON.stringify(result5));
      break;
    case requestTypes.ONRAMPINR:
      console.log("Onramping INR");
      const result6 = await onrampInr(
        request.payload.userId,
        request.payload.amount
      );
      await sub.publish(request.id, JSON.stringify(result6));
      break;
    case requestTypes.GETINRBALANCE:
      console.log("Getting INR balance");
      const result7 = await getInrBalance(request.payload.userId);
      await sub.publish(request.id, JSON.stringify(result7));
      break;
    case requestTypes.GETORDERBOOK:
      console.log("Getting orderbook");
      const result8 = await getOrderbook(request.payload.symbol);
      await sub.publish(request.id, JSON.stringify(result8));
      break;
    case requestTypes.MINTTRADE:
      console.log("Minting trade");
      const result9 = await mintTrade(
        request.payload.userId,
        request.payload.stockSymbol,
        request.payload.quantity
      );
      await sub.publish(request.id, JSON.stringify(result9));
      break;
    case requestTypes.GETSTOCKBALANCE:
      console.log("Getting stock balance");
      const result10 = await getStockBalance(request.payload.userId);
      await sub.publish(request.id, JSON.stringify(result10));
      break;
    case requestTypes.GET:
      console.log("Getting");
      await sub.publish(request.id, JSON.stringify("getting"));
      break;
    case requestTypes.GETALLSYMBOL:
      console.log("Getting all symbol");
      const result11 = await getAllSymbol();
      await sub.publish(request.id, JSON.stringify(result11));
      break;
    default:
      console.log("Unknown request type");
      break;
  }
};
