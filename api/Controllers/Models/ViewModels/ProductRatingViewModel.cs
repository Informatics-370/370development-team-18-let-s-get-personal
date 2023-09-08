using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class ProductRatingViewModel
    {
        public Guid Product_Rating_ID { get; set; }
        public int Product_Star_Rating { get; set; }
        public string Product_Rating_Comments { get; set; }

        public Guid Customer_ID { get; set; }
        public string Customer_UserName { get; set; }

        public Guid Stock_Item_ID { get; set; }
        public string Stock_Item_Name { get; set; }

    }
}
