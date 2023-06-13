using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.Entities
{
    public class BestSellers
    {
        public BestSellers() { }

        [Key]
        public Guid BestSeller_ID { get; set; }

        public Stock_Item Stock_Item { get; set; }
    }
}
