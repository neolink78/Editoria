// import { RedisClientType } from "@redis/client";
// import { createClient } from "redis";

// let cacheClient: RedisClientType;

// export const getCache = async () => {
//   if (!cacheClient) {
//     cacheClient = createClient({ url: process.env.CACHE_URL });
//     await cacheClient.connect();
//   }
//   return cacheClient;
// };

import { RedisClientType, createClient } from "redis";

let cacheClient: RedisClientType;

export const getCache = async () => {
  if (!cacheClient) {
    cacheClient = createClient({ url: process.env.CACHE_URL });

    cacheClient.on("connect", () => {
      console.log("🚀 Redis client connected");
    });

    cacheClient.on("error", (err) => {
      console.error("Redis client error:", err);
    });

    await cacheClient.connect();
  }
  return cacheClient;
};
