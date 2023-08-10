using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Design_Image_Line_Item
    {
        [Key]
        public Guid Design_Image_Line_Item_ID { get; set; }

        //design image fk
        [ForeignKey(nameof(Design_Image_ID))]
        public Guid Design_Image_ID { get; set; }

        public Design_Image Design_Image { get; set; }

        //image price fk 
        [ForeignKey(nameof(Image_Price_ID))]
        public Guid Image_Price_ID { get; set; }

        public Image_Price Image_Price { get; set; }

        public virtual ICollection<Personalisation_Design> Personalisation_Design { get; set; }

        //public virtual ICollection<Design_Image_Line_Item> Design_Image_Line_Item { get; set; }
    }
}
