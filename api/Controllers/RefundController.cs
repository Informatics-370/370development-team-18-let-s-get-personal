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
using System.
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
        //************* Process refund

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> GetCustomer(Guid customer_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddRefund")]
        public async Task<IActionResult> AddRefund(RefundViewModel refundVM)
        {
            var newrefund = new Refund
            {
                Refund_ID = new Guid(),
                Customer = refundVM.Customer_ID,
                Refund_Comment = refundVM.Refund_Comment,                
                Refund_Policy = refundVM.Refund_Policy,
                Refund_Status = refundVM.Refund_Status
            };
            try
            {
                
                _IPKPRepository.Add(newrefund);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
            return Ok("Delivery Company Added To Database."); 
            
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
                Refund_Policy_Version = rpm.Refund_Policy_Version,
                Refund_Policy_Description = rpm.Refund_Policy_Description
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
