using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Image
  {
        [Key]
        [Column("Stock_Image_ID")]
        public Guid Stock_Image_ID { get; set; }

        public string Stock_Image_File { get; set; }

        //[Column("Stock_Item_Id")]
        //public Guid? Stock_Item_Id { get; set; }

        
        public virtual ICollection<Stock_Item> Stock_Item { get; set; }

        //public virtual ICollection<Inventory> Inventory { get; set; }

    }
}
