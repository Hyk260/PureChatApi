export const configuration = () => {
  return {
    port: process.env.PORT,
    host: process.env.HOST,
    nodeEnv: process.env.NODE_ENV,
    isDev: process.env.NODE_ENV === "development",
    jwtSecret: process.env.JWT_SECRET || "",
    // jwt过期时间
    expireTime: 86400 * 14,
    // jwt算法 HS256
    jwtAlgorithm: process.env.JWT_ALGO || "HS256",
    // im app管理员id
    administrator: process.env.ADMIN_ISTRATOR || '',
    // im sdk
    imAppId: process.env.IM_SDK_APPID || "",
    imAppKey: process.env.IM_SDK_KEY || "",
    imServerBaseUrl: process.env.IM_SERVER_BASE_URL || "",
    // cos
    bucket: "ljx-1307934606", // 存储桶的名称
    region: "ap-beijing", // 存储桶所在地域
    secretId: process.env.SecretId,
    secretKey: process.env.SecretKey,
    options: {
      dataBaseMode: process.env.DATA_BASE_MODE || 'cloudRedis' // lowdb localRedis cloudRedis
    },
    github: {
      // web
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
      // electron
      clientIdApp: process.env.CLIENT_ID_APP || "",
      clientSecretApp: process.env.CLIENT_SECRET_APP || "",
    },
    logs: {
      level: process.env.LOG_LEVEL || "silly",
    },
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || "127.0.0.1",
      charset: "utf8_general_ci",
      username: process.env.REDIS_USER || "",
      password: process.env.REDIS_PASS || "",
    },
    api: {
      prefix: "/api",
    },
    // jwt免token白名单接口
    authOrity: [
      "/rest-api",
      "/market",
      "/login",
      "/register",
      "/test",
      "/auth/github",
      "/auth/github/callback",
      "/v1/chat/completions",
    ],
  }
}

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  nodeEnv: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === "development",
  jwtSecret: process.env.JWT_SECRET || "",
  // jwt过期时间
  expireTime: 86400 * 14,
  // jwt算法 HS256
  jwtAlgorithm: process.env.JWT_ALGO || "HS256",
  // im app管理员id
  administrator: process.env.ADMIN_ISTRATOR || '',
  // im sdk
  imAppId: process.env.IM_SDK_APPID || "",
  imAppKey: process.env.IM_SDK_KEY || "",
  imServerBaseUrl: process.env.IM_SERVER_BASE_URL || "",
  // cos
  bucket: "ljx-1307934606", // 存储桶的名称
  region: "ap-beijing", // 存储桶所在地域
  secretId: process.env.SecretId,
  secretKey: process.env.SecretKey,
  options: {
    dataBaseMode: process.env.DATA_BASE_MODE || 'cloudRedis' // lowdb localRedis cloudRedis
  },
  github: {
    // web
    clientId: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    // electron
    clientIdApp: process.env.CLIENT_ID_APP || "",
    clientSecretApp: process.env.CLIENT_SECRET_APP || "",
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
    charset: "utf8_general_ci",
    username: process.env.REDIS_USER || "",
    password: process.env.REDIS_PASS || "",
  },
  api: {
    prefix: "/api",
  },
  // jwt免token白名单接口
  authOrity: [
    "/rest-api",
    "/market",
    "/login",
    "/register",
    "/test",
    "/auth/github",
    "/auth/github/callback",
    "/v1/chat/completions",
  ],
};
