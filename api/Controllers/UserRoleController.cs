using IPKP___API.Controllers.Models;
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
  public class UserRoleController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public UserRoleController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }
    [HttpGet]
    [Route("GetAllUserRoles")]

    public async Task<IActionResult> GetAllUserRolesAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllUserRolesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpPost]
    [Route("AddUserRole")]
    public async Task<IActionResult> AddUserRoleAsync(UserRoleViewModel urvm)
    {
      var userRole = new User_Role
      {
        User_Role_ID = urvm.User_Role_ID,
        User_Role_Name = urvm.User_Role_Name
      };
      try
      {
        _IPKPRepository.Add(userRole);
        await _IPKPRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("User Role Added To Database.");
    }

    [HttpPut]
    [Route("UpdateUserRole")]
    public async Task<IActionResult> UpdateUserRoleAsync(Guid user_Role_ID, UserRoleViewModel urvm)
    {
      try
      {
        var existingUserRole = await _IPKPRepository.GetUserRoleDetailsAsync(user_Role_ID);

        if (existingUserRole == null) return NotFound("Could Not Find User Role" + user_Role_ID);

        existingUserRole.User_Role_Name = urvm.User_Role_Name;

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("User Role Updated Successfully");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("User Role Saved To Database.");
    }

    [HttpDelete]
    [Route("DeleteUserRole")]
    public async Task<IActionResult> DeleteUserRoleAsync(Guid user_Role_ID)
    {
      try
      {
        var existingUserRole = await _IPKPRepository.GetUserRoleDetailsAsync(user_Role_ID);

        if (existingUserRole == null) return NotFound("Could Not Find User Role" + user_Role_ID);

        _IPKPRepository.Delete(existingUserRole);

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("User Role Removed Successfully");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
      return Ok("User Role Removed From Database.");
    }
  }
}
