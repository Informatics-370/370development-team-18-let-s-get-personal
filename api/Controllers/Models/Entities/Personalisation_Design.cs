using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Personalisation_Design
    {
        [Key]
        public Guid Personalisation_Design_ID { get; set; }

        //foreign keys
        [ForeignKey(nameof(Design_Image_ID))]
        public Guid Design_Image_ID { get; set; }
        public virtual Design_Image Design_Image { get; set; }

        [ForeignKey(nameof(Design_Text_ID))]
        public Guid Design_Text_ID { get; set; }
        public virtual Design_Text Design_Text { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }
        public virtual Stock_Item Stock_Item { get; set; }        

        //reverse properties
        public virtual ICollection<Order_Line_Item> Order_Line_Item { get; set; }
    }
}
//attributes
//public string ItemColour { get; set; }
//public string DesignText { get; set; }
//public string TextPosition { get; set; }
//public string TextColour { get; set; }
//public double Personalisation_Design_Price { get; set; }


// public virtual ICollection<Personalisation_Design> Personalisation_Design { get; set; }