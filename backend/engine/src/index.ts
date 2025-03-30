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
  while (true) {
    const data = await pub.brPop("request", 0);
    console.log("Received data:", data);
    if (data) {
      const request = JSON.parse(data);
      await processOrder(request);
    }
  }
}

main();
