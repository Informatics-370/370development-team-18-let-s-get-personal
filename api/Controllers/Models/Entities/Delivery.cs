using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Delivery
  {
        [Key]
        public Guid Delivery_ID { get; set; }
        //public virtual Delivery_Company Delivery_Company { get; set; }
        //public virtual Address Delivery_Address { get; set; }
        public double Delivery_Price { get; set; }
        public int Tracking_Number { get; set; }

        //Address Foreign key
        [Column("Delivery_Address_ID")]
        public Guid? Delivery_Address_ID { get; set; }

        [ForeignKey(nameof(Delivery_Address_ID))]
        [InverseProperty("Delivery")]
        public virtual Delivery_Address Delivery_Address { get; set; }

        //Company Foreign key
        [Column("Delivery_Company_ID")]
        public Guid? Delivery_Company_ID { get; set; }

        [ForeignKey(nameof(Delivery_Company_ID))]
        [InverseProperty("Delivery")]
        public virtual Delivery_Company Delivery_Company { get; set; }

    }
}
