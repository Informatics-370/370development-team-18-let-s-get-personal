using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class User
  {
        public User() 
        { 
            Customer = new HashSet<Customer>();

        }
        [Key]
        public int User_ID { get; set; }
        public virtual User_Role User_Role { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        [InverseProperty("User")]
        public virtual ICollection<Customer> Customer { get; set; }
    }
}
