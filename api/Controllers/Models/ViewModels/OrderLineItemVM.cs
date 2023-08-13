using System;
using System.ComponentModel.DataAnnotations;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class OrderLineItemVM
    {
        //delivery request
        public double Delivery_Price { get; set; }
        public string Delivery_Company_Name { get; set; }
        public string Delivery_Status { get; set; }
        public string StreetName { get; set; }
        public int StreetNumber { get; set; }
        public string Dwelling_Type { get; set; }
        public int Unit_Number { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string AreaCode { get; set; }

        //orderrequest
        public Guid Customer_ID { get; set; }
        public string Customer_UserName { get; set; }
        public DateTime Order_Request_Date { get; set; }
        public double Order_Request_Total_Price { get; set; }
        public string Order_Status { get; set; }

        //Personalisation design 
        public string Image_File { get; set; }
        public double Image_Price_Amount { get; set; }

        public string Design_Text { get; set; }
        public double Text_Price_Amount { get; set; }

        public string Stock_Item_Name { get; set; }
        public decimal Stock_Item_Price { get; set; }
        public string Stock_Item_Size { get; set; }
        public string Stock_Colour_Name { get; set; }
        public double Personalisation_Design_Price { get; set; }

        //order line item 
        public Guid Order_Line_Item_ID { get; set; }
        public double Order_Line_Item_Price { get; set; }
        public int Order_Line_Item_Quantity { get; set; }
        public double Order_Line_Item_Total_Price { get; set; }
    }
}
