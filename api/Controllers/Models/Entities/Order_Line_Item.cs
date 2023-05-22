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
    public virtual Write_Off Write_Off_ID { get; set; }
    public virtual Order_Request Order_Request_ID { get; set; }
    public virtual Stock_Item Stock_Item_ID { get; set; }
    public virtual Personalisation_Design Personalisation_Design_ID { get; set; }
    public decimal Order_Line_Item_Price { get; set; }
    public int Order_Line_Item_Quantity { get; set; }
    public decimal Order_Line_Item_Total_Price { get; set; }
  }
}
