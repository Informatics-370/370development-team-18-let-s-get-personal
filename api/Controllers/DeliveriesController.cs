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
        // METHODS: Delivery crud, delivery company crud
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
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
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

                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddDelivery")]
        public async Task<IActionResult> AddDeliveryAsync(Delivery dvm)
        {            
            try
            {
                var delivery = new Delivery
                {
                    Delivery_Price = dvm.Delivery_Price,
                    //Delivery_Company = dvm.Delivery_Company_ID,
                    Delivery_ID = dvm.Delivery_ID,
                    Tracking_Number = dvm.Tracking_Number,
                };

                _IPKPRepository.Add(delivery);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
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
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Removed From Database." });
        }

        [HttpPut]
        [Route("UpdateDelivery")]
        public async Task<IActionResult> UpdateDeliveryAsync(Guid delivery_ID, Delivery dvm)
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
                    return Ok(new Response { Status = "Success", Message = "Delivery Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Saved To Database." });
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
        public async Task<IActionResult> AddDeliveryCompanyAsync(DeliveryCompanyViewModel dcvm)
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
        public async Task<IActionResult> UpdateDeliveryCompanyAsync(Guid delivery_Company_ID, DeliveryCompanyViewModel dcvm)
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
