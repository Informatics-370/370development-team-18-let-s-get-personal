using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Write_Off_Line_Item
  {
        [Key]
        public Guid Write_Off_Line_Item_ID { get; set; }

        public int Write_Off_Quantity { get; set; }

        [StringLength(255)]
        public string Write_Off_Reason { get; set; }

        [ForeignKey(nameof(Write_Off_ID))]
        public Guid Write_Off_ID { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }

        //public virtual Write_Off Write_Off { get; set; }
        //public virtual Stock_Item Stock_Item { get; set; }
    
  }
}
