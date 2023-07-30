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
  //[Authorize]
  public class DeliveryCompanyController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public DeliveryCompanyController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }
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
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
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
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }

    }

    [HttpPost]
    [Route("AddDeliveryCompany")]
    public async Task<IActionResult> AddDeliveryCompanyAsync(DeliveryCompanyViewModel dcvm)
    {
      var deliveryCompany = new Delivery_Company
      {
        Delivery_Company_ID = dcvm.Delivery_Company_ID,
        Delivery_Company_Name = dcvm.Delivery_Company_Name
      };
      try
      {
        _IPKPRepository.Add(deliveryCompany);
        await _IPKPRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
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
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
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
        return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
      }
      return Ok(new Response { Status = "Success", Message = "Delivery Company Removed From Database." });
    }
  }
}
