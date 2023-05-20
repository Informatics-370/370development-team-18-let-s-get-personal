using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Order_Request
  {
    [Key]
    public Guid Order_Request_ID { get; set; }
    public virtual Customer Customer_ID { get; set; }
    public DateTime Order_Request_Date { get; set; }
    public decimal Order_Request_Total_Price {get; set; }
    public bool IsAccepted { get; set; }
  }
}
