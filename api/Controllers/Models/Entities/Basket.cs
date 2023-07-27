using System.ComponentModel.DataAnnotations;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Basket
    {
        [Key]
        [Column("Basket_ID")]
        public Guid Basket_ID { get; set; }

        [Column("Basket_Quantity")]
        public int Basket_Quantity { get; set; }

        [Column("Stock_Item_ID")]
        public Guid? Stock_Item_ID { get; set; }

        [Column("Customer_ID")]
        public Guid? Customer_ID { get; set; }

        [Column("Stock_Image_ID")]
        public Guid Stock_Image_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        [InverseProperty("Basket")]
        public virtual Customer Customer { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        [InverseProperty("Basket")]
        public virtual Stock_Item Stock_Item { get; set; }

        [ForeignKey(nameof(Stock_Image_ID))]
        [InverseProperty("Basket")]
        public virtual Stock_Image Stock_Images { get; set; }

    }
}
