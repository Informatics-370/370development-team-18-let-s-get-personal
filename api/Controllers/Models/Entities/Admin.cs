using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Admin
    {
        [Key]
        public Guid Admin_ID { get; set; }

        [StringLength(255)]
        public string FirstName { get; set; }

        [StringLength(255)]
        public string Surname { get; set; }

        [StringLength(13)]
        public string Cell_Number { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Username { get; set; }
        
        //foreign key user        
        public Guid User_ID { get; set; }
        public User User { get; set; }

        //public virtual ICollection<User> User { get; set; }
    }
}
