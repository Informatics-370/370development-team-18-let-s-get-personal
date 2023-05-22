using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Invoice
  {
    [Key]
    public Guid Invoice_ID { get; set; }
    public virtual Customer Customer_ID { get; set; }
    public virtual Employee Employee_ID { get; set; }
    public virtual Invoice_Discount Invoice_Discount_ID { get; set; }
    public decimal Delivery_Price { get; set; }
    public decimal Invoice_Total_exclVAT { get; set; }
    public decimal Invoice_Total_VAT { get; set; }
    public decimal Invoice_Total_inclVAT { get; set; }
  }
}
