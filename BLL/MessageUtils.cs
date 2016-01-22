using LayIM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace LayIM.BLL
{
    /// <summary>
    /// 聊天工具帮助类
    /// </summary>
    public class MessageUtils
    {
        /// <summary>
        /// 根据两个用户ID得到对应的组织名称
        /// </summary>
        /// <param name="sendid">发送人（主动联系人）</param>
        /// <param name="receiveid">接收人（被动联系人）</param>
        /// <returns></returns>
        public static string GetGroupName(string sendid, string receiveid)
        {
            /*
                排序的目的就是为了保证，无论谁连接服务器，都能得到正确的组织ID
            */
            int compareResult = string.Compare(sendid, receiveid);
            if (compareResult > 0) {
                //重新排序 如果sendid>receiveid
                return string.Format("G{0}{1}", receiveid, sendid);
            }
            return string.Format("G{0}{1}", sendid, receiveid);
        }

        #region 消息处理

        public static CSUser GetSystemUser(string groupName)
        {
            return new CSUser(groupName,"")
            {
                photo = "/photos/sys.png",
                userid = 0,
                username = "系统提示"
            };
        }
        /// <summary>
        /// 获取系统消息
        /// </summary>
        /// <param name="groupName"></param>
        /// <param name="msg"></param>
        /// <returns></returns>
        public static CSChatMessage GetSystemMessage(string groupName, string msg,object other =null)
        {
            CSChatMessage chatMsg = new CSChatMessage
            {
                fromuser = GetSystemUser(groupName),
                msg = msg,
                msgtype = CSMessageType.System,
                other = other
            };
            return chatMsg;
        }

        #endregion

        /// <summary>
        /// 序列化方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public static string ScriptSerialize<T>(T t)
        {
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            return serializer.Serialize(t);
        }
    }
}