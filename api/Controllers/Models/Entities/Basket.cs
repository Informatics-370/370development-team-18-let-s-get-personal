using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Basket
    {
        [Key]
        [Column("Basket_ID")]
        public Guid Basket_ID { get; set; }

        [Column("Basket_Quantity")]
        public int Basket_Quantity { get; set; }

        //stock item foreign key
        public Guid? Stock_Item_ID { get; set; }
        public virtual Stock_Item Stock_Item { get; set; }

        //Customer foreign key
        public Guid? Customer_ID { get; set; }
        public virtual Customer Customer { get; set; }

        //public virtual ICollection<Customer> Customer { get; set; }
        
    }
}

