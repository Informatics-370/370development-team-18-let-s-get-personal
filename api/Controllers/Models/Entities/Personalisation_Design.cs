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

        //Foreign keys
        [ForeignKey(nameof(Design_Image_ID))]
        public Guid Design_Image_ID { get; set; }

        [ForeignKey(nameof(Design_Text_ID))]
        public Guid Design_Text_ID { get; set; }

        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }

    }
}