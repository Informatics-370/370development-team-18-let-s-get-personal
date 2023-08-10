using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Text_Price
    {
        [Key]
        public Guid Text_Price_ID { get; set; }

       // public int Text_Price_Size { get; set; }

        [Column("Text_Price_Amount", TypeName = "decimal(18, 2)")]
        public decimal Text_Price_Amount { get; set;}

        public virtual ICollection<Design_Text> Design_Text { get; set; }
    }
}
