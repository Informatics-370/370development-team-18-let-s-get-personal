using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Inventory
  {
    [Key]
    public Guid Inventory_ID { get; set; }
    public DateTime Inventory_Date { get; set; }
    [StringLength(255)]
    public string Inventory_Comments { get; set; }
  }
}
