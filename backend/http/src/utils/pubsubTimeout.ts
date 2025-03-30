import { sub } from "..";

export const handlePubSubWithTimeout = (
  uid: string,
  timeoutMs: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const channel = `response.${uid}`;

    const timeout = setTimeout(() => {
      sub.unsubscribe(channel);
      reject(new Error("Response timed out"));
    }, timeoutMs);

    sub.subscribe(channel, (data) => {
      clearTimeout(timeout);
      sub.unsubscribe(channel);
      resolve(data);
    });
  });
};
