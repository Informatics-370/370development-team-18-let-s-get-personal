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

        //Forign Keys
        [ForeignKey(nameof(Order_Line_Item_ID))]
        public Guid Order_Line_Item_ID { get; set; }

        public virtual Order_Line_Item Order_Line_Item { get; set; }
        //Attributes
        [StringLength(255)]
        public string Order_Notes { get; set; }

        public virtual ICollection<Invoice> Invoice { get; set; }
    }
}
