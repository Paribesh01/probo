import { createClient } from "redis";
import { processOrder } from "./utill/processOrder";

export const pub = createClient();
export const sub = createClient();

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
    const data = await pub.brPop("request", 0);

    console.log("📩 Received raw data:", data);

    if (!data || !data.element) {
      console.error("Invalid data format:", data);
      continue;
    }

    try {
      const request = JSON.parse(data.element);
      console.log("Parsed request:", request);
      await processOrder(request);
    } catch (error) {
      console.error(" JSON Parsing Error:", error);
    }
  }
}

main();
handleRequest();
