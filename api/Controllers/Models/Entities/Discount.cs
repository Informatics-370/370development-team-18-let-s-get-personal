using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Discount
    {
        [Key]
        public Guid Discount_ID { get; set; }

        [StringLength(255)]
        public string Discount_Name { get; set; }
        public double Discount_Amount { get; set; }

        //public string stock_Id { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }


        public DateTime Effective_From_Date { get; set; }
        public DateTime Effective_To_Date { get; set; }

    }
}
