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
        public Guid Write_Off_ID { get; set; }

        public DateTime Write_Off_Date { get; set; }

        public Guid? Stock_Item_ID { get; set; }

        public virtual Stock_Item Stock_Item { get; set; }

    }
}
