using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Refund
  {
    [Key]
    public Guid Refund_ID { get; set; }
    public virtual Customer Customer { get; set; }
    public virtual Refund_Policy Refund_Policy { get; set; }
    [StringLength(255)]
    public string Refund_Comment { get; set; }
  }
}
