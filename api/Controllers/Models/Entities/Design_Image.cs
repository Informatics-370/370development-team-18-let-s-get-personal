using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Design_Image
  {
    [Key]
    public Guid Design_Image_ID { get; set; }
    public virtual Design_Price_History Design_Price_Pixel_Amount { get; set; }
    public int Design_Image_Size { get; set; }
  }
}
