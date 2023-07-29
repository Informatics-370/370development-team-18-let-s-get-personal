using IPKP___API.Controllers.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class DeliverAddressVM
    {
        public int Address_ID { get; set; }

        public int Province_ID { get; set; }

        [StringLength(255)]
        public string Province_Name { get; set; }

        public string City_Name { get; set; }

        [StringLength(255)]
        public string Street { get; set; }


        public int Number { get; set; }

        [StringLength(255)]
        public string Dwelling_Type { get; set; }


        public int Unit_Number { get; set; }


        public int Area_Code { get; set; }
    }
}
