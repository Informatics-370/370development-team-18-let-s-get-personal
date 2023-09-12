using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Delivery_Address
    {
        [Key]
        [Column("Delivery_Address_ID")]
        public Guid Delivery_Address_ID { get; set; }        

        [StringLength(255)]
        public string StreetName { get; set; }

        public int StreetNumber { get; set; }

        [StringLength(255)]
        public string Dwelling_Type { get; set; }

        public int Unit_Number { get; set; }

        [StringLength(255)]
        public string City { get; set; }

        [StringLength(255)]
        public string Province { get; set; }

        [StringLength(4)]
        public string AreaCode { get; set; }        

    }
}
