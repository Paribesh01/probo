"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { getInrBalance, getStockBalance } from "../actions/actions";
import axios from "axios";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const { data } = useSession();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [inrBalance, setInrBalance] = useState<{
    balance: number;
    locked: number;
  } | null>(null);
  const [yesPrices, setYesPrices] = useState<Record<string, number>>({});

  const { data: session } = useSession();

  const userId = session?.user?.email;

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const stockData = await getStockBalance();
      console.log("stockData", stockData);
      const inrData = await getInrBalance();
      setPortfolioData(stockData || {});
      setInrBalance(inrData || { balance: 0, locked: 0 });
    } catch (e) {
      console.error("Error fetching data", e);
      setPortfolioData({});
      setInrBalance({ balance: 0, locked: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!Object.keys(portfolioData).length) return;

    const ws = new WebSocket("ws://localhost:8085");

    ws.onopen = () => {
      console.log("WebSocket connected");
      Object.keys(portfolioData).forEach((symbol) => {
        ws.send(JSON.stringify({ type: "subscribe", stockSymbol: symbol }));
      });
      axios.get(`http://localhost:3001/api/v1/get`);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (!parsedData.message) return;

        const orderData = JSON.parse(parsedData.message);
        const { stockSymbol, lastYesPrice } = orderData;
        console.log("orderData", orderData);
        if (stockSymbol && lastYesPrice) {
          setYesPrices((prev) => ({
            ...prev,
            [stockSymbol]: lastYesPrice,
          }));
        }
      } catch (err) {
        console.error("WebSocket error:", err);
      }
    };

    ws.onerror = (e) => console.error("WebSocket Error:", e);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, [portfolioData]);

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Info Column */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-primary/20 mb-4 overflow-hidden">
                    {/* Avatar placeholder */}
                    <div className="h-full w-full flex items-center justify-center text-primary font-bold text-2xl">
                      USER
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-1">
                    {data?.user?.email}
                  </h2>

                  <div className="grid grid-cols-2 w-full gap-2 mb-6">
                    <div className="text-center p-2">
                      <p className="text-sm text-muted-foreground">Locked</p>
                      <p className="font-semibold">${inrBalance?.locked}</p>
                    </div>
                    <div className="text-center p-2">
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="font-semibold">${inrBalance?.balance}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Column */}
          <div className="md:w-2/3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start mb-6 bg-secondary">
                <TabsTrigger value="ongoing">Ongoing Trades</TabsTrigger>
              </TabsList>

              {/* Ongoing Trades Tab */}
              <TabsContent value="ongoing" className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  Your Active Positions
                </h2>

                {/* Market 1 */}
                {Object.entries(portfolioData).map(([symbol, data]: any) => {
                  const yesQty = data.yes.quantity;
                  const noQty = data.no.quantity;

                  const yesPrice = yesPrices[symbol] ?? 0;
                  const noPrice = 10 - yesPrice;

                  const yesValue = (yesQty * yesPrice).toFixed(2);
                  const noValue = (noQty * noPrice).toFixed(2);

                  return (
                    <Card key={symbol} className="mb-6">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          {/* Left - Summary */}
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {symbol}
                            </h3>
                            <div className="mb-2 flex gap-2 items-center">
                              <Badge className="bg-market-yes text-white">
                                YES
                              </Badge>
                              <span className="text-sm">
                                {yesQty} shares @ ₹{yesPrice} ={" "}
                                <b>₹{yesValue}</b>
                              </span>
                            </div>
                            <div className="mb-2 flex gap-2 items-center">
                              <Badge className="bg-market-no text-white">
                                NO
                              </Badge>
                              <span className="text-sm">
                                {noQty} shares @ ₹{noPrice} = <b>₹{noValue}</b>
                              </span>
                            </div>
                          </div>

                          {/* Right - Actions */}
                          <div className="flex flex-col items-end justify-between">
                            <Button size="sm" variant="outline">
                              Sell Position
                            </Button>
                          </div>
                        </div>

                        {/* Optional - Ordered Data */}
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-1">
                            Ordered YES
                          </h4>
                          {Object.entries(data.yes.ordered).map(
                            ([price, orderDetails]: any) => (
                              <p key={price} className="text-xs">
                                ₹{price} → Qty: {orderDetails.total}
                              </p>
                            )
                          )}
                          <h4 className="text-sm font-medium mt-2 mb-1">
                            Ordered NO
                          </h4>
                          {Object.entries(data.no.ordered).map(
                            ([price, orderDetails]: any) => (
                              <p key={price} className="text-xs">
                                ₹{price} → Qty: {orderDetails.total}
                              </p>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Market 2 */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
