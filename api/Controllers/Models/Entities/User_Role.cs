using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
    public class User_Role
    {
        [Key]
        public int User_Role_ID { get; set; }

        [StringLength(255)]
        public string User_Role_Name { get; set; }

        public virtual ICollection<User> User { get; set; }

        public const string admin = "Admin";
        public const string user = "User";
        public const string employee = "Employee";
    }
}
