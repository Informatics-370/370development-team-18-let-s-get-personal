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
    public class ManageAccessController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public ManageAccessController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }


        //add access when adding employee
        [HttpPost]
        [Route("AddAccess")]
        public async Task<IActionResult> AddAccess(ManageAccess access)
        {
            try
            {
                var manageAccess = new ManageAccess
                {
                    
                };

                _IPKPRepository.Add(manageAccess);
                await _IPKPRepository.SaveChangesAsync();

                return Ok(manageAccess); 
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        //get access by employee ID 
    }
}
