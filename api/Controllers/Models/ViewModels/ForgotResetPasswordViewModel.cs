using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class ForgotResetPasswordViewModel
  {
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
  }
}
