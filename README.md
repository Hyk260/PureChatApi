# pure-backend

PureChat Node.js API service

# 开发
- src/db/userCopy.json 添加用户信息 测试账号默认密码123456 username为用户名 与腾讯im userID一致
- 注册用户账号 https://console.cloud.tencent.com/im/account-management
- 获取腾讯im sdkappid && appkey 配置到 .env （带*为必填项）
- 启动 npm run dev

# 部署
- vercel login：登录 Vercel 账号
- vercel dev：本地开启服务
- vercel dev --bug：本地开启服务并打印日志
- vercel：部署本地资源到 Vercel 上
- vercel --prod：更新本地网页