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
        public double Delivery_Price { get; set; }
        public int Tracking_Number { get; set; }

        //Address Foreign key
        public Guid? Delivery_Address_ID { get; set; }
        public virtual Delivery_Address Delivery_Address { get; set; }

        //Company Foreign key
        public Guid? Delivery_Company_ID { get; set; }
        public virtual Delivery_Company Delivery_Company { get; set; }

    }
}
