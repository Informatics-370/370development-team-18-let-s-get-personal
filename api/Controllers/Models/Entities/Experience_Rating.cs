using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Experience_Rating
    {
        [Key]
        public Guid Experience_Rating_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        public Guid Customer_ID { get; set; }

        public int Experience_Star_Rating { get; set; }

        [StringLength(255)]
        public string Experience_Rating_Comments { get; set; }
    }
}
