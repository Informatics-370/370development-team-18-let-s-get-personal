using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Payment
  {
    [Key]
    public Guid Payment_ID { get; set; }
    public virtual Invoice Invoice_ID { get; set; }
    public decimal Payment_Amount { get; set; }
  }
}
