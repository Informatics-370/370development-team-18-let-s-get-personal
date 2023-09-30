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
        public object GetLastestBestSellers()
        {
            try
            {
                var results = _IPKPRepository.GetAllBestSellersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddBestSeller")]
        public async Task<IActionResult> AddBestSellerAsync(BestSellers selectedProducts)
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
                return BadRequest(new Response { Status = "Error", Message = "Invalid Transaction" });
            }
            return Ok(new Response { Status = "Error", Message = "Best Sellers List Added To Database." });
        }

        [HttpDelete]
        [Route("RemoveBestSeller/{bestsellerId}")]
        public async Task<IActionResult> RemoveBestSellerAsync(Guid bestsellerId)
        {
            try
            {
                var bestseller = await _IPKPRepository.GetBestSellerByID(bestsellerId);

                if (bestseller == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Best Seller" + bestsellerId });
                }
                else
                {
                    _IPKPRepository.Delete(bestseller);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Best Seller Removed Successfully" });
                    }
                }
                
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return Ok(new Response { Status = "Success", Message = "Best Seller Removed From Best Seller List." });
        }


    }
}
