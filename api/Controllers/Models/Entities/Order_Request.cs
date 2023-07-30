using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Order_Request
  {
        [Key]
        public Guid Order_Request_ID { get; set; }
        public DateTime Order_Request_Date { get; set; }
        public double Order_Request_Total_Price {get; set; }
        public bool IsAccepted { get; set; }

        //cutsomer fk
        [Column("Customer_ID")]
        public Guid? Customer_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        [InverseProperty("Order_Request")]
        public virtual Customer Customer { get; set; }

        //invoice fk
        [Column("Invoice_ID")]
        public Guid? Invoice_ID { get; set; }

        [ForeignKey(nameof(Invoice_ID))]
        [InverseProperty("Order_Request")]
        public virtual Invoice Invoice { get; set; }
    }
}
