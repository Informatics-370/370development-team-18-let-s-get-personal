using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using IPKP___API.Controllers.Models.Entities;
using Microsoft.AspNetCore.Http;
using System;
using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.Intrinsics.Arm;

//get stock 
namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BestSellersController : ControllerBase
    {
        //AppDbContext _CoreDbContext = new AppDbContext();
        private readonly IIPKPRepository _IPKPRepository;
        public BestSellersController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAllBestSellers")]
        public async Task<IActionResult> GetAllBestSellers()
        {
            try
            {
                var results = await _IPKPRepository.GetAllBestSellersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddBestSeller")]
        public async Task<IActionResult> AddBestSeller(BestSellers bsellers)
        {
            using (var contextmodel = new AppDbContext())
            {
                var bestsellerItem = new BestSellers
                {
                    BestSeller_ID = bsellers.BestSeller_ID,
                    Stock_Item_ID = bsellers.Stock_Item_ID,                    
                    Stock_Item = bsellers.Stock_Item
                };
                try
                {
                    _IPKPRepository.Add(bestsellerItem);
                    await _IPKPRepository.SaveChangesAsync();
                }
                catch (Exception)
                {
                    return BadRequest("Invalid Transaction");
                }
                return Ok("Stock Item Added To Database.");
            }
            

        }
    }
}
