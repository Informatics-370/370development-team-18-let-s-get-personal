using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Refund_Reason
  {
    [Key]
    public Guid Refund_Reason_ID { get; set; }
    [StringLength(255)]
    public string Refund_Reason_Description { get; set; }
  }
}
