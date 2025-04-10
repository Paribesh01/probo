import { createClient } from "redis";
import { processOrder } from "./utils";

export const pub = createClient({ url: "redis://redis:6379" });
export const sub = createClient({ url: "redis://redis:6379" });

async function main() {
  try {
    await pub.connect();
    await sub.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
}

async function handleRequest() {
  console.log("Listening for requests...");
  while (true) {
    const data = await pub.brPop("db", 0);

    console.log("📩 Received raw data:", data);

    if (!data || !data.element) {
      console.error("Invalid data format:", data);
      continue;
    }

    const request = JSON.parse(data.element);
    console.log("Parsed request:", request);
    await processOrder(request);
  }
}

main();
handleRequest();
