using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Order_Line_Item
  {
    [Key]
    public Guid Order_Line_Item_ID { get; set; }
    public virtual Order_Request Order_Request { get; set; }
    public virtual Stock_Item Stock_Item { get; set; }
    public string Stock_Item_Size { get; set; }
    public virtual Personalisation_Design Personalisation_Design { get; set; }
    public double Order_Line_Item_Price { get; set; }
    public int Order_Line_Item_Quantity { get; set; }
    public double Order_Line_Item_Total_Price { get; set; }
  }
}
