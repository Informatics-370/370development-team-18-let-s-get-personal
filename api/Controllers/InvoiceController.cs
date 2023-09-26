using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Identity;
using System.Net.Mail;
using System.Net;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        private readonly UserManager<IdentityUser> _userManager;
        public InvoiceController(IIPKPRepository iPKPRepository, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _IPKPRepository = iPKPRepository;
        }

        //Add Invoice
        [HttpPost]
        [Route("AddInvoice")]
        public async Task<IActionResult> AddInvoiceAsync(Invoice invoice)
        {
            try
            {
                var newinvoice = new Invoice
                {
                    Invoice_ID = new Guid(),
                    Order_Line_Item_ID = invoice.Order_Line_Item_ID,
                    Payment_ID = invoice.Payment_ID,
                    Discount_Amount = invoice.Discount_Amount,
                    Delivery_Price = invoice.Delivery_Price,
                    Invoice_Total_exclVAT = invoice.Invoice_Total_exclVAT,
                    Invoice_Total_VAT = invoice.Invoice_Total_VAT,
                    Invoice_Total_inclVAT = invoice.Invoice_Total_inclVAT,
                    Customer_ID = invoice.Customer_ID,
                };

                _IPKPRepository.Add(newinvoice);
                await _IPKPRepository.SaveChangesAsync();

                await SendInvoice(newinvoice);

                return Ok(new Response { Status = "Success", Message = "Invoice Added To Database." }); 
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            
        }


        //Send Invoice
        [HttpPost]
        [Route("SendInvoice")]
        public async Task<IActionResult> SendInvoice(Invoice newinvoice)
        {
            var results = await _IPKPRepository.GetCustomerDetailsAsync(newinvoice.Customer_ID);
            if (results == null)
            {
                string userEmail = results.Email;

                try
                {
                    var subject = "It's Personal Invoice";
                    var message = "Dear " + results.FirstName + ",<br><br>" +
                    "We hope this message finds you well.<br><br>" +
                    "Thank you for using our services! Please find your invoice details below " + "<br><br>" +

                    "Discount Amount: R" + newinvoice.Discount_Amount + ".00" + "<br>" +
                    "Delivery Amount: R" + newinvoice.Delivery_Price + ".00" + "<br>" +
                    "Total Excluding Vat: R" + newinvoice.Invoice_Total_exclVAT + ".00" + "<br>" +
                    "Vat Amount: R" + newinvoice.Invoice_Total_VAT + ".00" + "<br><br>" +

                    "Total: R" + newinvoice.Invoice_Total_inclVAT + ".00" + "<br>" +

                    "Best regards,<br>Let's Get Personal";

                    _ = SendEmail(subject, message, userEmail);

                }
                catch (Exception)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Internal error12 occured. Please contact support");
                }
            }
            else
            {
                return NotFound("Does not exist");
            }

            //var user = await _userManager.FindByNameAsync(newinvoice.customer.Username);
            
            //if (newinvoice.customer.Username != null)
            //{
                
            //}

            return Ok(new Response { Status = "Success", Message = "Invoice Sent To Customer" });
        }

        private async Task SendEmail(/*string fromEmailAddress,*/ string subject, string message, string toEmailAddress)
        {
            string fromEmailAddress = "satahpick@gmail.com";
            //var fromAddress = new MailAddress(fromEmailAddress);
            var toAddress = new MailAddress(toEmailAddress);

            SmtpClient client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("ktlmamadi@gmail.com", "amojsldimzrbrtot"),
                EnableSsl = true
            };

            MailMessage msg = new MailMessage()
            {
                From = new MailAddress(fromEmailAddress),
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };

            msg.To.Add(toEmailAddress);

            try
            {
                client.Send(msg);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");

            }
        }


    }
}
