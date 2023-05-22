using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class User_Role
  {
    [Key]
    public Guid User_Role_ID { get; set; }
    [StringLength(255)]
    public string User_Role_Name { get; set; }
  }
}
