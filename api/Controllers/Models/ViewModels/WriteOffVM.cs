using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class WriteOffVM
    {
        public Guid Stock_Item_ID { get; set; }
        public string Stock_Item_Name { get; set; }
        public DateTime Write_Off_Date { get; set; }
        public string Write_Off_Reason { get; set; }
        public int Write_Off_Quantity { get; set; }
        public Guid Write_Off_ID { get; set; }
        public Guid Write_Off_Line_Item_ID { get; set; }
        public int Stock_Item_Quantity { get; set; }

    }
}
