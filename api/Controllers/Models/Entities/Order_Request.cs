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
        public Guid? Customer_ID { get; set; }
        public virtual Customer Customer { get; set; }

        //invoice fk
        public Guid? Invoice_ID { get; set; }
        public virtual Invoice Invoice { get; set; }

        //invoice fk
        public Guid? Delivery_Address_ID { get; set; }
        public virtual Delivery_Address Delivery_Address { get; set; }
    }
}
