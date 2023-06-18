
using IPKP___API.Controllers.Models.Entities;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class RefundViewModel
    {
        public virtual Customer Customer_ID { get; set; }

        public string Refund_Reason { get; set; }

        public string Refund_Comment { get; set; }

        public string Refund_Status { get; set; }

        public virtual Refund_Policy Refund_Policy { get; set; }
    }
}
