"use client";
//import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LineChart from "@/components/ui/line-chart";

import { ArrowUpDown } from "lucide-react";

// import { useSession } from "next-auth/react";

import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface OrderBookItem {
  price: number;
  quantity: any;
}

interface OrderBookData {
  yes: OrderBookItem[];
  no: OrderBookItem[];
}

interface WebSocketData {
  orderbook: OrderBookData;
}

interface OrderBookProps {
  eventId: string;
}

export default function OrderBook({ eventId }: OrderBookProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/signin");
    }
  }, [status]);

  const [orderBookData, setOrderBookData] = useState<OrderBookData | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [yesPrice, setYesPrice] = useState<number>(0);
  const [noPrice, setNoPrice] = useState<number>(0);
  const [showYesData, setShowYesData] = useState<boolean>(true);
  const [yesProbability, setYesProbability] = useState<number[]>([]);
  const [noProbability, setNoProbability] = useState<number[]>([]);
  const [timeSeries, setTimeSeries] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [side, setSide] = useState<"YES" | "NO">("YES");
  const [tradePrice, setTradePrice] = useState("");
  const [tradeQuantity, setTradeQuantity] = useState("");
  const userId = session?.user?.id;
  useEffect(() => {
    setTitle(eventId);
    setDescription("do the trade");

    const ws = new WebSocket("ws://localhost:8085");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "subscribe", stockSymbol: eventId }));
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

        if (orderData.yes && orderData.no) {
          // Convert 'yes' and 'no' from object to array if necessary
          const yesOrders = Object.keys(orderData.yes).map((key) => ({
            price: parseFloat(key),
            quantity: orderData.yes[key],
          }));

          const noOrders = Object.keys(orderData.no).map((key) => ({
            price: parseFloat(key),
            quantity: orderData.no[key],
          }));

          setOrderBookData({ yes: yesOrders, no: noOrders });
          //   setYesPrice(5);
          //   setNoPrice(5);
        }
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket connection closed");
    setSocket(ws);
    return () => ws.close();
  }, [eventId]);

  useEffect(() => {
    console.log("this is the data-----", orderBookData);
  }, [orderBookData]);

  const getBarWidth = (quantity: number, maxQuantity: number) => {
    return `${Math.min((quantity / maxQuantity) * 100, 100)}%`;
  };
  async function handleTrade() {
    if (Number(tradeQuantity) <= 0) {
      return;
    }
    const response = await axios.post(
      `http://localhost:3000/v1/event/initiate`,
      {
        userId,
        eventId: eventId,
        side: side,
        quantity: Number(tradeQuantity),
        price: Number(tradePrice),
      }
    );
    if (response.status === 200) {
      console.log("response", response);
    } else {
      console.log("error", response);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6 mt-1">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2 bg-black border border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800">
                  <TableHead className="text-white font-sans">PRICE</TableHead>
                  <TableHead className="text-white font-sans">
                    QTY AT YES
                  </TableHead>
                  <TableHead className="text-white font-sans">PRICE</TableHead>
                  <TableHead className="text-white font-sans">
                    QTY AT NO
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBookData && orderBookData.yes && orderBookData.no ? (
                  (() => {
                    const yesItems = orderBookData.yes;

                    const noItems = orderBookData.no;

                    const maxYesQuantity = Math.max(
                      ...yesItems.map((item) => item.quantity.total)
                    );
                    const maxNoQuantity = Math.max(
                      ...noItems.map((item) => item.quantity.total)
                    );
                    console.log("yesItems", yesItems);
                    console.log("noItems", noItems);

                    return yesItems.map((yesItem, index) => {
                      const noItem = noItems[index];
                      console.log("*********", noItem);
                      return (
                        <TableRow
                          key={index}
                          className="border-b border-gray-800"
                        >
                          <TableCell className="text-blue-500 font-semibold">
                            {yesItem.price}
                          </TableCell>
                          <TableCell className="p-0">
                            <div className="relative h-full w-full">
                              <div
                                className="absolute top-0 left-0 h-full bg-blue-700 opacity-20"
                                style={{
                                  width: getBarWidth(
                                    yesItem.quantity.total,
                                    maxYesQuantity
                                  ),
                                }}
                              ></div>
                              <div className="relative p-4 text-blue-500">
                                {yesItem.quantity.total}
                              </div>
                            </div>
                          </TableCell>
                          {noItem && (
                            <>
                              <TableCell className="text-red-500">
                                {noItem.price}
                              </TableCell>
                              <TableCell className="p-0">
                                <div className="relative h-full w-full">
                                  <div
                                    className="absolute top-0 left-0 h-full bg-red-700 opacity-20"
                                    style={{
                                      width: getBarWidth(
                                        noItem.quantity.total,
                                        maxNoQuantity
                                      ),
                                    }}
                                  ></div>
                                  <div className="relative p-4 text-red-500">
                                    {noItem.quantity.total}
                                  </div>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      );
                    });
                  })()
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Loading order book...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-black border border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Place Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <Button
                variant={side === "YES" ? "default" : "outline"}
                onClick={() => setSide("YES")}
                className={`bg-blue-500 text-white hover:bg-blue-600 ${
                  side === "YES" ? "ring-2 ring-blue-400" : ""
                }`}
              >
                Yes ₹{yesPrice}
              </Button>
              <Button
                variant={side === "NO" ? "default" : "outline"}
                onClick={() => setSide("NO")}
                className={`bg-red-500 text-white hover:bg-red-600 ${
                  side === "NO" ? "ring-2 ring-red-400" : ""
                }`}
              >
                No ₹{noPrice}
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="trade-price"
                  className="block text-sm font-medium text-white"
                >
                  Price
                </label>
                <Input
                  id="trade-price"
                  type="number"
                  value={tradePrice}
                  onChange={(e) => setTradePrice(e.target.value)}
                  className="mt-1 bg-gray-900 text-white border-gray-700"
                />
                <p className="text-sm text-gray-400">0 qty available</p>
              </div>
              <div>
                <label
                  htmlFor="trade-quantity"
                  className="block text-sm font-medium text-white"
                >
                  Quantity
                </label>
                <Input
                  id="trade-quantity"
                  type="number"
                  value={tradeQuantity}
                  onChange={(e) => setTradeQuantity(e.target.value)}
                  className="mt-1 bg-gray-900 text-white border-gray-700"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-bold">₹{yesPrice}</p>
                  <p className="text-sm text-gray-400">You put</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-500">
                    ₹{yesPrice + noPrice - yesPrice}
                  </p>
                  <p className="text-sm text-gray-400">You get</p>
                </div>
              </div>
              <Button
                onClick={handleTrade}
                className={`w-full text-white ${
                  side === "YES"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Place order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
