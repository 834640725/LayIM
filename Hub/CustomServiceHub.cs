using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace LayIM
{
    [HubName("csHub")]
    public class CustomServiceHub : Hub
    {
        public Task Join()
        {
            return Clients.All.receiveMessage("某某人加入了");
        }

        public void ClientToClient(string sendid, string receiveid)
        {
            Groups.Add("", "");
            //return Clients.Caller
        }
    }
}