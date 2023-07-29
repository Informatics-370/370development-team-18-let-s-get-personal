using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.Entities
{
  public class Image
  {
    [Key]
    public int Image_ID { get; set; }
    public int Image_Size { get; set; }
    public string Image_File { get; set; }
  }
}
