using IPKP___API.Controllers.Models.Repository;
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
  public class OrderController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public OrderController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }

    [HttpGet]
    [Route("GetAllOrders")]
    public async Task<IActionResult> GetAllOrdersAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllOrdersAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpGet]
    [Route("GetOrder")]
    public async Task<IActionResult> GetOrderDetailsAsync(Guid order_ID)
    {
      try
      {
        var results = await _IPKPRepository.GetOrderDetailsAsync(order_ID);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpGet]
    [Route("GetAllOrderStatuses")]
    public async Task<IActionResult> GetAllOrderStatusesAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllOrderStatusesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpPatch]
    [Route("ProcessOrder")]
    public async Task<IActionResult> ProcessOrderAsync(Guid order_ID)
    {
      try
      {
        var status = await _IPKPRepository.GetOrderStatusByNameAsync("In Progress");
        var existingOrder = await _IPKPRepository.GetOrderDetailsAsync(order_ID);
        existingOrder.Order_Status = status;
        return Ok("Order processing...");
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpPatch]
    [Route("CompleteOrder")]
    public async Task<IActionResult> CompleteOrderAsync(Guid order_ID)
    {
      try
      {
        var status = await _IPKPRepository.GetOrderStatusByNameAsync("Complete");
        var existingOrder = await _IPKPRepository.GetOrderDetailsAsync(order_ID);
        existingOrder.Order_Status = status;
        return Ok("Order complete...");
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }
  }
}
