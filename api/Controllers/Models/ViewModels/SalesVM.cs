using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class SalesVM
    {
        public string Stock_Item_Name { get; set; }
        public Guid Stock_Item_ID { get; set; }
        public string Stock_Type_Name { get; set; }

        public decimal Total_Amount { get; set; }
        public double Payment_Amount { get; set; }

        public int Order_Line_Item_Quantity { get; set; }
        public DateTime Order_Completed_Date { get; set; }

        public Guid Customer_ID { get; set; }
        public string FirstName { get; set; }
        public string UserName { get; set; }

        //Payment
        public Guid Payment_ID { get; set; }
        //public double Payment_Amount { get; set; }
        public int Sale_Quantity { get; set; }
        public DateTime Sale_Date { get; set; }
        //public Guid Stock_Item_ID { get; set; }
        public string Customer_UserName { get; set; }

        //Invoice
        public Guid Invoice_ID { get; set; }
        public Guid Order_Line_Item_ID { get; set; }
        //public Guid Payment_ID { get; set; }
        //public Guid Customer_ID { get; set; }
        public double Discount_Amount { get; set; }
        public double Delivery_Price { get; set; }
        public double Invoice_Total_exclVAT { get; set; }
        public double Invoice_Total_VAT { get; set; }
        public double Invoice_Total_inclVAT { get; set; }

    }
}
