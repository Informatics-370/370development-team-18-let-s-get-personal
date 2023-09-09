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
    public class AuditTrailController : ControllerBase
    {
        private readonly IIPKPRepository _IPKPRepository;
        public AuditTrailController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAdminAuditTrails")]
        public object GetAdminAuditTrails()
        {
            try
            {
                var results = _IPKPRepository.GetAdminAuditTrailDetails();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddAdminAuditTrail")]
        public async Task<IActionResult> AddAdminAuditTrail(AuditTrail auditTrail)
        {
            try
            {
                var trail = new AuditTrail
                {
                    Audit_Trail_ID = new Guid(),
                    Admin_ID = auditTrail.Admin_ID,
                    ActionDate = DateTime.Now,
                    ActionName = auditTrail.ActionName,
                };

                _IPKPRepository.Add(trail);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Audit Trail Added Successfully" });
        }

        [HttpGet]
        [Route("GetEmployeeAuditTrails")]
        public object GetEmployeeAuditTrails()
        {
            try
            {
                var results = _IPKPRepository.GetEmployeeAuditTrailDetails();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
            }
        }

        [HttpPost]
        [Route("AddEmployeeAuditTrail")]
        public async Task<IActionResult> AddEmployeeAuditTrail(AuditTrail auditTrail)
        {
            try
            {
                var trail = new AuditTrail
                {
                    Audit_Trail_ID = new Guid(),
                    Employee_ID = auditTrail.Employee_ID,
                    ActionDate = DateTime.Now,
                    ActionName = auditTrail.ActionName,
                };

                _IPKPRepository.Add(trail);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest(new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Audit Trail Added Successfully" });
        }
    }
}
