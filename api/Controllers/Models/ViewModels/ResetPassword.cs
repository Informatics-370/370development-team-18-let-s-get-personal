using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class ResetPassword
  {
    [Required]
    public string Password { get; set; } = null!;
    [Compare("Password",
      ErrorMessage = "The password and confirm password do not match. Please re-type your new password.")]
    public string ConfirmPassword { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Token {get; set; } = null!;
  }
}
