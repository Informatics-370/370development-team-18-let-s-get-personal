using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Invoice
  {
        [Key]
        public Guid Invoice_ID { get; set; }
        public virtual Invoice_Discount Invoice_Discount { get; set; }
        public double Delivery_Price { get; set; }
        public double Invoice_Total_exclVAT { get; set; }
        public double Invoice_Total_VAT { get; set; }
        public double Invoice_Total_inclVAT { get; set; }

        [InverseProperty("Invoice")]
        public virtual ICollection<Order_Request> Order_Request { get; set; }
    }
}
