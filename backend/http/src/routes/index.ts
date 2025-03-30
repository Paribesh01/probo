import { Router } from "express";
import { createSymbol } from "../controller/createSymbol";
import { createUser } from "../controller/createUser";

const routes = Router();

routes.post("/symbol/create", createSymbol);
routes.post("/user/create", createUser);

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

export default routes;
