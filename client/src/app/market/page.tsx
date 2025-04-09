"use client";
import { useEffect, useState } from "react";
import MarketCard from "@/components/masterCard";
import { getAllSymbol } from "../actions/actions";

const AllStocksPage = () => {
  const [trades, setTrades] = useState<any>([]);
  // const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const symbolData = await getAllSymbol();
        if (symbolData?.symbols) {
          const formattedTrades = symbolData.symbols.map(
            (symbolData, index) => ({
              id: index + 1,
              symbol: symbolData.symbol,
              yesPrice: symbolData.yesPrice || 0,
              noPrice: symbolData.noPrice || 0,
              image: "https://via.placeholder.com/50",
            })
          );
          console.log("Formatted Trades:", formattedTrades);
          setTrades(formattedTrades);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  // Get unique categories from data

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Markets</h1>
      </div>

      {trades.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trades.map((trade) => (
            <MarketCard key={trade.id} {...trade} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No markets found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllStocksPage;
