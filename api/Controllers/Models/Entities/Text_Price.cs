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

        //[ForeignKey(nameof(Stock_Type_ID))]
        //public Guid Stock_Type_ID { get; set; }

        //[Column("Text_Price_Amount", TypeName = "decimal(18, 2)")]
        public double Text_Price_Amount { get; set;}

        public virtual ICollection<Design_Text> Design_Text { get; set; }

        //public virtual ICollection<Text_Price> Text_Price { get; set; }
    }
}
