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
    public class BestSellersController : ControllerBase
    {
        //METHODS: get best sellers, save best sellers list
        private readonly IIPKPRepository _IPKPRepository;
        public BestSellersController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetLastestBestSellers")]
        public async Task<IActionResult> GetLastestBestSellers()
        {
            try
            {
                var results = await _IPKPRepository.GetAllBestSellersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("SaveBestSellersList")]
        public async Task<IActionResult> SaveBestSellersListAsync(BestSellers selectedProducts)
        {          
            try
            {
                var bestSellers = new BestSellers
                {
                    BestSeller_ID = new Guid(),
                    Stock_Item_ID = selectedProducts.Stock_Item_ID,
                    //Stock_Item = selectedProducts.Stock_Item,
                };
                _IPKPRepository.Add(bestSellers);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Best Sellers List Added To Database.");
        }
    }
}
