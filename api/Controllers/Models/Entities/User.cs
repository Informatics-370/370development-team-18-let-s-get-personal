using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class User
  {
    [Key]
    public Guid User_ID { get; set; }
    public virtual User_Role User_Role { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
  }
}
