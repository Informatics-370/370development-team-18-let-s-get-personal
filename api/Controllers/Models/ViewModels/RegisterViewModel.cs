using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class RegisterViewModel
  {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public Guid? Title_ID { get; set; }

        public string FirstName { get; set; }        
        public string Surname { get; set; }        
        public string Cell_Number { get; set; }
        public string Province_Name { get; set; }
        public string City_Name { get; set; }
        public string Street { get; set; }
        public string Dwelling_Type { get; set; }
        public int Number { get; set; }
        public int Unit_Number { get; set; }
        public int Area_Code { get; set; }

        //public virtual Customer Customer { get; set; }
        //public virtual Address Address { get; set; }

    }
}
