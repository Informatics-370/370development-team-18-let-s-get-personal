using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Delivery
  {
    [Key]
    public Guid Delivery_ID { get; set; }
    public virtual Delivery_Company Delivery_Company { get; set; }
    public virtual Address Delivery_Address { get; set; }
    public double Delivery_Price { get; set; }
    public int Tracking_Number { get; set; }
  }
}
