using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Order_Status
  {
    [Key]
    public Guid Order_Status_ID { get; set; }
    [StringLength(255)]
    public string Order_Status_Description { get; set; }
  }
}
