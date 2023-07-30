using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Design_Text
  {
    [Key]
    public Guid Design_Text_ID { get; set; }
    public virtual Design_Price_History Design_Price_Pixel_Amount { get; set; }
    public int Design_Text_Size { get; set; }
    [StringLength(255)]
    public string Design_Text_Description { get; set; }
  }
}
