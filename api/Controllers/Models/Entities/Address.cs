using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Address
  {
        [Key]
        public int Address_ID { get; set; }

        [StringLength(255)]
        public string Province_Name {get; set; }

        [StringLength(255)]
        public string City_Name { get; set; }

        [StringLength(255)]
        public string Street { get; set; }

        [StringLength(255)]
        public string Dwelling_Type { get; set; }

        public int Number { get; set; }     

        public int Unit_Number { get; set; }

        public int Area_Code { get; set; }

        //foreign keys 

        [Column("Customer_ID")]
        public int? Customer_ID { get; set; }

        [ForeignKey(nameof(Customer_ID))]
        [InverseProperty("Address")]
        public virtual Customer Customer { get; set; }
    }
}
