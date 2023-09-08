using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class SalesVM
    {
        public string Stock_Item_Name { get; set; }
        public Guid Stock_Item_ID { get; set; }

        public double Payment_Amount { get; set; }
        public int Order_Line_Item_Quantity { get; set; }
        public DateTime Order_Completed_Date { get; set; }

        public Guid Customer_ID { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }

    }
}
