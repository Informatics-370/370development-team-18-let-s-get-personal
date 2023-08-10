using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Design_Text
  {
        [Key]
        public Guid Design_Text_ID { get; set; }

        //FK
        [ForeignKey(nameof(Text_Price_ID))]
        public Guid Text_Price_ID { get; set; }

        public Text_Price Text_Price { get; set; }

        [StringLength(255)]
        public string Design_Text_Description { get; set; }

        //public int Design_Text_Size { get; set; } 


        public virtual ICollection<Personalisation_Design> Personalisation_Design { get; set; }
        //public virtual ICollection<Design_Text> Design_Text { get; set; }
    }
}
