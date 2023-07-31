using IPKP___API.Controllers.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.EmailInterface
{
  interface IEmailService
  {
    void SendEmail(Message message);
  }
}
