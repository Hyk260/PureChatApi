const { service } = require("../../http/rest-api");
const { randomInt32, buildURL } = require("./utils");
// 查询帐号[{UserID: userid}]
const accountCheck = async (params) => {
  try {
    const result = await service({
      url: buildURL("v4/im_open_login_svc/account_check"),
      method: "post",
      data: {
        CheckItem: params,
      },
    });
    const { ErrorCode, ErrorInfo, ResultItem } = result;
    if (ErrorCode !== 0) return ErrorInfo;
    const flag = ResultItem[0].AccountStatus == "Imported";
    return flag;
  } catch (error) {
    return false;
  }
};
// 导入单个账号
const accountImport = async (params) => {
  try {
    const result = await service({
      url: buildURL("v4/im_open_login_svc/account_import"),
      method: "post",
      data: {
        ...params,
        // UserID,
        // Nick,
        // FaceUrl,
      },
    });
    const { ErrorCode } = result;
    if (ErrorCode !== 0) return ErrorInfo;
    return result;
  } catch (error) {
    console.log(error);
  }
};
// 单发单聊消息
const restSendMsg = async (params) => {
  const { From_Account, To_Account, Text } = params;
  const result = await service({
    url: buildURL("v4/openim/sendmsg"),
    method: "post",
    data: {
      SyncOtherMachine: 1, // 消息同步1 不同步 2
      From_Account,
      To_Account,
      // MsgSeq: "",
      MsgRandom: randomInt32(),
      ForbidCallbackControl: [
        "ForbidBeforeSendMsgCallback",
        "ForbidAfterSendMsgCallback",
      ], // 禁止回调控制选项
      MsgBody: [
        {
          MsgType: "TIMTextElem",
          MsgContent: {
            Text,
          },
        },
      ],
    },
  });
  console.log(result, "restSendMsg");
  return result;
};
// 在群组中发送普通消息
const sendGroupMsg = async (params) => {
  const { GroupId, Text, id } = params;
  const nick = await getPortrait({ id });
  const result = await service({
    url: buildURL("v4/group_open_http_svc/send_group_msg"),
    method: "post",
    data: {
      GroupId,
      Random: randomInt32(), // 随机数字，五分钟数字相同认为是重复消息
      From_Account: "@RBT#001", // 指定消息发送者（选填）
      MsgBody: [
        // 消息体，由一个 element 数组组成，详见字段说明
        {
          MsgType: "TIMTextElem", // 文本
          MsgContent: {
            Text: `@${nick} ${Text}`,
          },
        },
      ],
      GroupAtInfo: [
        // {
        //     "GroupAtAllFlag":1 //为1表示@all
        // },
        {
          GroupAtAllFlag: 0, // 为0表示@某个群成员
          GroupAt_Account: id,
        },
      ],
      // CloudCustomData: "your cloud custom data",
    },
  });
  return result;
};
// 解散群组
const destroyGroup = async (groupId) => {
  const result = await service({
    url: buildURL("v4/group_open_http_svc/destroy_group"),
    method: "post",
    data: {
      GroupId: groupId,
    },
  });
  return result;
};
// 拉人入群
const addGroupMember = async (params) => {
  const { groupId, member } = params;
  const result = await service({
    url: buildURL("v4/group_open_http_svc/add_group_member"),
    method: "post",
    data: {
      GroupId: groupId,
      MemberList: [{ Member_Account: member }],
    },
  });
  return result;
};
// 创建机器人
const createRobot = async () => {
  const result = await service({
    url: buildURL("v4/openim_robot_http_svc/create_robot"),
    method: "post",
    data: {
      UserID: "@RBT#001",
      Nick: "",
      FaceUrl: "",
      SelfSignature: "",
    },
  });
  return result;
};
// 拉取运营数据
const getappInfo = async () => {
  const result = await service({
    url: buildURL("v4/openconfigsvr/getappinfo"),
    method: "post",
    data: {},
  });
  return result;
};
// 修改单聊历史消息
const modifyC2cMsg = async (params) => {
  const { From_Account, To_Account, MsgKey, MsgBody, message } = params;
  const result = await service({
    url: buildURL("v4/openim/modify_c2c_msg"),
    method: "post",
    data: {
      From_Account: To_Account,
      To_Account: From_Account,
      MsgKey,
      MsgBody: [
        {
          MsgType: "TIMTextElem",
          MsgContent: {
            Text: message,
          },
        },
      ],
    },
  });
  return result;
};
// 拉取单聊历史消息
const adminGetroammsg = async (params) => {
  const { From_Account, To_Account } = params;
  const maxTime = Math.floor(Date.now() / 1000);
  const minTime = maxTime - 20;
  const result = await service({
    url: buildURL("v4/openim/admin_getroammsg"),
    method: "post",
    data: {
      Operator_Account: To_Account,
      Peer_Account: From_Account,
      MaxCnt: 10,
      MinTime: minTime,
      MaxTime: maxTime,
    },
  });
  return result;
};
// 拉取资料
const getPortrait = async (params) => {
  const { id } = params;
  const result = await service({
    url: buildURL("v4/profile/portrait_get"),
    method: "post",
    data: {
      To_Account: [id],
      TagList: ["Tag_Profile_IM_Nick"],
    },
  });
  return result.UserProfileItem[0].ProfileItem[0].Value;
};
// 创建公众号
const createOfficialAccount = async (params) => {
  const result = await service({
    url: buildURL("v4/official_account_open_http_svc/create_official_account"),
    method: "post",
    data: {
      OfficialAccountUserID: "@TOA#_test_id", // 自定义公众号ID的前缀必须是@TOA#_
      Owner_Account: "",
      CustomString: "",
      FaceUrl:
        "https://ljx-1307934606.cos.ap-beijing.myqcloud.com/official_account.png",
      Introduction: "公众号简介", // 公众号简介
      // MaxSubscriberNum: 1000, // 最大可订阅人数
      Name: "公众号",
      Organization: "", // 公众号所属的团体组织
    },
  });
  return result;
};
// 获取 App 中的所有群组
const getAppidGroupList = async () => {
  const result = await service({
    url: buildURL("v4/group_open_http_svc/get_appid_group_list"),
    method: "post",
    data: {
      Limit: 1000,
      Next: 0,
    },
  });
  return result;
};
// 获取群详细资料
const getGroupInfo = async (params) => {
  const result = await service({
    url: buildURL("v4/group_open_http_svc/get_group_info"),
    method: "post",
    data: {
      GroupIdList: params, // [ "@TGS#1NVTZEAE4", "@TGS#1CXTZEAET" ],
    },
  });
  return result;
};

const fun = {
  accountImport,
  getPortrait,
  restSendMsg,
  sendGroupMsg,
  accountCheck,
  // destroyGroup,
  createOfficialAccount,
  addGroupMember,
  getappInfo,
  createRobot,
  modifyC2cMsg,
  adminGetroammsg,
  getAppidGroupList,
  getGroupInfo,
};

const restApi = async (req, res) => {
  const data = req.body;
  console.log("入参 restApi", data);
  const { params, funName = "" } = data;
  try {
    const result = await fun[funName](params);
    console.log(`出参 restApi:${funName}`, result);
    res.send(result);
  } catch (error) {
    res.send("error");
  }
};

module.exports = { restApi, ...fun };
