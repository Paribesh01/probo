import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { requestTypes } from "../types";
import { pub } from "..";
import { handlePubSubWithTimeout } from "../utils/pubsubTimeout";

export const onrampInr = async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body);
    const { userId, amount } = req.body;
    const id = uuidv4();

    if (!userId) {
      res.status(400).send("UserId is required");
      return;
    }
    if (!amount) {
      res.status(400).send("Amount is required");
      return;
    }

    const data = {
      type: requestTypes.ONRAMPINR,
      id,
      payload: {
        userId,
        amount,
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
