using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Title
  {
    [Key]
    public Guid Title_ID { get; set; }
    [StringLength(255)]
    public string Title_Name { get; set; }
  }
}
