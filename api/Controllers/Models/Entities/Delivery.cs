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

        public int Tracking_Number { get; set; }

        [StringLength(255)]
        public string Delivery_Status { get; set; }

        //Address Foreign key
        public Guid? Delivery_Address_ID { get; set; }
        public virtual Delivery_Address Delivery_Address { get; set; }

        //Company Foreign key
        public Guid? Delivery_Company_ID { get; set; }
        public virtual Delivery_Company Delivery_Company { get; set; }

        public virtual ICollection<Order_Request> Order_Request { get; set; }
    }
}
