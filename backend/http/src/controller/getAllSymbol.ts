import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { requestTypes } from "../types";
import { pub } from "..";
import { handlePubSubWithTimeout } from "../utils/pubsubTimeout";

export const getAllSymbol = async (req: Request, res: Response) => {
  try {
    console.log("Received request:", req.body);
    const id = uuidv4();

    const data = {
      type: requestTypes.GETALLSYMBOL,
      id,
      payload: {
        symbol: "all",
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
