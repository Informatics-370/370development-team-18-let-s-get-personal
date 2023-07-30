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
        [Key]
        public Guid User_ID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        //fk user-role
        public int User_Role_ID { get; set; }
        public User_Role User_Role { get; set; }

        public virtual ICollection<Customer> Customer { get; set; }
        public virtual ICollection<Employee> Employee { get; set; }
        public virtual ICollection<Admin> Admin { get; set; }
    }
}
