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
        public int BestSeller_ID { get; set; }

        [Column("Stock_Item_ID")]
        public int Stock_Item_ID { get; set; }

        //[ForeignKey(nameof(Stock_Item_ID))]
        [InverseProperty("BestSellers")]
        public virtual ICollection<Stock_Item> Stock_Item { get; set; }




        //[StringLength(255)]
        //public string Stock_Item_Name { get; set; }
        //public Stock_Item Stock_Item { get; set; }
        ////public virtual Stock_Image Stock_Image { get; set; }
        ////public List<Stock_Image> Stock_Image { get; set; } = new List<Stock_Image>();
        //public virtual Stock_Item_Colour Stock_Item_Colour { get; set; }
    }
}
