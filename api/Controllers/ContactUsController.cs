﻿using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.Repository;
using IPKP___API.Controllers.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public ContactUsController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        //Add contact
        [HttpPost]
        [Route("AddMessageRequest")]
        public async Task<IActionResult> AddMessageRequest(ContactUs contactus) //[FromForm] IFormCollection formData
        {
            try
            {
                var message = new ContactUs
                {
                    Contact_Us_ID = new Guid(),
                    Contact_Us_Email = contactus.Contact_Us_Email,
                    Contact_Us_Name = contactus.Contact_Us_Name,
                    Contact_Us_Phone = contactus.Contact_Us_Phone,
                };
                _IPKPRepository.Add(message);
                await _IPKPRepository.SaveChangesAsync();

                return Ok(message);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //Get all requests
        [HttpGet]
        [Route("GetAllMessageRequests")]
        public async Task<IActionResult> GetAllMessageRequests()
        {
            try
            {
                var results = await _IPKPRepository.GetAllContactUsAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find any Message Requests" });
                return Ok(results);
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetMessageRequest/{contact_Us_ID}")]
        public async Task<IActionResult> GetStockTypeDetailsAsync(Guid contact_Us_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetContactUsByID(contact_Us_ID);
                if (results == null)
                {
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Messagee" });
                }
                else
                {
                    return Ok(results);
                }

            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }


    }
}