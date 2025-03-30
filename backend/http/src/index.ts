import express from "express";
import cors from "cors";
import { createClient } from "redis";
import routes from "./routes";

const app = express();

export const pub = createClient();
export const sub = createClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", routes);

async function main() {
  try {
    await pub.connect();
    await sub.connect();
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
