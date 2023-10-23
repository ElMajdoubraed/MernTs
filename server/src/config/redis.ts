import * as redis from "redis";

const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});

redisClient.on("connect", () => {
  console.log("\x1b[36m%s\x1b[0m", "Connected to redis!");
});

redisClient.on("ready", () => {
  console.log("Client Connected to redis and ready to use ...");
});

redisClient.on("error", (err) => {
  console.log("err Redis " + err.message);
});

module.exports = redisClient;
