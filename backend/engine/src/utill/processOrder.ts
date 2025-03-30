import { sub } from "..";
import { requestTypes } from "../types";

export const processOrder = async (request: any) => {
  console.log("Processing order:", request);

  switch (request.type) {
    case requestTypes.CREATESYMBOL:
      console.log("Creating symbol:", request.payload.symbol);
      await sub.publish(
        request.id,
        JSON.stringify({ message: "Symbol created" })
      );
      console.log("Published to channel:", request.id);
      break;
    default:
      console.log("Unknown request type");
      break;
  }
};
