import { Router } from "express";
import { createSymbol } from "../controller/createSymbol";
import { createUser } from "../controller/createUser";
import { buyOptions } from "../controller/buyOptions";
import { sellOptions } from "../controller/sellOptions";

const routes = Router();

routes.post("/symbol/create", createSymbol);
routes.post("/user/create", createUser);
routes.post("/order/buy", buyOptions);
routes.post("/order/sell", sellOptions);

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

export default routes;
