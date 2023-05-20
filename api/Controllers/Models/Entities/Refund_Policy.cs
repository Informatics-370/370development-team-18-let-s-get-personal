using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Refund_Policy
  {
    [Key]
    public Guid Refund_Policy_ID { get; set; }
    public DateTime Refund_Policy_Date { get; set; }
    public int Refund_Policy_Version { get; set; }
  }
}
