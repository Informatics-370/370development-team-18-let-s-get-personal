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
    public class DeliveriesController : ControllerBase
    {
        // METHODS: getting orders by status and changing status, delivery company crud
        private readonly IIPKPRepository _IPKPRepository;
        public DeliveriesController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        //get requested deliveries
        [HttpGet]
        [Route("GetRequestedDeliveries")]
        public object GetRequestedDeliveries()
        {
            try
            {
                string orderStatus = "Requested";
                var requests = _IPKPRepository.GetDeliveryBySatus(orderStatus);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Deliveries were found." });
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

        //change status to out for delivery
        [HttpPut]
        [Route("SendOutDelivery/{delivery_ID}")]
        public async Task<ActionResult<Delivery>> SendOutDelivery(Guid delivery_ID, DeliveryVM dvm)
        {
            try
            {
                var requests = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    requests.Delivery_Status = "Out";
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

        //get "out" deliveries
        [HttpGet]
        [Route("GetOutDeliveries")]
        public object GetOutDeliveries()
        {
            try
            {
                string orderStatus = "Out";
                var requests = _IPKPRepository.GetDeliveryBySatus(orderStatus);

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

        //change status to recieved 
        [HttpPut]
        [Route("ChangeStatusToRecieved/{delivery_ID}")]
        public async Task<ActionResult<Delivery>> ChangeStatusToRecieved(Guid delivery_ID, DeliveryVM dvm)
        {
            try
            {
                var requests = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    requests.Delivery_Status = "Received";
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

        //change status to failed
        [HttpPut]
        [Route("ChangeStatusToFailed/{delivery_ID}")]
        public async Task<ActionResult<Delivery>> ChangeStatusToFailed(Guid delivery_ID, DeliveryVM dvm)
        {
            try
            {
                var requests = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

                if (requests == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "No Stock Items were found." });
                }
                else
                {
                    requests.Delivery_Status = "Failed";
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

        //get previous successful deliveries
        [HttpGet]
        [Route("GetSuccessfulDeliveries")]
        public object GetSuccessfulDeliveries()
        {
            try
            {
                string orderStatus = "Recieved";
                var requests = _IPKPRepository.GetDeliveryBySatus(orderStatus);

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

        //get previous unsuccessful deliveries
        [HttpGet]
        [Route("GetUnsuccessfulDeliveries")]
        public object GetUnsuccessfulDeliveries()
        {
            try
            {
                string orderStatus = "Failed";
                var requests = _IPKPRepository.GetDeliveryBySatus(orderStatus);

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


        //************* Delivery Companies *************\\
        [HttpGet]
        [Route("GetAllDeliveryCompanies")]
        public async Task<IActionResult> GetAllDeliveryCompaniesAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllDeliveryCompaniesAsync();
                if (results == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery Company" });
                }
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetDeliveryCompany/{delivery_Company_ID}")]
        public async Task<IActionResult> GetDeliveryCompanyDetailsAsync(Guid delivery_Company_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetDeliveryCompanyDetailsAsync(delivery_Company_ID);
                if (results == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" });
                }
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

        }
        
        [HttpPost]
        [Route("AddDeliveryCompany")]
        public async Task<IActionResult> AddDeliveryCompanyAsync(Delivery_Company dcvm)
        {
            try
            {
                var deliveryCompany = new Delivery_Company
                {
                    Delivery_Company_ID = dcvm.Delivery_Company_ID,
                    Delivery_Company_Name = dcvm.Delivery_Company_Name
                };
                _IPKPRepository.Add(deliveryCompany);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Company Added To Database." });
        }


        [HttpPut]
        [Route("UpdateDeliveryCompany/{delivery_Company_ID}")]
        public async Task<IActionResult> UpdateDeliveryCompanyAsync(Guid delivery_Company_ID, Delivery_Company dcvm)
        {
            try
            {
                var existingDeliveryCompany = await _IPKPRepository.GetDeliveryCompanyDetailsAsync(delivery_Company_ID);

                if (existingDeliveryCompany == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery Company" + delivery_Company_ID });

                existingDeliveryCompany.Delivery_Company_Name = dcvm.Delivery_Company_Name;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Delivery Company Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Company Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteDeliveryCompany/{delivery_Company_ID}")]
        public async Task<IActionResult> DeleteDeliveryCompanyAsync(Guid delivery_Company_ID)
        {
            try
            {
                var existingDeliveryCompany = await _IPKPRepository.GetDeliveryCompanyDetailsAsync(delivery_Company_ID);

                if (existingDeliveryCompany == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery Company" + delivery_Company_ID });

                _IPKPRepository.Delete(existingDeliveryCompany);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Delivery Company Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Company Removed From Database." });
        }
    }
}
//[HttpPut]
//[Route("UpdateDelivery")]
//public async Task<IActionResult> UpdateDeliveryAsync(Guid delivery_ID, Delivery dvm)
//{
//    try
//    {
//        var existingDelivery = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

//        if (existingDelivery == null) return NotFound("Could Not Find Delivery" + delivery_ID);

//        existingDelivery.Delivery_Company_ID = dvm.Delivery_Company_ID;
//        existingDelivery.Delivery_Address = dvm.Delivery_Address;
//        //existingDelivery.Delivery_Price = dvm.Delivery_Price;
//        existingDelivery.Tracking_Number = dvm.Tracking_Number;

//        if (await _IPKPRepository.SaveChangesAsync())
//        {
//            return Ok(new Response { Status = "Success", Message = "Delivery Updated Successfully" });
//        }
//    }
//    catch (Exception)
//    {
//        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
//    }
//    return Ok(new Response { Status = "Success", Message = "Delivery Saved To Database." });
//}



//[HttpDelete]
//[Route("ReceiveDelivery/{delivery_ID}")]
//public async Task<IActionResult> ReceiveDeliveryAsync(Guid delivery_ID)
//{
//    try
//    {
//        var existingDelivery = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);

//        if (existingDelivery == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" + delivery_ID });

//        _IPKPRepository.Delete(existingDelivery);

//        if (await _IPKPRepository.SaveChangesAsync())
//        {
//            return Ok(new Response { Status = "Success", Message = "Delivery Received Successfully" });
//        }
//    }
//    catch (Exception)
//    {
//        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
//    }
//    return Ok(new Response { Status = "Success", Message = "Delivery Removed From Database." });
//}


//[HttpGet]
//[Route("GetAllDeliveries")]
//public async Task<IActionResult> GetAllDeliveriesAsync()
//{

//    try
//    {
//        var results = await _IPKPRepository.GetAllDeliveriesAsync();
//        if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Delivery" });
//        return Ok(results);

//    }
//    catch (Exception)
//    {
//        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
//    }
//}

//[HttpGet]
//[Route("GetDelivery/{delivery_ID}")]
//public async Task<IActionResult> GetDeliveryDetailsAsync(Guid delivery_ID)
//{

//    try
//    {
//        var results = await _IPKPRepository.GetDeliveryDetailsAsync(delivery_ID);
//        return Ok(results);
//    }
//    catch (Exception)
//    {

//        return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
//    }
//}