using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Design_Image
    {
        [Key]
        public Guid Design_Image_ID { get; set; }

        public string Image_File { get; set; }

    }
}