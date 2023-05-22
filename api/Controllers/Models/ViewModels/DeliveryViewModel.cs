using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class DeliveryViewModel
  {
    public Guid Delivery_ID { get; set; }
    public virtual Delivery_Company Delivery_Company_ID { get; set; }
    public virtual Address Delivery_Address { get; set; }
    public decimal Delivery_Price { get; set; }
    public int Tracking_Number { get; set; }
  }
}
