using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.Entities
{
    public class BestSellers
    {
        public BestSellers() { }

        [Key]
        public Guid BestSeller_ID { get; set; }

        public Stock_Item Stock_Item { get; set; }
        public Guid Stock_Item_ID { get; set; }
        public virtual Stock_Type Stock_Type_Name { get; set; }
        public virtual Stock_Image Stock_Image_ID { get; set; }
        public virtual Stock_Item_Colour Stock_Item_Colour { get; set; }
        [StringLength(255)]
        public string Stock_Item_Name { get; set; }
    }
}
