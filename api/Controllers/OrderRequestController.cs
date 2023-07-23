using IPKP___API.Controllers.Models.Entities;
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
  public class OrderRequestController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public Basket_Order_Request newRequestDetails = new Basket_Order_Request();
    public OrderRequestController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }
    public class Basket_Order_Request
    {
      public string stockItemName { get; set; }
      public string stockItemType { get; set; }
      public string stockItemColour { get; set; }
      public string stockItemSize { get; set; }
      public Personalisation_Design personalisationDesign { get; set; }
      public int stockItemQuantity {get; set;}
    }

    [HttpPost]
    [Route("AddOrderRequest")]
    public async Task<IActionResult> AddOrderRequestAsync(Basket_Order_Request orderRequest, Customer currentUser)
    {
      var newOrderRequest = new Order_Request
      {
        Customer = currentUser,
        Order_Request_Date = DateTime.Today,
        IsAccepted = false
      };

      newRequestDetails.stockItemName = orderRequest.stockItemName;
      newRequestDetails.stockItemType = orderRequest.stockItemType;
      newRequestDetails.stockItemColour = orderRequest.stockItemColour;
      newRequestDetails.stockItemSize = orderRequest.stockItemSize;
      newRequestDetails.personalisationDesign = orderRequest.personalisationDesign;
      newRequestDetails.stockItemQuantity = orderRequest.stockItemQuantity;

      try
      {
        _IPKPRepository.Add(newOrderRequest);
        await _IPKPRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Order Request Added To Database.");
    }

    [HttpGet]
    [Route("GetOrderRequest")]
    public async Task<IActionResult> GetOrderRequestAsync(Guid order_Request_ID)
    {
      try
      {
        var results = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpGet]
    [Route("GetAllOrderRequests")]

    public async Task<IActionResult> GetAllOrderRequestsAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllOrderRequestsAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpPatch]
    [Route("AcceptOrderRequest")]
    public async Task<IActionResult> AcceptOrderRequestAsync(Guid order_Request_ID)
    {
      try
      {
        var existingOrderRequest = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);
        if (existingOrderRequest == null) return NotFound("Could Not Find Order Request" + order_Request_ID);
        existingOrderRequest.IsAccepted = true;
        var results = await _IPKPRepository.GetStockItemByName(newRequestDetails.stockItemName);
        var newOrderLineItem = new Order_Line_Item
        {
          Order_Request = existingOrderRequest,
          Stock_Item = results,
          Personalisation_Design = newRequestDetails.personalisationDesign,
          Order_Line_Item_Quantity = newRequestDetails.stockItemQuantity
        };
        _IPKPRepository.Delete(existingOrderRequest);
        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Order Request Accepted Successfully");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Order Request Accepted And Saved To Database.");
    }

    [HttpPatch]
    [Route("RejectOrderRequest")]
    public async Task<IActionResult> RejectOrderRequestAsync(Guid order_Request_ID)
    {
      try
      {
        var exisitingOrderRequest = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);
        exisitingOrderRequest.IsAccepted = false;
        _IPKPRepository.Delete(exisitingOrderRequest);
        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Order Request Rejected Successfully");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Order Request Rejected In Database.");
    }

    [HttpDelete]
    [Route("DeleteOrderRequest")]
    public async Task<IActionResult> DeleteOrderRequestAsync(Guid order_Request_ID)
    {
      try
      {
        var existingOrderRequest = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);

        if (existingOrderRequest == null) return NotFound("Could Not Find Order Request" + order_Request_ID);

        _IPKPRepository.Delete(existingOrderRequest);

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Order Request Removed Successfully");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
      return Ok("Order Request Removed From Database.");
    }
  }
}
