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
        [Column("Stock_Item_Colour_ID")]
        public int Stock_Item_Colour_ID { get; set; }
        
        [StringLength(255)]
        public string Stock_Item_Colour_Name { get; set; }

        public string Stock_Item_Colour_Image { get; set; }

        public int Stock_Item_Id { get; set; }

        //public virtual Stock_Item Stock_Item { get; set; }

        [InverseProperty("Stock_Item_Colours")]
        public virtual ICollection<Stock_Item> Stock_Item { get; set; }
    }
}
