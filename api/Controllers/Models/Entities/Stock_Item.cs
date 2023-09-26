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

        //Foreign Keys
        [ForeignKey(nameof(Stock_Image_ID))]
        public Guid Stock_Image_ID { get; set; }

        [ForeignKey(nameof(Stock_Type_ID))]
        public Guid Stock_Type_ID { get; set; }

        [ForeignKey(nameof(Stock_Item_Colour_ID))]
        public Guid Stock_Item_Colour_ID { get; set; }

        [ForeignKey(nameof(Product_Rating_ID))]
        public Guid Product_Rating_ID { get; set; }

      
        //Attributes
        [StringLength(255)]
        public string Stock_Item_Name { get; set; }

        [Column("Stock_Item_Price", TypeName = "decimal(18, 2)")]
        public decimal Stock_Item_Price { get; set; }

        [StringLength(255)]
        public string Stock_Item_Size { get; set; }

        public DateTime Inventory_Date { get; set; }

        [StringLength(255)]
        public string Inventory_Comments { get; set; }

        public int Stock_Item_Quantity { get; set; }

        //Foreign Key Tables
        //public Stock_Type Stock_Type { get; set; }

        //public Stock_Image Stock_Image { get; set; }
        
        //public Stock_Item_Colour Stock_Item_Colour { get; set; }

        //public Product_Rating Product_Rating { get; set; }

        //Reverse properties
        //public virtual ICollection<BestSellers> BestSellers { get; set; }
        
        //public virtual ICollection<Stock_Price_History> Stock_Price_History { get; set; }

        //public virtual ICollection<Personalisation_Design> Personalisation_Design { get; set; }

        public Stock_Price_History StockPriceHistory { get; set; }

    }
}


//public Stock_Item()
//{
//    BestSellers = new HashSet<BestSellers>();
//}
//public virtual ICollection<Stock_Type> Stock_Types { get; set; }

//public virtual ICollection<Stock_Image> Stock_Images { get; set; }

//public virtual ICollection<Stock_Item_Colour> Stock_Item_Colours { get; set; }