using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class StockItemColourViewModel
  {
    public Guid Stock_Item_Colour_ID { get; set; }
    [StringLength(255)]
    public string Stock_Item_Colour_Name { get; set; }
  }
}
