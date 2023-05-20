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
  public class StockTypeController : ControllerBase
  {
    private readonly IIPKPRepository _IPKPRepository;
    public StockTypeController(IIPKPRepository iPKPRepository)
    {
      _IPKPRepository = iPKPRepository;
    }
    [HttpGet]
    [Route("GetAllStockTypes")]

    public async Task<IActionResult> GetAllStockTypesAsync()
    {
      try
      {
        var results = await _IPKPRepository.GetAllStockTypesAsync();
        return Ok(results);
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
    }

    [HttpPost]
    [Route("AddStockType")]
    public async Task<IActionResult> AddCertificationAsync(StockTypeViewModel stvm)
    {
      var stock_Type = new Stock_Type
      {
        Stock_Type_ID = stvm.Stock_Type_ID,
        Stock_Type_Name = stvm.Stock_Type_Name
      };
      try
      {
        _IPKPRepository.Add(stock_Type);
        await _IPKPRepository.SaveChangesAsync();
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Stock Type Added To Database.");
    }

    [HttpPut]
    [Route("UpdateStockType")]
    public async Task<IActionResult> UpdateCertificationAsync(Guid stock_Type_ID, StockTypeViewModel stvm)
    {
      try
      {
        var existingStockType = await _IPKPRepository.GetStockTypeDetailsAsync(stock_Type_ID);

        if (existingStockType == null) return NotFound("Could Not Find Stock Type" + stock_Type_ID);

        existingStockType.Stock_Type_Name = stvm.Stock_Type_Name;

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Stock Type Updated Successfully");
        }
      }
      catch (Exception)
      {
        return BadRequest("Invalid Transaction");
      }
      return Ok("Stock Type Saved To Database.");
    }

    [HttpDelete]
    [Route("DeleteStockType")]
    public async Task<IActionResult> DeleteCertificationAsync(Guid stock_Type_ID)
    {
      try
      {
        var existingStockType = await _IPKPRepository.GetStockTypeDetailsAsync(stock_Type_ID);

        if (existingStockType == null) return NotFound("Could Not Find Stock Type" + stock_Type_ID);

        _IPKPRepository.Delete(existingStockType);

        if (await _IPKPRepository.SaveChangesAsync())
        {
          return Ok("Stock Type Removed Successfully");
        }
      }
      catch (Exception)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Service Error, Please Contact Support.");
      }
      return Ok("Stock Type Removed From Database.");
    }
  }
}
