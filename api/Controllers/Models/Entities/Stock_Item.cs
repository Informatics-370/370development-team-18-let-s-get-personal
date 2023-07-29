using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Item
  {
        public Stock_Item() 
        { 
            BestSellers = new HashSet<BestSellers>(); 
        }
        [Key]
        [Column("Stock_Item_ID")]
        public int Stock_Item_ID { get; set; }
        
        [StringLength(255)]
        public string Stock_Item_Name { get; set; }

        [Column("Price", TypeName = "decimal(18, 2)")]
        public decimal Stock_Item_Price { get; set; }

        //[InverseProperty("Stock_Item")]
        //public virtual ICollection<Basket> basket { get; set; }

        [InverseProperty("Stock_Item")]
        public virtual ICollection<Stock_Type> Stock_Types { get; set; }

        [InverseProperty("Stock_Item")]
        public virtual ICollection<Stock_Image> Stock_Images { get; set; }

        [InverseProperty("Stock_Item")]
        public virtual ICollection<Stock_Item_Colour> Stock_Item_Colours { get; set; }

        [InverseProperty("Stock_Item")]
        public virtual ICollection<BestSellers> BestSellers { get; set; }

        [InverseProperty("Stock_Item")]
        public virtual ICollection<Basket> Basket { get; set; }

        [InverseProperty("Stock_Item")]
        public virtual ICollection<Product_Rating> Product_Rating { get; set; }

    }
}
