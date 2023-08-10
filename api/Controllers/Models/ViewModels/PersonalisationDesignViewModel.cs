using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class PersonalisationDesignViewModel
    {
    //public virtual Design_Image Design_Image { get; set; }

        public Guid Design_Image_Line_Item_ID { get; set; }

        public Guid Design_Text_ID { get; set; }

        public Guid Stock_Item_ID { get; set; }

        public string TextPosition { get; set; }

        public double Personalisation_Design_Price { get; set; }

        public decimal Image_Price_Amount { get; set; }

        public string Image_File { get; set; }

        public Guid Image_Price_ID { get; set; }

        public Guid Text_Price_ID { get; set; }
        
    }
}
