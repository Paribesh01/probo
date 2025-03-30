import { Router } from "express";
import { createSymbol } from "../controller/createSymbol";
import { createUser } from "../controller/createUser";
import { buyOptions } from "../controller/buyOptions";
import { sellOptions } from "../controller/sellOptions";
import { reset } from "../controller/reset";
import { onrampInr } from "../controller/onRampInr";
import { getInrBalance } from "../controller/getInrBalance";
import { getOrderbook } from "../controller/getOrderBook";

const routes = Router();

routes.post("/symbol/create", createSymbol);
routes.post("/user/create", createUser);
routes.post("/order/buy", buyOptions);
routes.post("/order/sell", sellOptions);
routes.post("/reset", reset);
routes.post("/onramp/inr", onrampInr);
routes.get("/balance/inr/:userId", getInrBalance);
routes.get("/orderbook/:symbol", getOrderbook);

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

export default routes;
