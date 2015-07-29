using System;
using System.Collections.Generic;
using System.Linq;

namespace Chatter.Server
{
   public static class ChatManager
   {
      private static readonly object AddLock = new object();

      public static ICollection<string> Users;
      public static List<ChatMessage> ChatMessages;

      static ChatManager()
      {
         Users = new List<string>();
         ChatMessages = new List<ChatMessage>();
      }

      public static bool AddUser(string userName)
      {
         lock (AddLock)
         {
            if (!Users.Contains(userName, StringComparer.OrdinalIgnoreCase))
            {
               Users.Add(userName);

               return true;
            }
         }

         return false;
      }

      //public static void LogChatMessage(string userName, string message)
      //{
      //   var chatMessage = new ChatMessage
      //   {
      //      Date = DateTime.Now,
      //      Message = message,
      //      UserName = userName
      //   };

      //   ChatMessages.Add(chatMessage);
      //}
   }
}