"use server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getAllSymbol = async () => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/symbol/all`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInrBalance = async () => {
  const session = await getServerSession(authOptions as any);
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/balance/inr/${session?.user?.email}`
    );
    console.log(session);
    console.log("________", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const buyStock = async (
  stockSymbol: string,
  quantity: number,
  price: number,
  stockType: "yes" | "no"
) => {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const response = await axios.post(`${process.env.BACKEND_URL}/order/buy`, {
      userId: session.user.email, // Use email as userId
      stockSymbol,
      quantity,
      price,
      stockType,
    });

    return response.data;
  } catch (error) {
    console.error("Error buying stock:", error);
    throw new Error("Failed to buy stock");
  }
};

export const sellStock = async (
  stockSymbol: string,
  quantity: number,
  price: number,
  stockType: "yes" | "no"
) => {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session?.user?.email) {
      throw new Error("User not authenticated");
    }

    const response = await axios.post(`${process.env.BACKEND_URL}/order/sell`, {
      userId: session.user.email, // Use email as userId
      stockSymbol,
      quantity,
      price,
      stockType,
    });

    return response.data;
  } catch (error) {
    console.error("Error selling stock:", error);
    throw new Error("Failed to sell stock");
  }
};

export const getStockBalance = async () => {
  const session = await getServerSession(authOptions as any);
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/balance/stock/${session?.user?.email}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
