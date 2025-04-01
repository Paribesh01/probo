"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getAllSymbol } from "../actions/actions";

interface Trade {
  id: number;
  symbol: string;
  yesPrice: number;
  noPrice: number;
  image: string;
}

export default function BrowseTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const symbolData = await getAllSymbol();
        if (symbolData?.symbols) {
          const formattedTrades = symbolData.symbols.map(
            (symbolData, index) => ({
              id: index + 1,
              symbol: symbolData.symbol,
              yesPrice: symbolData.yesPrice,
              noPrice: symbolData.noPrice,
              image: "https://via.placeholder.com/50",
            })
          );
          setTrades(formattedTrades);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Trades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trades.map((trade) => (
          <Card
            key={trade.id}
            className="cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105 rounded-lg overflow-hidden"
            onClick={() => router.push(`/trade/${trade.symbol}`)}
          >
            <CardHeader className="flex items-center gap-4 p-4 bg-white">
              <img
                src={trade.image}
                alt="Trade Logo"
                className="w-12 h-12 rounded-full"
              />
              <CardTitle className="text-lg font-semibold">
                {trade.symbol}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between p-4 bg-gray-50 text-lg font-semibold">
              <span className="text-green-600">Yes: {trade.yesPrice}</span>
              <span className="text-red-600">No: {trade.noPrice}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
