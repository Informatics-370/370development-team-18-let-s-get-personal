using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Stock_Image
    {
        [Key]
        [Column("Stock_Image_ID")]
        public Guid Stock_Image_ID { get; set; }

        public string Stock_Image_File { get; set; }

        [StringLength(255)]
        public string Stock_Image_Name { get; set; }
    }
}
