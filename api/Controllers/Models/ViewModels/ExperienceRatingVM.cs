using IPKP___API.Controllers.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System;

namespace IPKP___API.Controllers.Models.ViewModels
{
    public class ExperienceRatingVM
    {
        public Guid Experience_Rating_ID { get; set; }
        public string Customer_ID { get; set; }
        public int Experience_Star_Rating { get; set; }
        [StringLength(255)]
        public string Experience_Rating_Comments { get; set; }
    }
}
