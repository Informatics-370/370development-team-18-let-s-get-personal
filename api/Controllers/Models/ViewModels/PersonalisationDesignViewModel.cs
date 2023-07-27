using IPKP___API.Controllers.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers.Models.ViewModels
{
  public class PersonalisationDesignViewModel
  {
    public virtual Design_Image Design_Image { get; set; }
    public string ItemColour { get; set; }
    public string DesignText { get; set; }
    public string TextPosition { get; set; }
    public string TextColour { get; set; }
    public double Personalisation_Design_Price { get; set; }
  }
}