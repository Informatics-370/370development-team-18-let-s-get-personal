using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Delivery_Company
  {
        public Delivery_Company() 
        {
            Delivery = new HashSet<Delivery>();
        }
        [Key]
        public Guid Delivery_Company_ID { get; set; }
        [StringLength(255)]
        public string Delivery_Company_Name { get; set; }

        [InverseProperty("Delivery_Company")]
        public virtual ICollection<Delivery> Delivery { get; set; }
    }
}
