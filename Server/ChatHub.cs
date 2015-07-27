using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace Chatter.Server
{
        public void SendMessage(string userName, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(userName, message);
        }

        public void JoinUser(string userName)
        {
            if (MessageBroker.AddUser(userName))
            {
                // Call the broadcastUserJoined method to update clients.
                Clients.All.broadcastUserJoined(userName);
            }
        }

        public void ActiveUsers()
        {
            var users = String.Join(", ", MessageBroker.Users);
            Clients.Caller.broadcastActiveUsers(users);
        }
}
