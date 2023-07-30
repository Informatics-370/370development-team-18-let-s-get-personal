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
        public string StreetNumber { get; set; }

        [StringLength(255)]
        public string StreetName { get; set; }

        [StringLength(255)]
        public string City { get; set; }

        [StringLength(255)]
        public string Province { get; set; }

        [StringLength(255)]
        public string AreaCode { get; set; }

        [StringLength(255)]
        public string Country { get; set; }

        public virtual ICollection<Delivery> Delivery { get; set; }

        public virtual ICollection<Order_Request> Order_Request { get; set; }
    }
}
