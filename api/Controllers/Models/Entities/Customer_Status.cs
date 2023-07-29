using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Customer_Status
  {
    [Key]
    public int Customer_Status_ID { get; set; }
    [StringLength(255)]
    public string Status_Description { get; set; }
  }
}
