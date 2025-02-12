const { storeUsers } = require("../../redis");
const { accountImport, accountCheck } = require("../../api/rest-api");

async function registerAccount({ user, nick = "", avatar = "" }) {
  console.log({ UserID: user });
  // 查询im账号
  const account = await accountCheck([{ UserID: user }]);
  console.log("account", account);
  // 注册im账号
  if (!account) {
    await accountImport({ UserID: user, Nick: nick, FaceUrl: avatar });
  }
}

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("register", `user=${username}`, `password=${password}`);
    if (!username || !password) {
      return res.status(400).json({ code: 400, msg: "请求不合法" });
    }
    await registerAccount({ user: username });
    try {
      const msg = await storeUsers({ username, password });
      res.json({ code: 200, msg });
    } catch (error) {
      res.json({ code: 400, msg: "err" });
    }
  } catch (error) {
    console.error("接口错误:", error);
  }
};
module.exports = { register, registerAccount };
