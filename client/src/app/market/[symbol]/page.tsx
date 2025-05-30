"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Share2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const marketData = {
  id: "2",
  title: "Will the Federal Reserve cut interest rates in Q2 2024?",
  description:
    "This market resolves to YES if the Federal Reserve announces a cut to the federal funds rate during the second quarter (April - June) of 2024. It resolves to NO if no cut is announced during this period.",
  category: "Finance",
  yesPrice: 0.72,
  noPrice: 0.28,
  yesTrend: 1.5,
  noTrend: -1.5,
  endTime: "June 30, 2024",
  volume24h: 12450,
  liquidity: 35750,
  isTrending: true,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border rounded-md shadow-md">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-market-yes">
          YES: {payload[0].value} trades
        </p>
        <p className="text-xs text-market-no">NO: {payload[1].value} trades</p>
      </div>
    );
  }

  return null;
};

const SingleStockPage = () => {
  const { symbol } = useParams() as any;
  const [quantity, setQuantity] = useState(50);
  const [position, setPosition] = useState<"YES" | "NO">("YES");

  const { data: session } = useSession();
  const [yesPrice, setYesPrice] = useState<number>(0);
  const [orderBookData, setOrderBookData] = useState<any>(null);
  const [title, setTitle] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [tradePrice, setTradePrice] = useState(5);
  const userId = session?.user?.id;

  const formatOrderBook = (data: any) => {
    const result: { price: string; yes: number; no: number }[] = [];

    // Create a Set of all unique price points from both 'yes' and 'no'
    const allPrices = new Set([
      ...Object.keys(data.yes || {}),
      ...Object.keys(data.no || {}),
    ]);

    allPrices.forEach((priceStr) => {
      const price = parseFloat(priceStr);
      const yesData = data.yes?.[priceStr];
      const noData = data.no?.[priceStr];

      result.push({
        price: `$${price.toFixed(2)}`, // If price is in 10s (like 8 -> 0.80)
        yes: yesData?.total || 0,
        no: noData?.total || 0,
      });
    });

    // Optionally sort by price ascending
    result.sort(
      (a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
    );

    return result;
  };

  useEffect(() => {
    setTitle(symbol);

    const ws = new WebSocket("ws://localhost:8085");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "subscribe", stockSymbol: symbol }));
      axios.get(`http://localhost:3001/api/v1/get`);
      console.log("WebSocket connection opened.");
    };
    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log("Raw WebSocket data:", parsedData);

        if (!parsedData.message) {
          console.error("No message field in WebSocket data.");
          return;
        }

        const orderData = JSON.parse(parsedData.message);

        console.log("Parsed Order Data:", orderData);

        const result = formatOrderBook(orderData);
        setOrderBookData(result);
        setYesPrice(orderData.lastYesPrice);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");
    setSocket(ws);
    return () => ws.close();
  }, [symbol]);

  useEffect(() => {
    console.log("this is the data-----", orderBookData);
  }, [orderBookData]);

  async function handleTrade() {
    if (Number(quantity) <= 0) {
      return;
    }
    // userId: buyer2Id,
    // stockSymbol: symbol,
    // quantity: quantity + 20,
    // price,
    // stockType: "yes",
    const response = await axios.post(
      `http://localhost:3001/api/v1/order/buy`,
      {
        userId,
        stockSymbol: symbol,
        stockType: position,
        quantity: Number(quantity),
        price: Number(tradePrice),
      }
    );
    if (response.status === 200) {
      console.log("response", response);
    } else {
      console.log("error", response);
    }
  }

  // Calculate costs based on current price and quantity
  const cost = (tradePrice * quantity).toFixed(2);

  return (
    <>
      <div className="container py-8">
        {/* Market Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{title}</h1>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Closes: {marketData.endTime}</span>
            </div>

            <div className="ml-auto">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground">{marketData.description}</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chart & Trade Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Trading Volume by Price</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pl-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={orderBookData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 0,
                        bottom: 20,
                      }}
                      barSize={20}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                      <XAxis dataKey="price" stroke="#4a5568" />
                      <YAxis
                        stroke="#4a5568"
                        label={{
                          value: "Number of Trades",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle" },
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="yes"
                        name="YES Trades"
                        stackId="a"
                        fill="#22c55e"
                      />
                      <Bar
                        dataKey="no"
                        name="NO Trades"
                        stackId="b"
                        fill="#ef4444"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Trade Activity & Discussion Tabs */}
          </div>

          {/* Right Column - Trading UI */}
          <div className="space-y-6">
            {/* Price Display Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card
                className={`${position === "YES" ? "border-market-yes" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      YES PRICE
                    </p>
                    <p className="text-2xl font-bold text-market-yes">
                      ${yesPrice.toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center"></div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`${position === "NO" ? "border-market-no" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      NO PRICE
                    </p>
                    <p className="text-2xl font-bold text-market-no">
                      ${(10 - yesPrice).toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Interface */}
            <Card>
              <CardHeader>
                <CardTitle>Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Position Selection */}
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      I think this will happen:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={position === "YES" ? "default" : "outline"}
                        onClick={() => setPosition("YES")}
                        className={
                          position === "YES"
                            ? "bg-market-yes hover:bg-market-yesHover"
                            : ""
                        }
                      >
                        YES
                      </Button>
                      <Button
                        variant={position === "NO" ? "default" : "outline"}
                        onClick={() => setPosition("NO")}
                        className={
                          position === "NO"
                            ? "bg-market-no hover:bg-market-noHover"
                            : ""
                        }
                      >
                        NO
                      </Button>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Quantity:</label>
                      <span className="text-sm text-muted-foreground">
                        Current Price: $
                        {position === "YES"
                          ? yesPrice.toFixed(2)
                          : (10 - yesPrice).toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">10</span>
                      <span className="text-lg font-medium">{quantity}</span>
                      <span className="text-sm">100</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium">Price:</label>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      step={1}
                      value={tradePrice}
                      onChange={(e) => setTradePrice(parseInt(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">1</span>
                      <span className="text-lg font-medium">{tradePrice}</span>
                      <span className="text-sm">10</span>
                    </div>
                  </div>

                  <hr className="border-border" />

                  {/* Order Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Position:</span>
                      <span className="text-sm font-medium">{position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quantity:</span>
                      <span className="text-sm font-medium">
                        {quantity} shares
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Cost:</span>
                      <span className="text-sm font-medium">${cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Potential Profit:</span>
                      <span className="text-sm font-medium text-market-yes">
                        ${(quantity * 10 - parseFloat(cost)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleTrade} size="lg">
                    Buy {quantity} {position} @ ${tradePrice.toFixed(2)}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Markets */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleStockPage;
