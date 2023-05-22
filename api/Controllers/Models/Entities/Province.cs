using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Province
  {
    [Key]
    public Guid Province_ID { get; set; }
    [StringLength(255)]
    public string Province_Name { get; set; }
  }
}
