using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Order
    {
        [Key]
        public Guid Order_ID { get; set; }

        public int Order_Quantity { get; set; }

        public DateTime Order_Completed_Date { get; set; }

        //Foreign Keys
        [ForeignKey(nameof(Customer_ID))]
        public Guid Customer_ID { get; set; }
        

        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }

        public string Stock_Item_Name { get; set; }
    }
}
