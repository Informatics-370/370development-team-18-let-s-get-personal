using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Experience_Rating
  {
    [Key]
    public int Experience_Rating_ID { get; set; }
    public virtual Customer Customer { get; set; }
    public int Experience_Star_Rating { get; set; }
    [StringLength(255)]
    public string Experience_Rating_Comments { get; set; }
  }
}
