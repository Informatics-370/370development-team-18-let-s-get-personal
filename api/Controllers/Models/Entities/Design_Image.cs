using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Design_Image
    {
        [Key]
        public Guid Design_Image_ID { get; set; }


        //attributes
        //public int Design_Image_Size { get; set; }
        public string Image_File { get; set; }


        public virtual ICollection<Personalisation_Design> Personalisation_Design { get; set; }

        public virtual ICollection<Design_Image_Line_Item> Design_Image_Line_Item { get; set; }
    }
}

//[ForeignKey(nameof(Design_Image_Line_Item_ID))]
//public Guid Design_Image_Line_Item_ID { get; set; }

//public Design_Image_Line_Item Design_Image_Line_Item { get; set; }