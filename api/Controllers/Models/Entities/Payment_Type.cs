using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Payment_Type
  {
    [Key]
    public Guid Payment_Type_ID { get; set; }
    [StringLength(255)]
    public string Payment_Type_Name { get; set; }
  }
}
