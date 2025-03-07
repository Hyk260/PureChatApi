import { Request, Response } from 'express';

// 定义请求体的类型
interface MsgContent {
  Text: string; // 消息文本内容
}

interface MsgBody {
  MsgType: string; // 消息类型，例如：TIMTextElem
  MsgContent: MsgContent; // 消息内容
}

interface ImCallbackRequestBody {
  CallbackCommand: string; // 回调命令，例如：Bot.OnGroupMessage
  GroupId: string; // 群组 ID
  Type: string; // 群组类型
  From_Account: string; // 消息发送者
  Operator_Account: string; // 请求的发起者
  Random: number; // 随机数，用于请求的唯一性
  MsgSeq: number; // 消息的序列号
  MsgTime: number; // 消息的时间戳
  OnlineOnlyFlag: number; // 在线消息标志，为 1 时代表在线消息
  MsgBody: MsgBody[]; // 消息体，包含消息的具体内容
  AtRobots_Account: string[]; // 被 @ 的机器人列表
  CloudCustomData: string; // 额外的云端自定义数据
  EventTime: number; // 事件触发的时间戳（毫秒级别）
}

interface ImCallbackRequestQuery {
  CallbackCommand: string; // 回调命令
  ClientIP: string; // 客户端 IP 地址
  OptPlatform: string; // 客户端平台信息
  RequestId: string; // 请求唯一标识符
  SdkAppid: string; // SDK 应用 ID，在IM控制台中分配
  contenttype: string; // 请求内容类型
}

export const imCallback = (req: Request<{}, {}, ImCallbackRequestBody, ImCallbackRequestQuery>, res: Response) => {
  const body = req.body;
  const query = req.query;

  res.send({
    "ActionStatus": "OK",
    "ErrorInfo": "",
    "ErrorCode": 0
  });
}