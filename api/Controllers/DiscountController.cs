using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System.Threading.Tasks;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DiscountController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public DiscountController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAllDiscounts")]
        public async Task<IActionResult> GetAllDiscounts()
        {
            try
            {
                var results = await _IPKPRepository.GetAllDiscountsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpGet]
        [Route("GetDiscount")]

        public async Task<IActionResult> GetDiscount(Guid discount_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetDiscountAsync(discount_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }
         
        [HttpPost]
        [Route("AddDiscount")]
        public async Task<IActionResult> AddDiscount(Discount dm)
        {
            var discount = new Discount
            {
                Discount_ID = dm.Discount_ID,
                Discount_Name = dm.Discount_Name,
                Discount_Amount = dm.Discount_Amount,
                Effective_From_Date = dm.Effective_From_Date,
                Effective_To_Date = dm.Effective_To_Date
            };
            try
            {
                _IPKPRepository.Add(discount);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Delivery Company Added To Database.");
        }
       

        [HttpPut]
        [Route("UpdateDiscount")]
        public async Task<IActionResult> UpdateDiscount(Guid Discount_ID, Discount discount)
        {
            try
            {
                var existingDiscount = await _IPKPRepository.GetDiscountAsync(Discount_ID);

                if (existingDiscount == null) return NotFound("Could Not Find Delivery Company" + Discount_ID);

                existingDiscount.Discount_Name = discount.Discount_Name;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("Delivery Company Updated Successfully");
                }
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Delivery Company Saved To Database.");
        }

        [HttpDelete]
        [Route("DeleteDiscount")]
        public async Task<IActionResult> DeleteDiscount(Guid Discount_ID)
        {
            try
            {
                var existingDiscount = await _IPKPRepository.GetDiscountAsync(Discount_ID);

                if (existingDiscount == null) return NotFound("Could Not Find Delivery Company" + Discount_ID);

                _IPKPRepository.Delete(existingDiscount);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok("Delivery Company Removed Successfully");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
            return Ok("Delivery Company Removed From Database.");
        }
    }
}
