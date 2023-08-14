using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Employee
  {
        [Key]
        public Guid Employee_ID { get; set; }    

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

        public DateTime Date_Registered { get; set; }

        //foreign key user        
        public Guid User_ID { get; set; }
        public User User { get; set; }
        //public virtual ICollection<User> User { get; set; }
    }
}
