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
    public class MessageUtilcs
    {
        public static void GetGroupName(string sendid, string receiveid)
        {
            
        }

        /// <summary>
        /// 序列化方法，（暂时放在这里）
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