using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
    public class ManageAccess
    {
        [Key]
        public Guid Access_ID { get; set; }

        public bool HasAccess { get; set; }

        public string Access_name { get; set; }

        [ForeignKey(nameof(Employee_ID))]
        public Guid Employee_ID { get; set; }
    }
}
