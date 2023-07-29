using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Order
  {
    [Key]
    public int Order_ID { get; set; }
    public virtual Order_Request Order_Request { get; set; }
    public virtual Order_Status Order_Status { get; set; }

    [StringLength(255)]
    public string Order_Notes { get; set; }

    public DateTime Order_Date { get; set; }

  }
}
