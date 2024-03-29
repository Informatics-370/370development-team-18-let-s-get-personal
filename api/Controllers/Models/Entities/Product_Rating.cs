using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Product_Rating
  {
    [Key]
    public Guid Product_Rating_ID { get; set; }
    public virtual Customer Customer_ID { get; set; }
    public virtual Stock_Item Stock_Item_ID { get; set; }
    public int Product_Star_Rating { get; set; }
    [StringLength(255)]
    public string Product_Rating_Comments { get; set; }
  }
}
