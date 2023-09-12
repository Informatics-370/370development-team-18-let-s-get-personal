using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Refund
    {
        [Key]
        public Guid Refund_ID { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Customer_Email { get; set; }
        

        [StringLength(255)]
        public string Refund_Comment { get; set; }

        [StringLength(255)]
        public string Refund_Status { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Refund_Policy Refund_Policy { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        public Guid Customer_ID { get; set; }

        [ForeignKey(nameof(Refund_Policy_ID))]
        public Guid Refund_Policy_ID { get; set; }
    }
}
