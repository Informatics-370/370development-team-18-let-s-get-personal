using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class OrderT
    {
        public string customerID { get; set; }
        public float deliveryPrice { get; set; }
        public Boolean paid { get; set; }
        public float price { get; set; }
        public string deliveryCompanyID { get; set; }
        public List<BasketItems> basketItems { get; set; }

        public Delivery_Address deliveryAddress { get; set; }   

    }
}
