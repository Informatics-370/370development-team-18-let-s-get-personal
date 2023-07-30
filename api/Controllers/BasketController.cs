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

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public BasketController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetBasketInfo/{customer_id}")]
        public async Task<IActionResult> GetBasketInfo(Guid customer_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetBasketAsync(customer_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
            //return Ok("Basket Gotten To Database.");
        }

        [HttpPost]
        [Route("AddBasketInfo")]
        public async Task<IActionResult> AddBasketInfo(Basket bask)
        {
            var basketItems = new Basket
            {
                Basket_ID = bask.Basket_ID,
                Basket_Quantity = bask.Basket_Quantity,
                Stock_Item = bask.Stock_Item,
                Customer = bask.Customer
            };
            try
            {
                _IPKPRepository.Add(basketItems);
                await _IPKPRepository.SaveChangesAsync();               
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Basket Added To Database." });

        }

    }
}
