using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Product_Rating
    {
        [Key]
        public Guid Product_Rating_ID { get; set; }

        [StringLength(255)]
        public string Product_Rating_Comments { get; set; } 

        public int Product_Star_Rating { get; set; }


        //Foreign Keys
        [ForeignKey(nameof(Stock_Item_ID))]
        public Guid Stock_Item_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        public Guid Customer_ID { get; set; }

    }
}