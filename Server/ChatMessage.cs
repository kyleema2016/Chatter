using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chatter.Server
{
   public class ChatMessage
   {
      public string UserName { get; set; }
      public string Message { get; set; }
      public DateTime Date { get; set; }
   }
}