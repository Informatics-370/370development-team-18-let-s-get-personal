using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{

    public class Inventory_Line_Item
    {
        [Key]
        public Guid Inventory_Line_Item_ID { get; set; }

        public int  Inventory_Line_Quantity { get; set; }

        public Guid Inventory_ID { get; set; }
        public Inventory Inventory { get; set; }

        public Guid Stock_Item_ID { get; set; }
        public Stock_Item Stock_Item { get; set; }
    }
}
