import { INR_BALANCE } from "../types";

export const getInrBalance = async (userId: string) => {
  if (!INR_BALANCE[userId]) {
    return { error: "User not found" };
  }
  console.log("the inr balance is ", INR_BALANCE[userId]);
  return {
    ...INR_BALANCE[userId],
  };
};
