using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Stock_Price_History
    {
        [Key]
        public Guid Stock_Price_History_ID { get; set; }
        public double Stock_Price_Amount { get; set; }
        public DateTime Effective_From_Date { get; set; }
        public DateTime Effective_To_Date { get; set; }

        public Guid Stock_Item_ID { get; set; }
        public Stock_Item Stock_Item { get; set; }
    }
}
