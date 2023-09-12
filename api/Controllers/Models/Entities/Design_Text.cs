using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Design_Text
    {
        [Key]
        public Guid Design_Text_ID { get; set; }

        [StringLength(255)]
        public string Design_Text_Description { get; set; }

    }
}