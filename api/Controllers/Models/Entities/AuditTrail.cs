using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.Entities
{
    public class AuditTrail
    {
        [Key]
        [Column("Audit_Trail_ID")]
        public Guid Audit_Trail_ID { get; set; }

        [ForeignKey(nameof(Admin_ID))]
        public Guid Admin_ID { get; set; }

        [ForeignKey(nameof(Employee_ID))]
        public Guid Employee_ID { get; set; }

        public DateTime ActionDate { get; set; }

        public string ActionName { get; set; }
    }
}
