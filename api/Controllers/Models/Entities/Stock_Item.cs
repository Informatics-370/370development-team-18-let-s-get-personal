using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Item
  {
    [Key]
    public Guid Stock_Item_ID { get; set; }
    public virtual Stock_Type Stock_Type_Name { get; set; }
    public virtual Stock_Image Stock_Image_ID { get; set; }
    public virtual Stock_Item_Colour Stock_Item_Colour { get; set; }
    [StringLength(255)]
    public string Stock_Item_Name { get; set; }
  }
}
