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

        public int Stock_Sale_Quantity { get; set; }

    }
}
