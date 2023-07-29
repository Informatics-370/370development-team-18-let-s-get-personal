using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Delivery_Address
    {
        public Delivery_Address()
        {
            Order = new HashSet<Order>();
        }

        [Key]
        [Column("Delivery_Address_ID")]
        public int Delivery_Address_ID { get; set; }

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

        [Column("Customer_ID")]
        public int? Customer_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        [InverseProperty("DeliveryAddress")]
        public virtual Customer Customer { get; set; }

        [InverseProperty("DeliveryAddress")]
        public virtual ICollection<Order> Order { get; set; }
    }
}
