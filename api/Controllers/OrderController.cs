using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
  
        //add to order line item 
        [HttpPost]
        [Route("AddOrderLineItem")]
        public async Task<IActionResult> AddOrderLineItemAsync(Order_Line_Item oli)
        {
            try
            {
                var orderlineitem = new Order_Line_Item
                {
                    Order_Line_Item_ID = new Guid(),
                    Order_Request_ID = oli.Order_Request_ID,
                    Personalisation_ID = oli.Personalisation_ID,
                    Order_Line_Item_Quantity = oli.Order_Line_Item_Quantity,
                    Order_Line_Item_Total_Price = oli.Order_Line_Item_Total_Price,
                    Order_Status = "Requested",
                };

                _IPKPRepository.Add(orderlineitem);
                await _IPKPRepository.SaveChangesAsync();
                return Ok(orderlineitem.Order_Line_Item_Quantity);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Order Request Added To Database." });
        }

        //get requested orders 
        [HttpGet]
        [Route("GetRequestedOrders")]
        public object GetRequestedOrders()
        {           
            try
            {
                string orderStatus = "Requested";
                var requests = _IPKPRepository.GetOrderLineItembyStatus(orderStatus); //GetOrderRequests();

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    return Ok(requests);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //get orders in progress
        [HttpGet]
        [Route("GetOrdersInProgress")]
        public object GetOrdersInProgress()
        {            
            try
            {
                string orderStatus = "Accepted";
                var requests = _IPKPRepository.GetOrderLineItembyStatus(orderStatus);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Orders were found." });
                }
                else
                {
                    return Ok(requests);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //accept order
        [HttpPut]
        [Route("AcceptOrder/{order_Line_Item_ID}")]
        public async Task<ActionResult<Order_Line_Item>> AcceptOrder(Guid order_Line_Item_ID, OrderLineItemVM orli)
        {
            try
            {
                var requests = await _IPKPRepository.GetOrderLineItemByID(order_Line_Item_ID);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Orders were found." });
                }
                else
                {
                    requests.Order_Status = "Accepted";
                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(requests);
                    }
                    //return Ok(requests);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return BadRequest(new Response { Status = "Error", Message = "Your request is invalid." });
        }


        //send order to delivery
        [HttpPut]
        [Route("SendOutDelivery/{order_Line_Item_ID}")]
        public async Task<ActionResult<Order_Line_Item>> SendOutDelivery(Guid order_Line_Item_ID, Order_Line_Item dvm)
        {
            try
            {
                var requests = await _IPKPRepository.GetOrderLineItemByID(order_Line_Item_ID);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "No Orders were found." });
                }
                else
                {
                    requests.Order_Status = "Out";
                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(requests);
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return BadRequest(new Response { Status = "Error", Message = "Your request is invalid." });
        }

        //1. change order line status
        //2. add new order item 
        [HttpPut]
        [Route("ProcessOrder/{order_Line_Item_ID}")]
        public async Task<ActionResult<Order_Line_Item>> ProcessOrder(Guid order_Line_Item_ID, OrderLineItemVM orli)
        {
            try
            {
                var requests = await _IPKPRepository.GetOrderLineItemByID(order_Line_Item_ID);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    requests.Order_Status = "Completed";
                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(requests);
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return BadRequest(new Response { Status = "Error", Message = "Your request is invalid." });
        }

        //decrease quantity
        [HttpPut]
        [Route("DecreaseStockItemQuantity/{stock_Item_ID}")]
        public async Task<IActionResult> DecreaseStockItemQuantity(Guid stock_Item_ID, StockItemViewModel sivm)
        {
            try
            {
                var existingStockItem = await _IPKPRepository.GetStockItemDetailsAsync(stock_Item_ID);
                //var orderQuantity = AddOrderLineItemAsync();

                if (existingStockItem == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item" + stock_Item_ID });

                existingStockItem.Stock_Item_Quantity = sivm.Stock_Item_Quantity;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Stock Item Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Saved To Database." });
        }

        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> AddOrder(Order o)
        {
            try
            {
                var order = new Order
                {
                    Order_ID = new Guid(),
                    Order_Notes = o.Order_Notes,
                    Order_Line_Item_ID = o.Order_Line_Item_ID,
                };

                _IPKPRepository.Add(order);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Order Request Added To Database." });
        }

        [HttpGet]
        [Route("GetSales")]
        public object GetSales()
        {
            try
            {
                //string orderStatus = "Completed";
                var requests = _IPKPRepository.GetAllStockItemsAsync();

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Orders were found." });
                }
                else
                {
                    return Ok(requests);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetAllOrders")]
        public object GetAllOrders()
        {
            try
            {
                //string orderStatus = "Requested";
                var requests = _IPKPRepository.GetAllOrderLineItems(); //GetOrderRequests();

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    return Ok(requests);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

    }
}
