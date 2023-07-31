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
        [Key]
        [Column("Inventory_ID")]
        public Guid Inventory_ID { get; set; }

        public DateTime Inventory_Date { get; set; }

        [StringLength(255)]
        public string Inventory_Comments { get; set; }

        public virtual ICollection<Inventory_Line_Item> Inventory_Line_Item { get; set; }

    }
}
