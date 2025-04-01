"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStockBalance, getInrBalance } from "../../actions/actions";
import OrderBook from "@/components/StockBook";

export default function TradePage() {
  const params = useParams();
  const symbol = params.symbol;
  const [inrBalance, setInrBalance] = useState(0);
  const [yesBalance, setYesBalance] = useState(0);
  const [noBalance, setNoBalance] = useState(0);
  const [tradeType, setTradeType] = useState("yes");
  const [orderType, setOrderType] = useState("buy");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    async function fetchBalances() {
      try {
        const inrData = await getInrBalance();
        if (inrData) setInrBalance(inrData.balance);

        const stockData = await getStockBalance();
        console.log("----", stockData);
        console.log(params);
        if (stockData && stockData[symbol]) {
          setYesBalance(stockData[symbol].yes.quantity);
          setNoBalance(stockData[symbol].no.quantity);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchBalances();
  }, [symbol]);

  return (
    // <div className="p-6 bg-gray-100 min-h-screen">
    //   <h1 className="text-3xl font-bold mb-6 text-center">{symbol} Trade</h1>
    //   <div className="mb-4 text-lg font-semibold">
    //     INR Balance: ₹{inrBalance}
    //   </div>
    //   <div className="mb-4 text-lg font-semibold">
    //     Available No Balance: {noBalance}
    //   </div>
    //   <div className="mb-4 text-lg font-semibold">
    //     Available Yes Balance: {yesBalance}
    //   </div>
    //   <div className="flex flex-col gap-6">
    //     <div className="flex gap-4">
    //       <Button
    //         onClick={() => setTradeType("yes")}
    //         className={`w-1/2 py-3 text-lg font-semibold ${
    //           tradeType === "yes" ? "bg-green-600 text-white" : "bg-gray-200"
    //         }`}
    //       >
    //         Yes
    //       </Button>
    //       <Button
    //         onClick={() => setTradeType("no")}
    //         className={`w-1/2 py-3 text-lg font-semibold ${
    //           tradeType === "no" ? "bg-red-600 text-white" : "bg-gray-200"
    //         }`}
    //       >
    //         No
    //       </Button>
    //     </div>
    //     <div className="flex gap-4">
    //       <Button
    //         onClick={() => setOrderType("buy")}
    //         className={`w-1/2 py-3 text-lg font-semibold ${
    //           orderType === "buy" ? "bg-blue-600 text-white" : "bg-gray-200"
    //         }`}
    //       >
    //         Buy
    //       </Button>
    //       <Button
    //         onClick={() => setOrderType("sell")}
    //         className={`w-1/2 py-3 text-lg font-semibold ${
    //           orderType === "sell" ? "bg-orange-600 text-white" : "bg-gray-200"
    //         }`}
    //       >
    //         Sell
    //       </Button>
    //     </div>
    //     <Input
    //       type="number"
    //       value={quantity}
    //       onChange={(e) => setQuantity(Number(e.target.value))}
    //       placeholder="Quantity"
    //       className="text-lg p-3 border rounded-md"
    //     />
    //     <Input
    //       type="number"
    //       value={price}
    //       onChange={(e) => setPrice(Number(e.target.value))}
    //       placeholder="Price"
    //       className="text-lg p-3 border rounded-md"
    //     />
    //     <Button className="w-full py-3 text-lg font-semibold bg-green-600 text-white transition hover:bg-green-700">
    //       {orderType.charAt(0).toUpperCase() + orderType.slice(1)}{" "}
    //       {tradeType.toUpperCase()}
    //     </Button>
    //   </div>
    // </div>
    <>
      <OrderBook eventId={symbol as string} />
    </>
  );
}
