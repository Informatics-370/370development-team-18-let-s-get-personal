using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class StockItemController : ControllerBase
  {

        private readonly IIPKPRepository _IPKPRepository;
        public StockItemController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }

       

      

        

      

        
  }
}
