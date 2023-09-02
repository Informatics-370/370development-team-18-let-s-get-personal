using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public SalesController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpPost]
        [Route("AddSale")]
        public async Task<IActionResult> AddSaleAsync(Payment sale)
        {
            try
            {
                var newsale = new Payment
                {
                    Payment_ID = new Guid(),
                    Sale_Date = DateTime.Now,
                    Payment_Amount = sale.Payment_Amount,
                    Sale_Quantity = sale.Sale_Quantity,
                    Customer_UserName = sale.Customer_UserName,
                    Stock_Item_ID =sale.Stock_Item_ID,
                };

                _IPKPRepository.Add(newsale);
                //await _IPKPRepository.SaveChangesAsync();

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(newsale);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Address Added To Database." });
        }

        [HttpGet]
        [Route("GetAllSales")]
        public async Task<IActionResult> GetAllSalesAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAlPaymentsAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item Colour" });

                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }
    }
}
