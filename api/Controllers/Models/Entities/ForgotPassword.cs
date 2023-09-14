using System.ComponentModel.DataAnnotations;

namespace IPKP___API.Controllers.Models.Entities
{
    public class ForgotPassword
    {
       // [Required]
        //[DataType(DataType.EmailAddress)]
        public string Email_Address { get; set; }

        public string UserName { get; set; }
    }
}
