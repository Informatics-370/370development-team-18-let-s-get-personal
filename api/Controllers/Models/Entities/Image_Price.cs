using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Image_Price
    {
        [Key]
        public Guid Image_Price_ID { get; set; }

        //public int Image_Price_Size { get; set; }

        [Column("Image_Price_Amount", TypeName = "decimal(18, 2)")]
        public decimal Image_Price_Amount { get; set; }

        public virtual ICollection<Design_Image_Line_Item> Design_Image_Line_Item { get; set; }
    }
}
