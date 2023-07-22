using IPKP___API.Controllers.Models.Repository;
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
  public class EmployeeController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public EmployeeController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }

    [HttpGet]
    [Route("GetAllEmployees")]

    public async Task<IActionResult> GetAllEmployeesAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllEmployeesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpGet]
    [Route("GetEmployeeUserProfile")]

    public async Task<IActionResult> GetEmployeeUserProfileDetailsAsync(Guid employee_ID)
    {
      try
      {
        var results = await _IPKPRepository.GetEmployeeDetailsAsync(employee_ID);
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpDelete]
    [Route("DeleteEmployee")]
    public async Task<IActionResult> DeleteEmployeeAsync(Guid user_ID)
    {
      try
      {
        var existingUser = await _IPKPRepository.GetEmployeeDetailsAsync(user_ID);

        if (existingUser == null) return NotFound("Could Not Find Employee" + user_ID);

        _IPKPRepository.Delete(existingUser);

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Employee Removed Successfully");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
      return Ok("Employee Removed From Database.");
    }
  }
}
