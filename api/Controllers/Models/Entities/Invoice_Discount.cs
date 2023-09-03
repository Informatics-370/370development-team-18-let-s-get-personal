using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Invoice_Discount
    {
        [Key]
        public Guid Invoice_Discount_ID { get; set; }

        //foreign keys
        [ForeignKey(nameof(Discount_ID))]
        public Guid Discount_ID { get; set; }
        //public virtual Discount Discount { get; set; }

        [StringLength(255)]
        public string Discount_Reason { get; set; }

        public virtual ICollection<Invoice> Invoice { get; set; }
    }
}
