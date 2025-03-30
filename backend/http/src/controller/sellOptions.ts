import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { requestTypes } from "../types";
import { pub } from "..";
import { handlePubSubWithTimeout } from "../utils/pubsubTimeout";

export const sellOptions = async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body);
    const { userId, stockSymbol, quantity, price, stockType } = req.body;
    const id = uuidv4();
    if (!userId) {
      console.log("UserId is required");
      res.status(400).send("UserId is required");
      return;
    }
    if (!stockSymbol) {
      console.log("StockSymbol is required");
      res.status(400).send("StockSymbol is required");
      return;
    }
    if (!quantity) {
      console.log("Quantity is required");
      res.status(400).send("Quantity is required");
      return;
    }
    if (!price) {
      console.log("Price is required");
      res.status(400).send("Price is required");
      return;
    }
    const data = {
      type: requestTypes.SELLOPTIONS,
      id,
      payload: {
        userId,
        stockSymbol,
        quantity,
        price,
        stockType,
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
