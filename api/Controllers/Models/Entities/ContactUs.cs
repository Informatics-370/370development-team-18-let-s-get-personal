using System;
using System.ComponentModel.DataAnnotations;

namespace IPKP___API.Controllers.Models.Entities
{
    public class ContactUs
    {
        [Key]
        public Guid Contact_Us_ID { get; set; }

        public string Contact_Us_Name { get; set; }

        public string Contact_Us_Email { get; set; }

        public string Contact_Us_Phone { get; set; }

        public bool replied { get; set; }
    }
}
