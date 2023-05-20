using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Type
  {
    [Key]
    public Guid Stock_Type_ID { get; set; }
    [StringLength(255)]
    public string Stock_Type_Name { get; set; }
  }
}
