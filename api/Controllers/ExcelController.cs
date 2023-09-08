using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public ExcelController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetInventoryList")]
        public object GetInventoryList()
        {
            try
            {
                var stockitems = _IPKPRepository.GetStockList();

                if (stockitems == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    return Ok(stockitems);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

    }
}
