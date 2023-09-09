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
using System.Runtime.Intrinsics.Arm;


namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        //METHODS: disocunt crud
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
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetDiscount/{discount_ID}")]
        public async Task<IActionResult> GetDiscount(Guid discount_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetDiscountAsync(discount_ID);
                if (results == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Discount" });
                }
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddDiscount")]
        public async Task<IActionResult> AddDiscount(Discount dm)
        {
            try
            {

                var discount = new Discount
                {
                    Discount_ID = new Guid(),
                    Discount_Name = dm.Discount_Name,
                    Discount_Amount = dm.Discount_Amount,
                    Effective_From_Date = dm.Effective_From_Date,
                    Effective_To_Date = dm.Effective_To_Date,
                    Stock_Item_ID = dm.Stock_Item_ID
                };
                _IPKPRepository.Add(discount);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Discount Added Successfully" });
        }

        [HttpPut]
        [Route("edit-discounts/{Discount_ID}")]
        public async Task<IActionResult> UpdateDiscount(Guid Discount_ID, Discount discount)
        {
            try
            {
                var existingDiscount = await _IPKPRepository.GetDiscountAsync(Discount_ID);

                if (existingDiscount == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Discount" });
                }
                else
                {
                    existingDiscount.Discount_Name = discount.Discount_Name;

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Error", Message = "Delivery Company Updated Successfully" });
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Error", Message = "Discount Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteDiscount/{Discount_ID}")]
        public async Task<IActionResult> DeleteDiscount(Guid Discount_ID)
        {
            try
            {
                var existingDiscount = await _IPKPRepository.GetDiscountAsync(Discount_ID);

                if (existingDiscount == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Discount" });
                }

                _IPKPRepository.Delete(existingDiscount);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Discount Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Discount Removed Successfully" });
        }
    }
}
