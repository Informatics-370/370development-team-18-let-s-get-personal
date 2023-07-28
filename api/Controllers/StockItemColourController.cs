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
  public class StockItemColourController : ControllerBase
  {

        private readonly IIPKPRepository _IPKPRepository;
        public StockItemColourController(IIPKPRepository iPKPRepository)
        {
          _IPKPRepository = iPKPRepository;
        }

        [HttpGet]
        [Route("GetAllStockItemColours")]

        public async Task<IActionResult> GetAllStockItemColoursAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllStockItemColoursAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item Colour" });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetStockItemColour/{stock_Item_Colour_ID}")]

        public async Task<IActionResult> GetStockItemColourDetailsAsync(Guid stock_Item_Colour_ID)
        {
            try
            {
              var results = await _IPKPRepository.GetStockItemColourDetailsAsync(stock_Item_Colour_ID);
              if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item Colour" + stock_Item_Colour_ID });

              return Ok(results);
            }
            catch (Exception)
            {
              return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPost]
        [Route("AddStockItemColour")]
        public async Task<IActionResult> AddStockItemColourAsync(StockItemColourViewModel sicvm)
        {

            var stock_Item_Colour = new Stock_Item_Colour
            {
               Stock_Item_Colour_ID = sicvm.Stock_Item_Colour_ID,
               Stock_Item_Colour_Name = sicvm.Stock_Item_Colour_Name,
               Stock_Item_Colour_Image =sicvm.Stock_Item_Colour_Image
            };

            try
            {
               _IPKPRepository.Add(stock_Item_Colour);
               await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
               return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Colour Added To Database." });
        }

        [HttpPut]
        [Route("UpdateStockItemColour/{stock_Item_Colour_ID}")]
        public async Task<IActionResult> UpdateStockItemColourAsync(Guid stock_Item_Colour_ID, StockItemColourViewModel sicvm)
        {
              try
              {
                var existingStockItemColour = await _IPKPRepository.GetStockItemColourDetailsAsync(stock_Item_Colour_ID);

                if (existingStockItemColour == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item Colour" + stock_Item_Colour_ID });

                existingStockItemColour.Stock_Item_Colour_Name = sicvm.Stock_Item_Colour_Name;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Stock Item Colour Updated Successfully" });
                }
              }
              catch (Exception)
              {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
              }
              return Ok(new Response { Status = "Success", Message = "Stock Item Colour Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteStockItemColour/{stock_Item_Colour_ID}")]
        public async Task<IActionResult> DeleteStockItemColourAsync(Guid stock_Item_Colour_ID)
        {
              try
              {
                var existingStockItemColour = await _IPKPRepository.GetStockItemColourDetailsAsync(stock_Item_Colour_ID);

                if (existingStockItemColour == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item Colour" + stock_Item_Colour_ID });

                _IPKPRepository.Delete(existingStockItemColour);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                  return Ok(new Response { Status = "Success", Message = "Stock Item Colour Removed Successfully" });
                }
              }
              catch (Exception)
              {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
              }
              return Ok(new Response { Status = "Success", Message = "Stock Item Colour Removed From Database." });
        }
  }
}
