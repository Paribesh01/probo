import { sub } from "..";
import { createSymbol } from "../controllers/createSymbol";
import { createUser } from "../controllers/createUser";
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
    default:
      console.log("Unknown request type");
      break;
  }
};
