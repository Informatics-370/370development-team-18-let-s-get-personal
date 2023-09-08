using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Payment
    {
        [Key]
        public Guid Payment_ID { get; set; }

        public double Payment_Amount { get; set; }

        public int Sale_Quantity { get; set; }

        public DateTime Sale_Date { get; set; }

        public string Customer_UserName { get; set; }

        public Guid Stock_Item_ID { get; set; }

        public virtual ICollection<Invoice> Invoice { get; set; }
    }
}
