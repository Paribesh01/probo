import { Router } from "express";
import { createSymbol } from "../controller/createSymbol";

const routes = Router();

routes.post("/symbol/create", createSymbol);

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

export default routes;
