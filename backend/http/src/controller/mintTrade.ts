import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { requestTypes } from "../types";
import { pub } from "..";
import { handlePubSubWithTimeout } from "../utils/pubsubTimeout";

export const mintTrade = async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body);
    const { userId, stockSymbol, quantity } = req.body;
    const id = uuidv4();

    if (!userId) {
      res.status(400).send("UserId is required");
      return;
    }
    if (!stockSymbol) {
      res.status(400).send("StockSymbol is required");
      return;
    }
    if (!quantity) {
      res.status(400).send("Quantity is required");
      return;
    }

    const data = {
      type: requestTypes.MINTTRADE,
      id,
      payload: {
        userId,
        stockSymbol,
        quantity,
      },
    };

    await pub.lPush("request", JSON.stringify(data));
    const response = await handlePubSubWithTimeout(id, 5000);

    res.json(JSON.parse(response));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
