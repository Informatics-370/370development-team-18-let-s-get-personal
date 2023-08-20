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

        public string Image_File { get; set; }
        public double Image_Price_Amount { get; set; }

        public string Design_Text { get; set; }
        public double Text_Price_Amount { get; set; }

        public string Stock_Item_Name { get; set; }
        public decimal Stock_Item_Price { get; set; }
        public string Stock_Item_Size { get; set; }
        public string Stock_Colour_Name { get; set; }
        public double Personalisation_Design_Price { get; set; }

        public Guid Design_Image_ID { get; set; }

        public Guid Design_Text_ID { get; set; }

        public Guid Stock_Item_ID { get; set; }


        
        
    }
}
