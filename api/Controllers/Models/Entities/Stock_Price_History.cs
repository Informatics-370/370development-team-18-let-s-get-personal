using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Stock_Price_History
    {
        [Key]
        public Guid Stock_Price_History_ID { get; set; }

        [Column("Stock_Item_Price", TypeName = "decimal(18, 2)")]
        public decimal Stock_Price_Amount { get; set; }
        public DateTime Effective_From_Date { get; set; }
        public DateTime Effective_To_Date { get; set; }

        public string Stock_Item_Name { get; set; }

    }
}
