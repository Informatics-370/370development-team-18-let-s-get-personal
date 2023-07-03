using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Item_Colour
  {
        [Key]
        public Guid Stock_Item_Colour_ID { get; set; }
        [StringLength(255)]
        public string Stock_Item_Colour_Name { get; set; }

        public string Stock_Item_Colour_Image { get; set; }

        public virtual Stock_Item Stock_Item { get; set; }
    }
}
