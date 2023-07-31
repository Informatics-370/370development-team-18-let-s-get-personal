using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Type
  {
        [Key]
        [Column("Stock_Type_ID")]
        public Guid Stock_Type_ID { get; set; }

        [StringLength(255)]
        public string Stock_Type_Name { get; set; }        

        public virtual ICollection<Stock_Item> Stock_Item { get; set; }

        //public virtual ICollection<Inventory> Inventory { get; set; }
    }
}
