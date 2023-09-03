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
        //add delivery address, add order request, add to order request
        private readonly IIPKPRepository _IPKPRepository;
        public OrderRequestController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }

        //add delivery address
        [HttpPost]
        [Route("AddDeliveryAdress")]
        public async Task<IActionResult> AddDeliveryAdressAsync(Delivery_Address da)
        {
            try
            {
                var deladdress = new Delivery_Address
                {
                    Delivery_Address_ID = new Guid(),                    
                    StreetName = da.StreetName,
                    StreetNumber = da.StreetNumber,
                    Dwelling_Type = da.Dwelling_Type,
                    Unit_Number = da.Unit_Number,
                    City = da.City,
                    Province = da.Province,
                    AreaCode = da.AreaCode,
                };

                _IPKPRepository.Add(deladdress);
                //await _IPKPRepository.SaveChangesAsync();

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(deladdress);
                }                
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Address Added To Database." });
        }

        //add delivery request
        [HttpPost]
        [Route("AddDeliveryRequest")]
        public async Task<IActionResult> AddDeliveryRequestAsync(Delivery d)
        {
            try
            {
                var deliveryrequest = new Delivery
                {
                    Delivery_ID = d.Delivery_ID,
                    Delivery_Address_ID = d.Delivery_Address_ID,
                    Delivery_Company_ID = d.Delivery_Company_ID,
                    //Delivery_Price = d.Delivery_Price,
                    Delivery_Status = "Requested",
                };

                _IPKPRepository.Add(deliveryrequest);
                //await _IPKPRepository.SaveChangesAsync();
                if(await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(deliveryrequest);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Request Added To Database." });
        }

        [HttpGet]
        [Route("GetDeliveryByID/{deliveryID}")]
        public object GetDeliveryByID(Guid deliveryID)
        {
            try
            {
                var delivery = _IPKPRepository.GetDeliveryByID(deliveryID);
                if (delivery == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    return Ok(delivery);
                }
            }
            catch
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            //return Ok(new Response { Status = "Success", Message = "Delivery Request Added To Database." });
        }

        

        //add order request
        [HttpPost]
        [Route("AddOrderRequest")]
        public async Task<IActionResult> AddOrderRequestAsync(Order_Request or)
        {
            try
            {
                var newOrderRequest = new Order_Request
                {
                    Order_Request_ID = new Guid(),
                    Customer_ID = or.Customer_ID,
                    Delivery_ID = or.Delivery_ID,
                    Order_Request_Date = DateTime.Now,
                    Order_Request_Total_Price = or.Order_Request_Total_Price,
                    
                };
           
                _IPKPRepository.Add(newOrderRequest);
                //await _IPKPRepository.SaveChangesAsync();
                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(newOrderRequest);
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Order Request Added To Database." });
        }
        
  }
}
