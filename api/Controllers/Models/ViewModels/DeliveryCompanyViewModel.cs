using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class DeliveryCompanyViewModel
  {
    public Guid Delivery_Company_ID { get; set; }
    [StringLength(255)]
    public string Delivery_Company_Name { get; set; }
  }
}
