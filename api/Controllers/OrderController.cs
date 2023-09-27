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


        [HttpPost]
        [Route("PlaceOrder")]
        public async Task<IActionResult> PlaceOrderT(OrderT d)
        {
            try
            {

                var deladdress = new Delivery_Address
                {
                    Delivery_Address_ID = new Guid(),
                    StreetName = d.deliveryAddress.StreetName,
                    StreetNumber = d.deliveryAddress.StreetNumber,
                    Dwelling_Type = d.deliveryAddress.Dwelling_Type,
                    Unit_Number = d.deliveryAddress.Unit_Number,
                    City = d.deliveryAddress.City,
                    Province = d.deliveryAddress.Province,
                    AreaCode = d.deliveryAddress.AreaCode,
                };

                _IPKPRepository.Add(deladdress);
                Boolean results = await _IPKPRepository.SaveChangesAsync();


                var deliveryrequest = new Delivery
                {
                    Delivery_ID = new Guid(),
                    Delivery_Address_ID = deladdress.Delivery_Address_ID,
                    Delivery_Company_ID = new Guid(d.deliveryCompanyID),
                    // Delivery_Price = d.Delivery_Price,
                    Delivery_Status = "Requested",
                };

                _IPKPRepository.Add(deliveryrequest);
                Boolean results1 = await _IPKPRepository.SaveChangesAsync();

                var newOrderRequest = new Order_Request
                {
                    Order_Request_ID = new Guid(),
                    Customer_ID = new Guid(d.customerID),
                    Delivery_ID = deliveryrequest.Delivery_ID,
                    Order_Request_Date = DateTime.Now,
                    Order_Request_Total_Price = d.price,

                };

                _IPKPRepository.Add(newOrderRequest);
                Boolean results2 = await _IPKPRepository.SaveChangesAsync();


                await _IPKPRepository.SaveChangesAsync();

                var newdesigntext = new Design_Text();
                var newdesignimage = new Design_Image();
                var orderlineitem = new Order_Line_Item();
                var personalisationDesign = new Personalisation_Design();

                for (var i = 0; i < d.basketItems.Count; i++)
                {

                    newdesigntext = new Design_Text
                    {
                        Design_Text_ID = new Guid(),
                        Design_Text_Description = d.basketItems[i].personalization.personalizationText
                    };

                    _IPKPRepository.Add(newdesigntext);
                    await _IPKPRepository.SaveChangesAsync();

                    newdesignimage = new Design_Image
                    {
                        Design_Image_ID = new Guid(),
                        Image_File = d.basketItems[i].personalization.img,
                    };
                    _IPKPRepository.Add(newdesignimage);
                    await _IPKPRepository.SaveChangesAsync();


                    personalisationDesign = new Personalisation_Design
                    {
                        Personalisation_Design_ID = new Guid(),
                        //Personalisation_Design_Price = personalisation.Personalisation_Design_Price,
                        Stock_Item_ID = d.basketItems[i].stock_Item.Stock_Item_ID,
                        Design_Text_ID = newdesigntext.Design_Text_ID,
                        Design_Image_ID = newdesignimage.Design_Image_ID,
                    };
                    _IPKPRepository.Add(personalisationDesign);
                    await _IPKPRepository.SaveChangesAsync();

                    orderlineitem = new Order_Line_Item
                    {
                        Order_Line_Item_ID = new Guid(),
                        Order_Request_ID = newOrderRequest.Order_Request_ID,
                        Personalisation_ID = personalisationDesign.Personalisation_Design_ID,
                        Order_Line_Item_Quantity = d.basketItems.Count,
                        Order_Line_Item_Total_Price = d.price,
                        Order_Status = "Requested",
                    };

                    _IPKPRepository.Add(orderlineitem);
                    await _IPKPRepository.SaveChangesAsync();


                }

                await _IPKPRepository.SaveChangesAsync();

                //_IPKPRepository.Add(orderlineitem);
                await _IPKPRepository.SaveChangesAsync();
                return Ok(new Response { Status = "Success", Message = "Order Added Successfully." });

            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

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

                return Ok(orderlineitem); //.Order_Line_Item_Quantity
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            //return Ok(new Response { Status = "Success", Message = "Order Request Added To Database." });
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
                //var requests = _IPKPRepository.GetAllOrderLineItems();

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

        [HttpGet]
        [Route("GetOrderByID/{order_Line_Item_ID}")]
        public object GetOrderByID(Guid order_Line_Item_ID)
        {
            try
            {
                var requests = _IPKPRepository.GetOrderLineDetailsByID(order_Line_Item_ID); //GetOrderRequests();

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Order Items were found." });
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

        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> AddOrder(Order o)
        {
            try
            {
                var order = new Order
                {
                    Order_ID = new Guid(),
                    Stock_Item_ID = o.Stock_Item_ID,
                    Customer_ID = o.Customer_ID,
                    Order_Quantity = o.Order_Quantity,
                    Order_Completed_Date = DateTime.Now,
                    Stock_Item_Name = o.Stock_Item_Name,
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


        [HttpDelete]
        [Route("ProcessOrder/{order_Line_Item_ID}")]
        public async Task<IActionResult> ProcessOrder(Guid order_Line_Item_ID)
        {
            //delete 
            try
            {
                var order = await _IPKPRepository.GetOrderLineItemByID(order_Line_Item_ID);

                if (order == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "No Order Items were found." });
                }
                else
                {
                    _IPKPRepository.Delete(order);
                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(order);
                    }
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return BadRequest(new Response { Status = "Error", Message = "Your request is invalid." });
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
