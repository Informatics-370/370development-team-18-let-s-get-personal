using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class BestSellersVM
    {
        public Guid BestSeller_ID { get; set; }
        public Guid Stock_Item_ID { get; set; }
        public string Stock_Item_Name { get; set; }
        public decimal Stock_Item_Price { get; set; }
        public string Stock_Item_Size { get; set; }
        public DateTime Inventory_Date { get; set; }
        public string Inventory_Comments { get; set; }
        public int Stock_Item_Quantity { get; set; }
        public int Stock_Sale_Quantity { get; set; }
        public string Stock_Type_Name { get; set; }
        public string Stock_Image_Name { get; set; }
        public string Stock_Image_File { get; set; }
        public string Stock_Colour_Name { get; set; }
    }
}
