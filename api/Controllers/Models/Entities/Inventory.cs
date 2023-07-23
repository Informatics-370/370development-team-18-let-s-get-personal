using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Inventory
  {
        public Inventory()
        {
            Write_Off = new HashSet<Write_Off>();
            //StockTakeTotal = new HashSet<StockTakeTotal>();
        }

        [Key]
        [Column("Stock_Item_ID")]
        public Guid Inventory_ID { get; set; }

        public DateTime Inventory_Date { get; set; }

        [StringLength(255)]
        public string Inventory_Comments { get; set; }

        public int QuantityOnHand { get; set; }

        [InverseProperty("Inventory")]
        public virtual ICollection<Write_Off> Write_Off { get; set; }

        //[InverseProperty("Inventory")]
        //public virtual ICollection<StockTakeTotal> StockTakeTotal { get; set; }
    }
}
