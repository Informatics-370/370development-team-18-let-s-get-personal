using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class StockTypeViewModel
  {
    public Guid Stock_Type_ID { get; set; }
    [StringLength(255)]
    public string Stock_Type_Name { get; set; }
  }
}
