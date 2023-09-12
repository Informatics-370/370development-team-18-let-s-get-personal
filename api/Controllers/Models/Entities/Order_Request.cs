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

        //Foreign Keys
        [ForeignKey(nameof(Customer_ID))]
        public Guid Customer_ID { get; set; }

        [ForeignKey(nameof(Delivery_ID))]
        public Guid Delivery_ID { get; set; }

    }
}