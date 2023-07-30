using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Permission
  {
    [Key]
    public Guid Permission_ID {get; set; }
    [StringLength(255)]
    public string Permission_Name { get; set; }
  }
}
