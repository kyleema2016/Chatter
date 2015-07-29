using System;
using Microsoft.AspNet.SignalR;

namespace Chatter.Server
{
   public class ChatHub : Hub
   {
      public void SendMessage(string userName, string message)
      {
         // Call the broadcastMessage method to update clients.
         Clients.All.broadcastMessage(userName, message);
      }

      public void JoinUser(string userName)
      {
         if (ChatManager.AddUser(userName))
         {
            // Call the broadcastUserJoined method to update clients.
            Clients.All.broadcastUserJoined(userName);
         }
      }

      public void ActiveUsers()
      {
         var users = String.Join(", ", ChatManager.Users);
         Clients.Caller.broadcastActiveUsers(users);
      }
   }
}
