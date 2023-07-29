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
                return Ok(results);
                //if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" });


            }
          catch (Exception)
          {
            return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
          }
        }

        [HttpGet]
        [Route("GetDelivery/{delivery_ID}")]
        public async Task<IActionResult> GetDeliveryDetailsAsync(int delivery_ID)
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
        public async Task<IActionResult> AddDeliveryAsync(DeliveryViewModel dvm)
        {
            var delivery = new Delivery
            {
                Delivery_Address = dvm.Delivery_Address,
                Delivery_Price = dvm.Delivery_Price,
                Delivery_Company   = dvm.Delivery_Company_ID,
                Delivery_ID = dvm.Delivery_ID,
                Tracking_Number = dvm.Tracking_Number,                
            };
            var deliverAddress = new Address
            {
                Address_ID = dvm.Delivery_Address.Address_ID,
                Province_Name = dvm.Delivery_Address.Province_Name,
                City_Name = dvm.Delivery_Address.City_Name,


            };

            try
            {
                _IPKPRepository.Add(delivery);
                _IPKPRepository.Add(deliverAddress);
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
        public async Task<IActionResult> ReceiveDeliveryAsync(int delivery_ID)
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
