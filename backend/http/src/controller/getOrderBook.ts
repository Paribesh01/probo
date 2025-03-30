import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { requestTypes } from "../types";
import { pub } from "..";
import { handlePubSubWithTimeout } from "../utils/pubsubTimeout";

export const getOrderbook = async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body);
    const { symbol } = req.params;
    const id = uuidv4();

    if (!symbol) {
      res.status(400).send("Symbol is required");
      return;
    }

    const data = {
      type: requestTypes.GETORDERBOOK,
      id,
      payload: {
        symbol,
      },
    };

    await pub.lPush("request", JSON.stringify(data));
    const response = await handlePubSubWithTimeout(id, 10000);

    res.json(JSON.parse(response));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
