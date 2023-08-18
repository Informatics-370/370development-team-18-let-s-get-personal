using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Item_Colour
  {
        [Key]
        [Column("Stock_Item_ID")]
        public Guid Stock_Item_Colour_ID { get; set; }
        
        [StringLength(255)]
        public string Stock_Item_Colour_Name { get; set; }

        //[InverseProperty("Stock_Item_Colour")]
        //public virtual ICollection<Stock_Item> Stock_Item { get; set; }

        //public virtual ICollection<Inventory> Inventory { get; set; }

    }
}
