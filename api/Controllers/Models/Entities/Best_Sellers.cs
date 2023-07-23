using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Best_Sellers
  {
    [Key]
    public Guid Best_Sellers_List_ID { get; set; }
    public virtual Stock_Item Item1 { get; set; }
    public virtual Stock_Item Item2 { get; set; }
    public virtual Stock_Item Item3 { get; set; }
    public virtual Stock_Item Item4 { get; set; }
    public virtual Stock_Item Item5 { get; set; }
  }
}
