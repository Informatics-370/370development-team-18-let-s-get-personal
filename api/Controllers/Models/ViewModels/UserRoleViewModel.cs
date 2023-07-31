using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class UserRoleViewModel
  {
    public int User_Role_ID { get; set; }
    [StringLength(255)]
    public string User_Role_Name { get; set; }
  }
}
