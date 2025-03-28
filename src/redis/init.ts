import Redis, { RedisOptions } from "ioredis";
import options from "../config";

const redis = new Redis({
  port: Number(options.redis.port), // 端口号
  host: options.redis.host, // ip
  username: options.redis.username,
  password: options.redis.password,
  connectTimeout: 10000,
  db: 0,
});

// 连接成功时的回调
redis.on("connect", () => {
  console.log("Redis连接成功");
});

// 连接错误时的回调
redis.on("error", (err) => {
  console.error("Redis连接错误" + err);
  redis.quit();
});

export default redis;
