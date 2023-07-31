using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class Message
  {
    public string To { get; set; }
    public string Subject { get; set; }
    public string Content { get; set; }
    public Message(string to, string subject, string content)
    {
      To = to;
      Subject = subject;
      Content = content;
    }
  }
}
