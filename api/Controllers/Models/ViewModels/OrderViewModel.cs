using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class OrderViewModel
  {
    public virtual Order_Request Order_Request { get; set; }
    public virtual Order_Status Order_Status { get; set; }
  }
}
