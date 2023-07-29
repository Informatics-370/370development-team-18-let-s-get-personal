using IPKP___API.Controllers.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using IPKP___API.Controllers.Models.Entities;
using IPKP___API.Controllers.Models.ViewModels;

namespace IPKP___API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public AddressController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

     

        [HttpGet]
        [Route("GetAdresses")]
        public async Task<IActionResult> GetAdresses()
        {
            try
            {
                var results = await _IPKPRepository.GetAllAddressesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
            //return Ok("Basket Gotten To Database.");
        }

        [HttpPost]
        [Route("AddAdress")]
        public async Task<IActionResult> AddAdressAsync(Address adress)
        {
            var newAddress = new Address
            {
                Address_ID = adress.Address_ID,
                Province_Name = adress.Province_Name,
                City_Name = adress.City_Name,
                Street = adress.Street,
                Number = adress.Number,
                Dwelling_Type = adress.Dwelling_Type,
                Unit_Number = adress.Unit_Number,
                Area_Code = adress.Area_Code,
            };
            try
            {
                _IPKPRepository.Add(newAddress);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Delivery Company Added To Database." });
        }

    }
}
