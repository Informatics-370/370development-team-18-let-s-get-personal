using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class InventoryVM
    {
        public Guid? Inventory_Id { get; set; }
        public int Inventory_PriceId { get; set; }
        public string Inventory_Name { get; set; }
        public int Inventory_TypeID { get; set; }
        //public int Quantity_On_Hand { get; set; }
        public int Inventory_Colour_ID { get; set; }
        public string ColorName { get; set; }
        public string Color_Description { get; set; }
        public DateTime? Date { get; set; }
        public decimal? Price { get; set; }
        public string TypeDescription { get; set; }
        public string Inventory_TypeName { get; set; }
    }
}
