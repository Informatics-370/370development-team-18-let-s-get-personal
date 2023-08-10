using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class OrderRequestVM
    {
        public string StockItemName { get; set; }
        public string StockItemType { get; set; }
        public string StockItemColour { get; set; }
        public string StockItemSize { get; set; }
        public Personalisation_Design PersonalisationDesign { get; set; }
        public int StockItemQuantity { get; set; }
    }
}
