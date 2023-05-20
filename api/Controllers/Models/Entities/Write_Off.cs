using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Write_Off
  {
    [Key]
    public Guid Write_Off_ID { get; set; }
    public virtual Employee Employee_ID { get; set; }
    public DateTime Write_Off_Date { get; set; }
  }
}
