using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class City
  {
    [Key]
    public Guid City_ID { get; set; }
    public virtual Province Province_ID { get; set; }
    [StringLength(255)]
    public string City_Name { get; set; }
  }
}
