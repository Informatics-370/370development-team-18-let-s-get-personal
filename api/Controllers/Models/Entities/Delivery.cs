using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace IPKP___API.Controllers.Models.Entities
{
    public class Delivery
    {
        [Key]
        public Guid Delivery_ID { get; set; }        

        [StringLength(255)]
        public string Delivery_Status { get; set; }

        public DateTime DateDelivered { get; set; }

        //ignore waybill
        public string Way_Bill_File { get; set; }

        //Address Foreign key
        [ForeignKey(nameof(Delivery_Address_ID))]
        public Guid Delivery_Address_ID { get; set; }


        //Company Foreign key
        [ForeignKey(nameof(Delivery_Company_ID))]
        public Guid Delivery_Company_ID { get; set; }

    }
}
