using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public DiscountController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }


    }
}
