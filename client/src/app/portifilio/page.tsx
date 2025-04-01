"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getStockBalance, getInrBalance } from "../actions/actions";

const PortfolioPage = () => {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<any>({});
  const [inrBalance, setInrBalance] = useState<{
    balance: number;
    locked: number;
  } | null>(null);
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/auth/signin");
  }

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

  if (loading) {
    return <div className="text-center text-xl font-bold">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">INR Balance</h2>
      <div className="p-4 bg-gray-800 text-white rounded-lg mb-6">
        <p>Balance: ₹{inrBalance?.balance}</p>
        <p>Locked: ₹{inrBalance?.locked}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Stock Portfolio</h2>
      {Object.entries(portfolioData).map(([symbol, data]: any) => (
        <div
          key={symbol}
          className="mb-6 p-4 border border-gray-700 rounded-lg"
        >
          <h3 className="text-xl font-semibold mb-2">{symbol}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-200 rounded-lg">
              <h4 className="font-bold">YES</h4>
              <p>Quantity: {data.yes.quantity}</p>
              <p>Locked: {data.yes.locked}</p>
            </div>
            <div className="p-4 bg-gray-300 rounded-lg">
              <h4 className="font-bold">NO</h4>
              <p>Quantity: {data.no.quantity}</p>
              <p>Locked: {data.no.locked}</p>
            </div>
          </div>

          {/* Ordered Section */}
          {data.yes.ordered && (
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <h4 className="font-bold">Ordered (YES)</h4>
              {Object.entries(data.yes.ordered).map(
                ([price, orderData]: any) => (
                  <div key={price} className="mb-2">
                    <p>Price: {price}</p>
                    <p>Total Quantity: {orderData.total}</p>
                  </div>
                )
              )}
            </div>
          )}
          {data.no.ordered && (
            <div className="mt-4 p-4 bg-red-100 rounded-lg">
              <h4 className="font-bold">Ordered (NO)</h4>
              {Object.entries(data.no.ordered).map(
                ([price, orderData]: any) => (
                  <div key={price} className="mb-2">
                    <p>Price: {price}</p>
                    <p>Total Quantity: {orderData.total}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PortfolioPage;
