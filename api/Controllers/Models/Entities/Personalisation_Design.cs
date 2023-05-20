using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Personalisation_Design
  {
    [Key]
    public Guid Personalisation_Design_ID { get; set; }
    public virtual Design_Image Design_Image { get; set; }
    public virtual Design_Text Design_Text { get; set; }
    public double Personalisation_Design_Price { get; set; }
  }
}
