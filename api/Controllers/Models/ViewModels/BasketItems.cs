using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class BasketItems
    {
        public int basket_Quantity { get; set; }
        public Stock_Item stock_Item { get; set; }
        public Personalization personalization { get; set; }

    }
}
