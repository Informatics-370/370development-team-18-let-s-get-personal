using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class EmployeeViewModel
  {
    [Key]
    public Guid Employee_ID { get; set; }
    public virtual Title Title { get; set; }
    public virtual Address Address { get; set; }
    public virtual User User { get; set; }
    [StringLength(255)]
    public string FirstName { get; set; }
    [StringLength(255)]
    public string Surname { get; set; }
    [StringLength(13)]
    public string Cell_Number { get; set; }
    [StringLength(255)]
    public string Email { get; set; }
  }
}
