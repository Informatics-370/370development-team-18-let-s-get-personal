using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
  //[Authorize(Roles = User_Role.Admin)]
  public class DeliveriesController : ControllerBase
  {
        private readonly IIPKPRepository _IPKPRepository;
        public DeliveriesController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }
        [HttpGet]
        [Route("GetAllDeliveries")]

        public async Task<IActionResult> GetAllDeliveriesAsync()
        {

            try
            {
                var results = await _IPKPRepository.GetAllDeliveriesAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" });
                return Ok(results);
                
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpGet]
        [Route("GetDelivery/{delivery_ID}")]
        public async Task<IActionResult> GetDeliveryDetailsAsync(Guid delivery_ID)
        {

          try
          {
                var results = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);
                return Ok(results);
          }
          catch (Exception)
          {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
          }
        }

        [HttpPost]
        [Route("AddDelivery")]
        public async Task<IActionResult> AddDeliveryAsync(Delivery dvm)
        {
            var delivery = new Delivery
            {
                Delivery_Price = dvm.Delivery_Price,
                //Delivery_Company = dvm.Delivery_Company_ID,
                Delivery_ID = dvm.Delivery_ID,
                Tracking_Number = dvm.Tracking_Number,
            };
       

            try
            {
                _IPKPRepository.Add(delivery);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
          
            return Ok(new Response { Status = "Success", Message = "Delivery Added To Database." });
        }

   

        [HttpDelete]
        [Route("ReceiveDelivery/{delivery_ID}")]
        public async Task<IActionResult> ReceiveDeliveryAsync(Guid delivery_ID)
        {
          try
          {
            var existingDelivery = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

            if (existingDelivery == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" + delivery_ID });

            _IPKPRepository.Delete(existingDelivery);

            if (await _IPKPRepository.SaveChangesAsync())
            {
              return Ok(new Response { Status = "Success", Message = "Delivery Received Successfully" });
            }
          }
          catch (Exception)
          {
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
          }
          return Ok(new Response { Status = "Success", Message = "Delivery Removed From Database." });
        }
  }
    /*[HttpPut]
   [Route("UpdateDelivery")]
   public async Task<IActionResult> UpdateDeliveryAsync(int delivery_ID, DeliveryViewModel dvm)
   {
     try
     {
       var existingDelivery = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

       if (existingDelivery == null) return NotFound("Could Not Find Delivery" + delivery_ID);

       existingDelivery.Delivery_Company = dvm.Delivery_Company_ID;
       existingDelivery.Delivery_Address = dvm.Delivery_Address;
       existingDelivery.Delivery_Price = dvm.Delivery_Price;
       existingDelivery.Tracking_Number = dvm.Tracking_Number;

       if (await _IPKPRepository.SaveChangesAsync())
       {
         return Ok("Delivery Updated Successfully");
       }
     }
     catch (Exception)
     {
       return BadRequest("Invalid Transaction");
     }
     return Ok("Delivery Saved To Database.");
   }*/
}
