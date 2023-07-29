using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Invoice_Discount
  {
    [Key]
    public int Invoice_Discount_ID { get; set; }
    public virtual Discount Discount { get; set; }
    [StringLength(255)]
    public string Discount_Reason { get; set; }
  }
}
