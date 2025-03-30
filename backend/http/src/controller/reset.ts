import { Request, Response } from "express";
import { pub } from "..";
import { v4 as uuidv4 } from "uuid";
import { requestTypes } from "../types";
import { handlePubSubWithTimeout } from "../utils/pubsubTimeout";

export const reset = async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body);
    const id = uuidv4();

    const data = {
      type: requestTypes.RESET,
      id,
    };
    await pub.lPush("request", JSON.stringify(data));
    const response = await handlePubSubWithTimeout(id, 5000);

    res.json(JSON.parse(response));
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
