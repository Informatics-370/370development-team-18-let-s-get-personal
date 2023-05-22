using System;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Stock_Image
  {
    [Key]
    public Guid Stock_Image_ID { get; set; }
    public string Stock_Image_File { get; set; }
  }
}
