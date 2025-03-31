import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Input } from "../components/ui/input";

import { cn } from "../lib/utils";

interface Trade {
  id: number;
  question: string;
  yesPrice: number;
  noPrice: number;
  image: string;
}
const trades = [
  {
    id: 1,
    question: "Will Bitcoin hit $70k by December?",
    yesPrice: 0.65,
    noPrice: 0.35,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    question: "Will India win the next cricket world cup?",
    yesPrice: 0.55,
    noPrice: 0.45,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    question: "Will AI replace 50% of jobs by 2030?",
    yesPrice: 0.4,
    noPrice: 0.6,
    image: "https://via.placeholder.com/50",
  },
];

export default function BrowseTrades() {
  const [selectedTrade, setSelectedTrade] = useState<Trade>();
  const [tradeType, setTradeType] = useState("yes");
  const [orderType, setOrderType] = useState("buy");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [inrBalance, setInrBalance] = useState(10000);
  const [yesBalance, setYesBalance] = useState(50);
  const [noBalance, setNoBalance] = useState(50);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Trades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <Sheet key={trade.id}>
            <SheetTrigger asChild>
              <Card
                className="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg overflow-hidden"
                onClick={() => {
                  setSelectedTrade(trade);
                  setPrice(trade.yesPrice);
                }}
              >
                <CardHeader className="flex items-center gap-4 p-4 bg-white">
                  <img
                    src={trade.image}
                    alt="Trade Logo"
                    className="w-12 h-12 rounded-full"
                  />
                  <CardTitle className="text-lg font-semibold">
                    {trade.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between p-4 bg-gray-50 text-lg font-semibold">
                  <span className="text-green-600">Yes: {trade.yesPrice}</span>
                  <span className="text-red-600">No: {trade.noPrice}</span>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white p-6 shadow-lg rounded-l-lg"
            >
              {selectedTrade && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <img
                      src={selectedTrade.image}
                      alt="Trade Logo"
                      className="w-12 h-12 rounded-full"
                    />
                    {selectedTrade.question}
                  </h2>
                  <div className="mb-4 text-lg font-semibold">
                    INR Balance: ₹{inrBalance}
                  </div>
                  <div className="mb-4 text-lg font-semibold">
                    Available No Balance:{noBalance}
                  </div>
                  <div className="mb-4 text-lg font-semibold">
                    Available No Balance:{yesBalance}
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setTradeType("yes")}
                        className={cn(
                          "w-1/2 py-3 text-lg font-semibold transition",
                          tradeType === "yes"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200"
                        )}
                      >
                        {trade.yesPrice} Yes
                      </Button>
                      <Button
                        onClick={() => setTradeType("no")}
                        className={cn(
                          "w-1/2 py-3 text-lg font-semibold transition",
                          tradeType === "no"
                            ? "bg-red-600 text-white"
                            : "bg-gray-200"
                        )}
                      >
                        {trade.noPrice} No
                      </Button>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setOrderType("buy")}
                        className={cn(
                          "w-1/2 py-3 text-lg font-semibold transition",
                          orderType === "buy"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                        )}
                      >
                        Buy
                      </Button>
                      <Button
                        onClick={() => setOrderType("sell")}
                        className={cn(
                          "w-1/2 py-3 text-lg font-semibold transition",
                          orderType === "sell"
                            ? "bg-orange-600 text-white"
                            : "bg-gray-200"
                        )}
                      >
                        Sell
                      </Button>
                    </div>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Quantity"
                      className="text-lg p-3 border rounded-md"
                    />
                    <Input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Price"
                      className="text-lg p-3 border rounded-md"
                    />
                    <Button className="w-full py-3 text-lg font-semibold bg-green-600 text-white transition hover:bg-green-700">
                      {orderType.charAt(0).toUpperCase() + orderType.slice(1)}{" "}
                      {tradeType.toUpperCase()}
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}
