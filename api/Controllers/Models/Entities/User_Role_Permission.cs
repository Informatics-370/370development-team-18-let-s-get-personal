using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
    public class User_Role_Permission
    {
        [Key]
        public Guid User_Role_Permission_ID { get; set; }

        public int User_Role_ID { get; set; }
        public User_Role User_Role { get; set; }

        public int Permission_ID { get; set; }
        public Permission Permission { get; set; }
    }
}
