using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.EmailInterface
{
  public class EmailService : IEmailService
  {
    private readonly EmailConfiguration _emailConfiguration;
    public EmailService(EmailConfiguration emailConfiguration)
    {
      _emailConfiguration = emailConfiguration;
    }
    public void SendEmail(Message message)
    {
      var emailMessage = CreateEmailMessage(message);
      Send(emailMessage);
    }

    private MailMessage CreateEmailMessage(Message message)
    {
      var emailMessage = new MailMessage(
        _emailConfiguration.From,
        message.To,
        message.Subject,
        message.Content );

      return emailMessage;
    }

    private void Send(MailMessage mailMessage)
    {
      using var client = new SmtpClient();
      try
      {
        client.UseDefaultCredentials = true;
        client.Send(mailMessage);
      }
      catch (Exception ex)
      {
        Console.WriteLine("Exception caught in CreateMessageWithAttachment(): {0}",
            ex.ToString());
      }
    }
  }
}
