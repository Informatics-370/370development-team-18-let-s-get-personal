using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Design_Image_Line_Item
  {
    [Key]
    public Guid Design_Image_Line_Item_ID { get; set; }
    public virtual Design_Image Design_Image_ID { get; set; }
    public virtual Image Image_ID { get; set; }
  }
}
