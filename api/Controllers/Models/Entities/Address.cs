using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Address
  {
    [Key]
    public Guid Address_ID { get; set; }
    public virtual Province Province_Name {get; set; }
    public virtual City City_Name { get; set; }
    [StringLength(255)]
    public string Street { get; set; }
    public int Number { get; set; }
    [StringLength(255)]
    public string Dwelling_Type { get; set; }
    public int Unit_Number { get; set; }
    public int Area_Code { get; set; }
  }
}
