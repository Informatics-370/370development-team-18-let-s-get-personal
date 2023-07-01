using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Basket
    {
        public Basket() { }

        [Key]
        public Guid Basket_ID { get; set; }
        public int Basket_Quantity { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Stock_Item Stock_Item { get; set; }
        public virtual Stock_Type Stock_Type_Name { get; set; }
        public virtual Stock_Image Stock_Image_ID { get; set; }
        public virtual Stock_Item_Colour Stock_Item_Colour { get; set; }
        public virtual Personalisation_Design Personalisation_Design { get; set; }

        public string Stock_Item_Name { get; set; }
        public int Stock_Item_ID { get; set; }
        public int Customer_ID { get; set; }
    }
}
