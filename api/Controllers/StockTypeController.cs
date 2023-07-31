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
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find any Stock Types" });
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetStockType/{stock_Type_ID}")]
        public async Task<IActionResult> GetStockTypeDetailsAsync(Guid stock_Type_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetStockTypeDetailsAsync(stock_Type_ID);
                if (results == null) 
                { 
                    return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Type" }); 
                }
                else
                {
                    return Ok(results);
                }
                
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddStockType")]
        public async Task<IActionResult> AddStockTypeAsync(StockTypeViewModel stvm)
        {
            var stock_Type = new Stock_Type
            {
                Stock_Type_ID = new Guid(),
                Stock_Type_Name = stvm.Stock_Type_Name
            };
            try
            {
                _IPKPRepository.Add(stock_Type);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Type Added To Database." });
        }

        [HttpPut]
        [Route("UpdateStockType/{stock_Type_ID}")]
        public async Task<IActionResult> UpdateStockTypeAsync(Guid stock_Type_ID, StockTypeViewModel stvm)
        {
            try
            {
                var existingStockType = await _IPKPRepository.GetStockTypeDetailsAsync(stock_Type_ID);

                if (existingStockType == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Type" + stock_Type_ID });

                existingStockType.Stock_Type_Name = stvm.Stock_Type_Name;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Stock Type Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Type Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteStockType/{stock_Type_ID}")]
        public async Task<IActionResult> DeleteStockTypeAsync(Guid stock_Type_ID)
        {
            try
            {
                var existingStockType = await _IPKPRepository.GetStockTypeDetailsAsync(stock_Type_ID);

                if (existingStockType == null)
                {
                    return NotFound(new Response { Status = "Success", Message = "Could Not Find Stock Type" + stock_Type_ID });
                }
                else
                {
                     _IPKPRepository.Delete(existingStockType);

                    if (await _IPKPRepository.SaveChangesAsync())
                    {
                        return Ok(new Response { Status = "Success", Message = "Stock Type Removed Successfully" });
                    }
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Type Removed From Database." });
        }
  }
}
