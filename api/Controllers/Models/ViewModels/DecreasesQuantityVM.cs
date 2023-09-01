using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class DecreasesQuantityVM
    {
        public int Order_Line_Item_Quantity { get; set; }
        public Guid Stock_Item_ID { get; set; }
        public int Stock_Item_Quantity { get; set; }
    }
}
