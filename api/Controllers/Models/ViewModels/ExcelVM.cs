using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class ExcelVM
    {
        public string Stock_Item_Name { get; set; }
        public decimal Stock_Item_Price { get; set; }
        public string Stock_Item_Size { get; set; }
        public int Stock_Item_Quantity { get; set; }

        public DateTime Inventory_Date { get; set; }
        public string Inventory_Comments { get; set; }       
        
        public string Stock_Type_Name { get; set; }
        public string Stock_Colour_Name { get; set; }
        public string Stock_Image_Name { get; set; }

    }
}
