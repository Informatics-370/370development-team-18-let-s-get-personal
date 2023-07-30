using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
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
    private readonly IIPKPRepository _IPKPRepository;
    public BestSellersController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }
        [HttpGet]
        [Route("GetAllStockItems")]

        public async Task<IActionResult> GetAllStockItemsAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllStockItemsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
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
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("SaveBestSellersList")]
        public async Task<IActionResult> SaveBestSellersListAsync(BestSellers selectedProducts)
        {
            var bestSellers = new BestSellers
            {
                BestSeller_ID = new Guid(),
                Stock_Item_ID = selectedProducts.Stock_Item_ID,
                Stock_Item = selectedProducts.Stock_Item,
            };

            try
            {
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
