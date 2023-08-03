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
    public class StockItemController : ControllerBase
    {

        private readonly IIPKPRepository _IPKPRepository;
        public StockItemController(IIPKPRepository iPKPRepository)
        {
            _IPKPRepository = iPKPRepository;
        }

        [HttpPost]
        [Route("AddStockItem")]
        public async Task<IActionResult> AddStockItemAsync(Stock_Item sivm)
        {
            var stockItem = new Stock_Item
            {
                Stock_Item_ID = new Guid(),
                Stock_Item_Name = sivm.Stock_Item_Name,
                Stock_Item_Price = sivm.Stock_Item_Price,
                Stock_Item_Size = sivm.Stock_Item_Size,
                Stock_Type_ID = sivm.Stock_Type_ID,
                Stock_Image_ID = sivm.Stock_Image_ID,
                Stock_Item_Colour_ID = sivm.Stock_Item_Colour_ID,
            };
            try
            {
                _IPKPRepository.Add(stockItem);
                await _IPKPRepository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Added To Database." });
        }

        [HttpGet]
        [Route("GetAllStockItems")]
        public async Task<IActionResult> GetAllStockItemsAsync()
        {
            try
            {
                var results = await _IPKPRepository.GetAllStockItemsAsync();
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Items" });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpGet]
        [Route("GetStockItem/{stock_Item_ID}")]
        public async Task<IActionResult> GetStockItemDetailsAsync(Guid stock_Item_ID)
        {
            try
            {
                var results = await _IPKPRepository.GetStockItemDetailsAsync(stock_Item_ID);
                if (results == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item" + stock_Item_ID });

                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
        }

        [HttpPut]
        [Route("UpdateStockItem/{stock_Item_ID}")]
        public async Task<IActionResult> UpdateStockItemAsync(Guid stock_Item_ID, StockItemViewModel sivm)
        {
            try
            {
                var existingStockItem = await _IPKPRepository.GetStockItemDetailsAsync(stock_Item_ID);

                if (existingStockItem == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item" + stock_Item_ID });

                existingStockItem.Stock_Item_Name = sivm.Stock_Item_Name;
                existingStockItem.Stock_Type_ID = sivm.Stock_Type_ID;
                existingStockItem.Stock_Image_ID = sivm.Stock_Image_ID;
                existingStockItem.Stock_Item_Colour_ID = sivm.Stock_Item_Colour_ID;

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Stock Item Updated Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item Saved To Database." });
        }

        [HttpDelete]
        [Route("DeleteStockItem/{StockItemId}")]
        public async Task<IActionResult> DeleteStockItem(Guid StockItemId)
        {
            try
            {
                var existingStockItem = await _IPKPRepository.GetStockItemColourDetailsAsync(StockItemId);

                if (existingStockItem == null) return NotFound(new Response { Status = "Error", Message = "Could Not Find Stock Item " + StockItemId });

                _IPKPRepository.Delete(existingStockItem);

                if (await _IPKPRepository.SaveChangesAsync())
                {
                    return Ok(new Response { Status = "Success", Message = "Stock Item  Removed Successfully" });
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Internal Service Error, Please Contact Support." });
            }
            return Ok(new Response { Status = "Success", Message = "Stock Item  Removed From Database." });
        }

    }
}
