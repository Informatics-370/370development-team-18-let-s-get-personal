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
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

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
        [HttpDelete]
        [Route("DeleteSaleAsync")]
        public async Task<IActionResult> DeleteSaleAsync(Guid sale_Id)
        {
            try
            {
                var existingSale = await _IPKPRepository.GetOrderDetailsAsync(sale_Id);

                if (existingSale == null) return NotFound("Could Not Order" + sale_Id);

                _IPKPRepository.Delete(existingSale);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Sale Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok("Delivery Removed From Database.");
        }
        
        [HttpGet]
        [Route("GetAllPreviousRefunds")]
        public async Task<IActionResult> GetAllPreviousRefunds()
        {
            try
            {
                var results = await _IPKPRepository.GetAllPreviousRefunds();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> GetCustomer(Guid customer_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetCustomerDetailsAsync(customer_ID);
                return Ok(new Response { Status = "Success", Message = "Got Customer Successfully" });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
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
                Refund_Status = refundVM.Refund_Status,
                Customer_Email = refundVM.Customer_ID.Email
                //send email 
            };
            try
            {
                
                var fromEmailAddress = "resinartnewsletter@gmail.com"; // you must add your own provided email
                var subject = "Refund processed";
                var message = $"Good day {refundVM.Customer_ID.FirstName}" +
                    $"" +
                    $"You're order has been successfully refunded. We sincerely apologise for the inconvienience!" +
                    $"You will recieve proof of payment shortly" +
                    $"" +
                    $"Kind regards" +
                    $"It's Personal by Kivashin and Predisha";
                var toEmailAddress = refundVM.Customer_ID.Email;

                // Sending email
                await SendEmail(fromEmailAddress, subject, message, toEmailAddress);

                _IPKPRepository.Add(newrefund);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Refund has been accepted" });
        }

        private async Task SendEmail(string fromEmailAddress, string subject, string message, string toEmailAddress)
        {
            var fromAddress = new MailAddress(fromEmailAddress);
            var toAddress = new MailAddress(toEmailAddress);

            using (var compiledMessage = new MailMessage(fromAddress, toAddress))
            {
                compiledMessage.Subject = subject;
                compiledMessage.Body = string.Format("Message: {0}", message);

                using (var smtp = new SmtpClient())
                {
                    smtp.Host = "smtp.gmail.com"; // for example: smtp.gmail.com
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("@gmail.com", "pnyblzriureedwgp"); // your own provided email and password
                    await smtp.SendMailAsync(compiledMessage);
                }
            }
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
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
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Refund Policy Added Successfully" });
        }


        [HttpDelete]
        [Route("DeleteRefundPolicy/{refund_Policy_ID}")]
        public async Task<IActionResult> DeleteRefundPolicy(Guid Refund_Policy_ID)
        {
            try
            {
                var existingPolicy = await _IPKPRepository.GetPolicyAsync(Refund_Policy_ID);

                if (existingPolicy == null) { 
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Refund Policy" }); 
                }

                _IPKPRepository.Delete(existingPolicy);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Refund Policy Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Refund Policy Removed Successfully" });
        }

        
    }
}
