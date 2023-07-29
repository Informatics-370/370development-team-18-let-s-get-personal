using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Design_Price_History
  {
    [Key]
    public int Design_Price_History_ID { get; set; }
    public double Design_Price_Pixel_Amount {get; set; }
    public DateTime Effective_From_Date { get; set; }
    public DateTime Effective_To_Date { get; set; }
  }
}
