using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Employee
  {
    [Key]
    public Guid Employee_ID { get; set; }
    public virtual Title Title { get; set; }
    public virtual Gender Gender { get; set; }
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
