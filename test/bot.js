import axios from "axios";

const HTTP_SERVER_URL = "http://localhost:3001/api/v1";
const SYMBOLS = [
  "AAPL_USDT_20_Jan_2025_10_00",
  "TSLA_USDT_20_Jan_2025_10_00",
  "GOOG_USDT_20_Jan_2025_10_00",
  "NFLX_USDT_20_Jan_2025_10_00",
];
const BOT_USERS = ["bot_1", "bot_2", "bot_3", "bot_4", "bot_5"];
const INTERVAL = 1000;

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[random(0, arr.length - 1)];

const createUsersAndSymbols = async () => {
  for (const symbol of SYMBOLS) {
    await axios.post(`${HTTP_SERVER_URL}/symbol/create`, { symbol });
  }

  for (const userId of BOT_USERS) {
    await axios.post(`${HTTP_SERVER_URL}/user/create`, { userId });
    await axios.post(`${HTTP_SERVER_URL}/onramp/inr`, {
      userId,
      amount: 100000,
    });
  }

  console.log(`[INIT] Created symbols and users ✅`);
};

const randomTrade = async () => {
  const userId = pick(BOT_USERS);
  const stockSymbol = pick(SYMBOLS);
  const stockType = Math.random() > 0.5 ? "yes" : "no";
  const action = Math.random() > 0.5 ? "buy" : "sell";
  const quantity = random(1, 50);
  const price = random(1, 9);

  const order = {
    userId,
    stockSymbol,
    stockType,
    quantity,
    price,
  };

  try {
    await axios.post(`${HTTP_SERVER_URL}/order/${action}`, order);
    console.log(
      `[${action.toUpperCase()}] ${userId} ${stockType.toUpperCase()} ${quantity} @ ₹${price} on ${stockSymbol}`
    );
  } catch (err) {
    console.log("error");
  }
};

const startBot = async () => {
  await createUsersAndSymbols();
  setInterval(randomTrade, INTERVAL);
};

startBot();
