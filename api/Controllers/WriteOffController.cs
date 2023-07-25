using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;
using System.Collections.Generic;
using System.Linq;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WriteOffController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public WriteOffController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

    }
}
