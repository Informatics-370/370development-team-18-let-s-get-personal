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
  public class PersonalisationController : ControllerBase
  {
        private readonly IIPKPRepository _IPKPRepository;
        public PersonalisationController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetPersonalisation/{personalisation_ID}")]
        public async Task<IActionResult> GetPersonalisationAsync(Guid personalisation_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddPersonalisation")]
        public async Task<IActionResult> AddPersonalisationAsync(PersonalisationDesignViewModel pdvm)
        {
            var personalisationDesign = new Personalisation_Design
            {
                ItemColour = pdvm.ItemColour,
                DesignText = pdvm.DesignText,
                TextPosition = pdvm.TextPosition,
                TextColour = pdvm.TextColour
            };
            try
            {
                _IPKPRepository.Add(personalisationDesign);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }

            return Ok(new Response { Status = "Success", Message = "Personalisation Design Added To Database." });
        }

        [HttpPut]
        [Route("UpdatePersonalisation/{personalisation_ID}")]
        public async Task<IActionResult> UpdatePersonalisationAsync(Guid personalisation_ID, PersonalisationDesignViewModel pdvm)
        {
            try
            {
                var existingPersonalisationDesign = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);

                if (existingPersonalisationDesign == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

                existingPersonalisationDesign.ItemColour = pdvm.ItemColour;
                existingPersonalisationDesign.DesignText = pdvm.DesignText;
                existingPersonalisationDesign.TextPosition = pdvm.TextPosition;
                existingPersonalisationDesign.TextColour = pdvm.TextColour;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Personalisation Design Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Personalisation Design Saved To Database." });
        }

        [HttpDelete]
        [Route("DeletePersonalisation/{personalisation_ID}")]
        public async Task<IActionResult> DeletePersonalisationAsync(Guid personalisation_ID)
        {
            try
            {
                var existingPersonalisationDesign = await _IPKPRepository.GetPersonalisationAsync(personalisation_ID);

                //if (existingPersonalisationDesign == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Personalisation Design" + personalisation_ID });

                _IPKPRepository.Delete(existingPersonalisationDesign);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Personalisation Design Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Removed From Database." });
        }
  }
}
