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
          public string StockItemName { get; set; }
          public string StockItemType { get; set; }
          public string StockItemColour { get; set; }
          public string StockItemSize { get; set; }
          public Personalisation_Design PersonalisationDesign { get; set; }
          public int StockItemQuantity {get; set;}
        }

        [HttpPost]
        [Route("AddOrderRequest")]
        public async Task<IActionResult> AddOrderRequestAsync(Basket_Order_Request orderRequest)
        {
                //Customer currentUser;
              var newOrderRequest = new Order_Request
              {
                //Customer = currentUser,
                Order_Request_Date = DateTime.Today,
                IsAccepted = false
              };

              newRequestDetails.StockItemName = orderRequest.StockItemName;
              newRequestDetails.StockItemType = orderRequest.StockItemType;
              newRequestDetails.StockItemColour = orderRequest.StockItemColour;
              newRequestDetails.StockItemSize = orderRequest.StockItemSize;
              newRequestDetails.PersonalisationDesign = orderRequest.PersonalisationDesign;
              newRequestDetails.StockItemQuantity = orderRequest.StockItemQuantity;

            try
            {
                _IPKPRepository.Add(newOrderRequest);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Order Request Added To Database." });
        }

        [HttpGet]
        [Route("GetOrderRequest/{order_Request_ID}")]
        public async Task<IActionResult> GetOrderRequestAsync(Guid order_Request_ID)
        {

            try
            {
                var results = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Order Request" });

                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetAllOrderRequests")]
        public async Task<IActionResult> GetAllOrderRequestsAsync()
        {
              try
              {
                var results = await _IPKPRepository.GetAllOrderRequestsAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Order Request"  });

                return Ok(results);
              }
              catch (Exception)
              {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
              }
        }

        [HttpPatch]
        [Route("AcceptOrderRequest/{order_Request_ID}")]
        public async Task<IActionResult> AcceptOrderRequestAsync(Guid order_Request_ID)
        {
            try
            {
                var existingOrderRequest = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);

                if (existingOrderRequest == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Order Request" + order_Request_ID });

                existingOrderRequest.IsAccepted = true;
                var results = await _IPKPRepository.GetStockItemByName(newRequestDetails.StockItemName);
                var newOrderLineItem = new Order_Line_Item
                {
                  Order_Request = existingOrderRequest,
                  Stock_Item = results,
                  Personalisation_Design = newRequestDetails.PersonalisationDesign,
                  Order_Line_Item_Quantity = newRequestDetails.StockItemQuantity
                };
                _IPKPRepository.Delete(existingOrderRequest);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Order Request Accepted Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
          return Ok(new Response { Status = "Success", Message = "Order Request Accepted And Saved To Database." });
        }

        [HttpPatch]
        [Route("RejectOrderRequest/{order_Request_ID}")]
        public async Task<IActionResult> RejectOrderRequestAsync(Guid order_Request_ID)
        {

            try
            {
                var exisitingOrderRequest = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);
                if (exisitingOrderRequest == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Order Request" + order_Request_ID });

                exisitingOrderRequest.IsAccepted = false;
                _IPKPRepository.Delete(exisitingOrderRequest);
                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Order Request Rejected Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Order Request Rejected In Database." });
        }

        [HttpDelete]
        [Route("DeleteOrderRequest/{order_Request_ID}")]
        public async Task<IActionResult> DeleteOrderRequestAsync(Guid order_Request_ID)
        {

            try
            {
                var existingOrderRequest = await _IPKPRepository.GetOrderRequestAsync(order_Request_ID);

                if (existingOrderRequest == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Order Request" + order_Request_ID });

                _IPKPRepository.Delete(existingOrderRequest);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Order Request Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return Ok(new Response { Status = "Success", Message = "Order Request Removed From Database." });
        }
  }
}
