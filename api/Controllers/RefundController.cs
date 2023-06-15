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
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefundController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public RefundController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }



//************** Policies
        [HttpGet]
        [Route("GetAllRefundPolicies")]
        public async Task<IActionResult> GetAllRefundPolicies()
        {
            try
            {
                var results = await _IPKPRepository.GetAllPoliciesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddRefundPolicy")]
        public async Task<IActionResult> AddRefundPolicy(Refund_Policy rpm)
        {
            var policy = new Refund_Policy
            {
                Refund_Policy_ID = rpm.Refund_Policy_ID,
                Refund_Policy_Date = rpm.Refund_Policy_Date,
                Refund_Policy_Version = rpm.Refund_Policy_Version
            };
            try
            {
                _IPKPRepository.Add(policy);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Delivery Company Added To Database.");
        }

        [HttpPut]
        [Route("UpdateRefundPolicy")]
        public async Task<IActionResult> UpdateRefundPolicy(Guid policy_ID, Refund_Policy rpm)
        {
            try
            {
                var existingpoliciy = await _IPKPRepository.GetPolicyAsync(policy_ID);

                if (existingpoliciy == null) return NotFound("Could Not Find Delivery Company" + policy_ID);

                existingpoliciy.Refund_Policy_Version = rpm.Refund_Policy_Version;

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
        [Route("DeleteRefundPolicy")]
        public async Task<IActionResult> DeleteRefundPolicy(Guid Refund_Policy_ID)
        {
            try
            {
                var existingPolicy = await _IPKPRepository.GetPolicyAsync(Refund_Policy_ID);

                if (existingPolicy == null) return NotFound("Could Not Find Delivery Company" + Refund_Policy_ID);

                _IPKPRepository.Delete(existingPolicy);

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
