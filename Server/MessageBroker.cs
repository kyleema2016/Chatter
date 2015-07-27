using System.Collections.Generic;

namespace Netricity.Chatter.Server
{
    public static class MessageBroker
    {
        public static List<string> Messages = new List<string>();
        public static List<string> Users = new List<string>();

        public static bool AddUser(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName) || Users.Contains(userName))
                return false;

            Users.Add(userName);

            return true;
        }
    }
}
