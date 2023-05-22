using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Gender
  {
    [Key]
    public Guid Gender_ID { get; set; }
    [StringLength(255)]
    public string Gender_Name { get; set; }
  }
}
