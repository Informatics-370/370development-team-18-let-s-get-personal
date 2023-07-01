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
        [Route("GetBasketInfo")]
        public async Task<IActionResult> GetBasketInfo(Basket bask, int Customer_id)
        {
            return Ok("Basket Gotten To Database.");
        }

        [HttpPost]
        [Route("AddBasketInfo")]
        public async Task<IActionResult> AddBasketInfo(Basket bask)
        {
            var basketItems = new Basket
            {
                Stock_Item_ID = bask.Stock_Item_ID,
                Stock_Item_Name = bask.Stock_Item_Name,
                Stock_Type_Name = bask.Stock_Type_Name,
                Stock_Image_ID = bask.Stock_Image_ID,
                Stock_Item_Colour = bask.Stock_Item_Colour,
                Customer_ID = bask.Customer_ID
            };
            try
            {
                _IPKPRepository.Add(basketItems);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Basket Added To Database.");

        }

    }
}
