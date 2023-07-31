using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Stock_Item
    {
        [Key]
        [Column("Stock_Item_ID")]
        public Guid Stock_Item_ID { get; set; }
        
        [StringLength(255)]
        public string Stock_Item_Name { get; set; }

        [Column("Price", TypeName = "decimal(18, 2)")]
        public decimal Stock_Item_Price { get; set; }

        

        public virtual ICollection<Stock_Type> Stock_Types { get; set; }

        public virtual ICollection<Stock_Image> Stock_Images { get; set; }

        public virtual ICollection<Stock_Item_Colour> Stock_Item_Colours { get; set; }

        public virtual ICollection<BestSellers> BestSellers { get; set; }
        
        public virtual ICollection<Basket> Basket { get; set; }
        
        public virtual ICollection<Product_Rating> Product_Rating { get; set; }

        public virtual ICollection<Inventory_Line_Item> Inventory_Line_Item { get; set; }

    }
}


//public Stock_Item()
//{
//    BestSellers = new HashSet<BestSellers>();
//}
