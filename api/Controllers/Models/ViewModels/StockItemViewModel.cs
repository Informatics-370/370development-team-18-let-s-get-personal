using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class StockItemViewModel
    {
       // public Guid Stock_Item_ID { get; set; }
        //public virtual Stock_Type Stock_Type_Name { get; set; }
        //public virtual Stock_Image Stock_Image { get; set; }
        //public virtual Stock_Item_Colour Stock_Item_Colour { get; set; }
        public Guid Stock_Item_ID { get; set; }
        public string Stock_Item_Name { get; set; }
        public decimal Stock_Item_Price { get; set; }
        public string Stock_Item_Size { get; set; }
        public int Stock_Sale_Quantity { get; set; }
        public DateTime Inventory_Date { get; set; }
        public string Inventory_Comments { get; set; }
        public int Stock_Item_Quantity { get; set; }
        public string StockTypeName { get; set; }
        public string StockImageName { get; set; }
        public string StockImageFile { get; set; }
        public string StockColourName { get; set; }

        public Guid Stock_Type_ID { get; set; }

        public Guid Stock_Image_ID { get; set; }

        public Guid Stock_Item_Colour_ID { get; set; }

        //public string Stock_Item_Colour_Image { get; set; }
    }
}
