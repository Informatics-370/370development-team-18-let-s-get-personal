using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IPKP___API.Controllers.Models.ViewModels;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Write_Off
  {
        [Key]
        [Column("Write_Off_ID")]
        public int Write_Off_ID { get; set; }

        [Column("Inventory_ID")]
        public int? Inventory_ID { get; set; }

        public DateTime Write_Off_Date { get; set; }

        public virtual Employee Employee { get; set; }
        
        [ForeignKey(nameof(Inventory_ID))]
        [InverseProperty("Write_Off")]
        public virtual Inventory Inventory { get; set; }
    }
}
