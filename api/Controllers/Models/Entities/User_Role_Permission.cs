using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class User_Role_Permission
  {
    [Key]
    public int User_Role_Permission_ID { get; set; }
    public virtual User_Role User_Role { get; set; }
    public virtual Permission Permission { get; set; }
  }
}
