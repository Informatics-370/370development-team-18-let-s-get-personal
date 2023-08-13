using IPKP___API.Controllers.Models.Entities;
using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class OrderRequestVM
    {
        public string Customer_Username { get; set; }

        public Guid Customer_ID { get; set; }

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

        public DateTime Order_Request_Date { get; set; }
        public double Order_Request_Total_Price { get; set; }
        //public bool is_Accepted { get; set; }
    }
}
