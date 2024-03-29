using IPKP___API.Controllers.Models;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
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
        Delivery_ID = dvm.Delivery_ID,
        Delivery_Company_ID = dvm.Delivery_Company_ID,
        Delivery_Address = dvm.Delivery_Address,
        Delivery_Price = dvm.Delivery_Price,
        Tracking_Number = dvm.Tracking_Number
      };
      try
      {
        _IPKPRepository.Add(delivery);
        await _IPKPRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Delivery Added To Database.");
    }

    [HttpPut]
    [Route("UpdateDelivery")]
    public async Task<IActionResult> UpdateDeliveryAsync(Guid delivery_ID, DeliveryViewModel dvm)
    {
      try
      {
        var existingDelivery = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

        if (existingDelivery == null) return NotFound("Could Not Find Delivery" + delivery_ID);

        existingDelivery.Delivery_Company_ID = dvm.Delivery_Company_ID;
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
    }

    [HttpDelete]
    [Route("DeleteDelivery")]
    public async Task<IActionResult> DeleteDeliveryAsync(Guid delivery_ID)
    {
      try
      {
        var existingDelivery = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

        if (existingDelivery == null) return NotFound("Could Not Find Delivery" + delivery_ID);

        _IPKPRepository.Delete(existingDelivery);

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Delivery Removed Successfully");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
      return Ok("Delivery Removed From Database.");
    }
  }
}
