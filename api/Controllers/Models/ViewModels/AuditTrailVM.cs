using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.ComponentModel.DataAnnotations;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class AuditTrailVM
    {
        public Guid Audit_Trail_ID { get; set; }

        public Guid Admin_ID { get; set; }

        public DateTime ActionDate { get; set; }

        public string ActionName { get; set; }

        public string FirstName { get; set; }

        public string Surname { get; set; }
    }
}
