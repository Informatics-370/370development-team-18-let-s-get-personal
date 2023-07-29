using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Basket
    {
        [Key]
        [Column("Basket_ID")]
        public int Basket_ID { get; set; }

        [Column("Basket_Quantity")]
        public int Basket_Quantity { get; set; }

        //stock item foreign key
        [Column("Stock_Item_ID")]
        public int? Stock_Item_ID { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        [InverseProperty("Basket")]
        public virtual Stock_Item Stock_Item { get; set; }

        //stock image foreign key
        [Column("Stock_Image_ID")]
        public int Stock_Image_ID { get; set; }

        [ForeignKey(nameof(Stock_Image_ID))]
        [InverseProperty("Basket")]
        public virtual Stock_Image Stock_Images { get; set; }

        //Customer foreign key
        [Column("Customer_ID")]
        public int? Customer_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        [InverseProperty("Basket")]
        public virtual Customer Customer { get; set; }

        

        

    }
}
