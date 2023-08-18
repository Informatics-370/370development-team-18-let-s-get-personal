using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Order_Line_Item
    {
        [Key]
        public Guid Order_Line_Item_ID { get; set; }

        [ForeignKey(nameof(Order_Request_ID))]
        public Guid Order_Request_ID { get; set; }

        [ForeignKey(nameof(Personalisation_ID))]
        public Guid Personalisation_ID { get; set; }

        public string Order_Status { get; set; }
        public int Order_Line_Item_Quantity { get; set; }
        public double Order_Line_Item_Total_Price { get; set; }

        //public virtual Order_Request Order_Request { get; set; }
        //public virtual Personalisation_Design Personalisation_Design { get; set; }

        //public virtual ICollection<Order> Order { get; set; }
    }
}
