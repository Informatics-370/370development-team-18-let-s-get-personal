using System.ComponentModel.DataAnnotations;

namespace IPKP___API.Controllers.Models.Entities
{
    public class ForgotPassword
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string UserName { get; set; }
    }
}
