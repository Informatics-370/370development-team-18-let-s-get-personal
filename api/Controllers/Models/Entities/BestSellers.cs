using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class BestSellers
    {
        public BestSellers() {
            
        }

        [Key]
        [Column("BestSeller_ID")]
        public Guid BestSeller_ID { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }

    }
}
